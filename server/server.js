const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const puppeteer = require("puppeteer");
var userAgent = require("user-agents");

app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/all", async (req, res) => {
    const data = await scrapAll();
    res.send(data);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });

async function scrapAll() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });
    const [page2, page3] = await Promise.all([
        browser.newPage(),
        // browser.newPage(),
        // browser.newPage(),
        browser.newPage()
    ]);

    await Promise.all([
        // await page.setRequestInterception(true),
        await page2.setRequestInterception(true),
        await page3.setRequestInterception(true),
        // await page4.setRequestInterception(true)
    ]);

    await Promise.all([
        // page.on('request', (req) => {
        //     speedUp(req);
        // }),
        page2.on('request', (req) => {
            speedUp(req);
        }),
        page3.on('request', (req) => {
            speedUp(req);
        }),
        // page4.on('request', (req) => {
        //     speedUp(req);
        // })
    ]);

    await Promise.all([
        page2.setUserAgent(userAgent.toString()),
        page3.setUserAgent(userAgent.toString())
    ]);

    await Promise.all([
        // page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#"), // CU
        page2.goto("https://www.7-eleven.co.kr/product/bestdosirakList.asp", { waitUntil: 'networkidle0' }), // 7-eleven
        page3.goto("https://www.7-eleven.co.kr/product/7prodList.asp", { waitUntil: 'networkidle0' }), // 7-eleven
        // page4.goto("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood") // gs25
    ]);

    // CU

    // await Promise.all([
    //     page.waitForNavigation({ waitUntil: "networkidle2" }),
    //     page.$eval("li.cardInfo_02 > a", e => e.click()),
    //     page.waitForNavigation({ waitUntil: "networkidle2" }),
    //     page.$eval("#setC > a", e => e.click())
    // ]);
    // const cuList = await page.$$("li.prod_list");
    // const cuProds = [];
    // for (let item of cuList) {
    //     cuProds.push({
    //         title: await item.evaluate((e) => {
    //             if (e.querySelector("div.tag > span.new")) {
    //                 return e.querySelector("div.prod_text > div.name > p").innerText;
    //             }
    //         }),
    //         price: await item.evaluate((e) => {
    //             if (e.querySelector("div.tag > span.new")) {
    //                 return e.querySelector("div.prod_text > div.price > strong").innerText;
    //             }
    //         }),
    //         imgsrc: await item.evaluate((e) => {
    //             if (e.querySelector("div.tag > span.new")) {
    //                 return e.querySelector("div.prod_img > img.prod_img").src;
    //             }
    //         })
    //     });
    // }

    // 7eleven

    const seProds = [];
    await page2.waitForSelector("div.dosirak_list");
    const seList1 = await page2.$$("div.dosirak_list > ul >li:not(:first-child):not(:last-child)");
    getSE(seList1, seProds);

    await page3.$eval("ul.tab_layer > li:nth-child(2) > a", e => e.click());
    await page3.waitForSelector("#listUl");
    const seList2 = await page3.$$("#listUl >li:not(:first-child):not(:last-child)");
    getSE(seList2, seProds);

    // gs25

    // const gsProds = [];
    // const gsLinks = [
    //     "http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood"
    //     , "http://gs25.gsretail.com/gscvs/ko/products/youus-different-service"
    // ];

    // for (let link of gsLinks) {
    //     await Promise.all([
    //         page4.waitForNavigation({ waitUntil: "networkidle2" }),
    //         page4.goto(link),
    //         page4.waitForSelector("ul.prod_list")
    //     ]);
    //     let list = await page4.$$("div.prod_box");
    //     for (let item of list) {
    //         gsProds.push({
    //             title: await item.$eval("p.tit", (e) => {
    //                 return e.innerText;
    //             }),
    //             price: await item.$eval("p.price > span.cost", (e) => {
    //                 return e.innerText.slice(0, -1);
    //             }),
    //             imgsrc: await item.$eval("p.img > img", (e) => {
    //                 return e.src;
    //             })
    //         });
    //     }
    // }

    await browser.close();
    // return { cu: cuProds, se: seProds, gs: gsProds };
    return { se: seProds };
}

function speedUp(req) {
    switch (req.resourceType()) {
        case 'stylesheet':
        case 'font':
        case 'image':
            req.abort();
            break;
        default:
            req.continue();
            break;
    }
}

async function getSE(list, seProds) {
    for (let item of list) {
        seProds.push({
            title: await item.evaluate((e) => {
                if (e.querySelector("li.ico_tag_03")) {
                    return e.querySelector("div.infowrap > div.name").innerText;
                }
            }),
            price: await item.evaluate((e) => {
                if (e.querySelector("li.ico_tag_03")) {
                    return e.querySelector("div.infowrap > div.price > span").innerText;
                }
            }),
            imgsrc: await item.evaluate((e) => {
                if (e.querySelector("li.ico_tag_03")) {
                    return e.querySelector("div.pic_product > img").src;
                }
            })
        });
    }
}