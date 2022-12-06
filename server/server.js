const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const cheerio = require("cheerio");
const axios = require("axios");
const admin = require("firebase-admin");
const { chromium } = require("playwright");
const cors = require("cors");

require("dotenv").config({ path: "../.env" });

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": "cvsnew-a3611",
        "private_key": process.env.private_key.replace(/\\n/g, '\n'),
        "client_email": process.env.client_email,
    }),
    databaseURL: "https://cvsnew-a3611-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.post("/update", async (req, res) => {
    // const [data1, data2] = await Promise.all([
    //     scrapSe(),
    //     scrapCuGs()
    // ]);
    const data = await scrapCuGs();
    // data2.se = data1;
    // db.ref("prods").set(data2);
    // res.send(data2);
    res.send(data);
});

app.post("/all", async (req, res) => {
    const events = await scrapEvents();
    db.ref("events").set(events);
    res.send(events);
});

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });

async function scrapEvents() {

    const browser = await chromium.launch({
        headless: false,
        args: ["--no-sandbox"]
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route("**/*", (route) => {
        speedUp(route);
    });

    let evtProds = [];
    let list;
    let total;
    const links = [
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=CU%20%ED%96%89%EC%82%AC",
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=GS25%20%ED%96%89%EC%82%AC",
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=%EC%84%B8%EB%B8%90%EC%9D%BC%EB%A0%88%EB%B8%90%20%ED%96%89%EC%82%AC"
    ];

    for (let link of links) {

        await Promise.all([
            page.goto(link),
            page.waitForSelector("div.api_subject_bx div.item_list")
        ]);

        total = await page.$eval("span._total", e => e.innerText);

        for (let i = 0; i < total - 1; i++) {

            list = await page.$$("div.eg-flick-container div.eg-flick-panel ul[role='list'] li[role='listitem']");

            for (let item of list) {
                evtProds.push({
                    title: await item.evaluate((e) => {
                        return e.querySelector("span.name_text").innerText;
                    }),
                    price: await item.evaluate((e) => {
                        if (e.querySelector("span.ico_event").innerText === "할인") {
                            return {
                                cost: e.querySelector("span.item_discount").innerText,
                                discount: e.querySelector("p.item_price > em").innerText
                            }
                        } else {
                            return e.querySelector("p.item_price > em").innerText;
                        }
                    }),
                    type: await item.evaluate((e) => {
                        return e.querySelector("span.ico_event").innerText;
                    }),
                    store: await item.evaluate((e) => {
                        if (e.querySelector("span.store_info").innerText === "세븐일레븐") {
                            return "7-eleven";
                        } else {
                            return e.querySelector("span.store_info").innerText.toLowerCase();
                        }
                    }),
                    imgsrc: await item.evaluate((e) => {
                        return e.querySelector("a.thumb > img").src;
                    })
                });
            }
            await page.click("a.cmm_pg_next.on._next");
            await page.waitForTimeout(100);
        }
    }

    await page.waitForTimeout(1000);

    evtProds = evtProds.filter((v, i) =>
        evtProds.findIndex(x => x.title === v.title) === i
    );

    await browser.close();

    return evtProds;

}

async function scrapCuGs() {
    const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox"]
    });

    const context = await browser.newContext();

    const [page, page2] = await Promise.all([
        context.newPage(),
        context.newPage()
    ]);

    await Promise.all([
        await page.route("**/*", (route) => {
            speedUp(route);
        }),
        await page2.route("**/*", (route) => {
            speedUp(route);
        })
    ]);

    await Promise.all([
        page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#"), // CU
        page2.goto("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood") // gs25
    ]);

    // CU

    await Promise.all([
        page.waitForSelector("li.cardInfo_02 > a"),
        page.click("li.cardInfo_02 > a"),
        page.waitForSelector("#prodListWrap > ul", { state: "visible" }),
        page.click("#setC > a"),
        page.waitForSelector("#prodListWrap > ul", { state: "visible" }),
    ]);

    const cuList = await page.$$("li.prod_list");
    let cuProds = [];
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
    cuProds = cuProds.filter(e => {
        if (e.title)
            return e;
    });

    // // gs25

    const gsProds = [];
    const gsLinks = [
        "http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood"
        , "http://gs25.gsretail.com/gscvs/ko/products/youus-different-service"
    ];

    for (let link of gsLinks) {
        await Promise.all([
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

async function scrapSe() {
    let seProds = [];
    await axios.get("https://www.7-eleven.co.kr/product/bestdosirakList.asp")
        .then((html) => {
            const $ = cheerio.load(html.data);
            $("div.dosirak_list > ul > li:not(:first-child):not(:last-child)")
                .each((index, item) => {
                    seProds.push({
                        title: $(item).find("div.infowrap > div.name").text(),
                        price: $(item).find("div.infowrap > div.price > span").text(),
                        imgsrc: `https://www.7-eleven.co.kr${$(item).find("div.pic_product > img").attr("src")}`
                    });
                });
        }).catch(err => {
            seProds = undefined;
        });
    return seProds;
}

function speedUp(route) {
    switch (route.request().resourceType()) {
        case 'stylesheet':
        case 'font':
            // case 'image':
            route.abort();
            break;
        default:
            route.continue();
            break;
    }
}