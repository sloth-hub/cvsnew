const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/all", async (req, res) => {
    const data1 = await scrap();
    // const [data1, data2] = await Promise.all([
    //     scrap(),
    //     scrapCuGs()
    // ]);
    // data2.se  = data1;
    res.send(data1);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });

async function scrap() {
    const seProds = [];
    await axios.get("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood")
        .then((html) => {
            seProds.push("성공");
            // const $ = cheerio.load(html.data);
            // $("div.dosirak_list > ul > li:not(:first-child):not(:last-child)")
            //     .each((index, item) => {
            //         seProds.push({
            //             title: $(item).find("div.infowrap > div.name").text(),
            //             price: $(item).find("div.infowrap > div.price > span").text(),
            //             imgsrc: `https://www.7-eleven.co.kr${$(item).find("div.pic_product > img").attr("src")}`
            //         });
            //     });
        }).catch(err => console.log(err));
    return seProds;
}

async function scrapCuGs() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--single-process"
        ]
    });
    const [page, page2] = await Promise.all([
        browser.newPage(),
        browser.newPage()
    ]);

    await Promise.all([
        await page.setRequestInterception(true),
        await page2.setRequestInterception(true)
    ]);

    await Promise.all([
        page.on('request', (req) => {
            speedUp(req);
        }),
        page2.on('request', (req) => {
            speedUp(req);
        })
    ]);

    await Promise.all([
        page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#"), // CU
        page2.goto("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood") // gs25
    ]);

    // CU

    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.$eval("li.cardInfo_02 > a", e => e.click()),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.$eval("#setC > a", e => e.click())
    ]);

    const cuList = await page.$$("li.prod_list");
    const cuProds = [];
    for (let item of cuList) {
        cuProds.push({
            title: await item.evaluate((e) => {
                if (e.querySelector("div.tag > span.new")) {
                    return e.querySelector("div.prod_text > div.name > p").innerText;
                }
            }),
            price: await item.evaluate((e) => {
                if (e.querySelector("div.tag > span.new")) {
                    return e.querySelector("div.prod_text > div.price > strong").innerText;
                }
            }),
            imgsrc: await item.evaluate((e) => {
                if (e.querySelector("div.tag > span.new")) {
                    return e.querySelector("div.prod_img > img.prod_img").src;
                }
            })
        });
    }

    // gs25

    const gsProds = [];
    const gsLinks = [
        "http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood"
        , "http://gs25.gsretail.com/gscvs/ko/products/youus-different-service"
    ];

    for (let link of gsLinks) {
        await Promise.all([
            page2.waitForNavigation({ waitUntil: "networkidle2" }),
            page2.goto(link),
            page2.waitForSelector("ul.prod_list")
        ]);
        let list = await page2.$$("div.prod_box");
        for (let item of list) {
            gsProds.push({
                title: await item.$eval("p.tit", (e) => {
                    return e.innerText;
                }),
                price: await item.$eval("p.price > span.cost", (e) => {
                    return e.innerText.slice(0, -1);
                }),
                imgsrc: await item.$eval("p.img > img", (e) => {
                    return e.src;
                })
            });
        }
    }

    await browser.close();
    return { cu: cuProds, gs: gsProds };
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