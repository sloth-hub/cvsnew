const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const cheerio = require("cheerio");
const axios = require("axios");
const admin = require("firebase-admin");
const cron = require("node-cron");
const { chromium } = require("playwright");
const cors = require("cors");
const TIME_ZONE = 3240 * 10000;
const today = new Date(+new Date() + TIME_ZONE).toISOString().split("T")[0];

require("dotenv").config({ path: "../.env" });

app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));

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
    const [data1, data2] = await Promise.all([
        scrapSe(),
        scrapCuGs()
    ]);
    data2.se = data1;
    if (data2.cu.length !== 0) {
        db.ref("prods").child("cu").set(data2.cu);
    }
    db.ref("prods").child("gs").set(data2.gs);
    db.ref("prods").child("se").set(data2.se);
    res.send(data2);
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

// 매일 자정 자동 스크래핑 (테스트)
cron.schedule("0 23 * * *", async () => {
    console.log("신상품 자동 스크래핑 시작!");
    const [data1, data2] = await Promise.all([
        scrapSe(),
        scrapCuGs()
    ]);
    data2.se = data1;

    if (data2.cu.length !== 0) {
        db.ref("prods").child("cu").set(data2.cu);
    }
    db.ref("prods").child("gs").set(data2.gs);
    db.ref("prods").child("se").set(data2.se);

    db.ref("update").child("prodUpdate").set(today);
    res.send(data2);
    console.log("신상품 자동 스크래핑 끝!");
});

// 매월 1일 자동 스크래핑
cron.schedule("0 0 1 * *", async () => {
    console.log("이벤트 상품 자동 스크래핑 시작!");
    const events = await scrapEvents();
    db.ref("events").set(events);
    db.ref("update").child("evtUpdate").set(today);
    console.log("이벤트 상품 자동 스크래핑 끝!");
});

async function scrapTest() {
    const browser = await chromium.launch({
        headless: false,
        args: ["--no-sandbox"]
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.naver.com/");
    await page.waitForSelector("#account > p");
    const text = await page.$eval("#account > p", e => e.innerText);
    await browser.close();

    return text;
}

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
    const links = [
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=CU%20%ED%96%89%EC%82%AC", // CU
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=GS25%20%ED%96%89%EC%82%AC", // GS25
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=%EC%84%B8%EB%B8%90%EC%9D%BC%EB%A0%88%EB%B8%90%20%ED%96%89%EC%82%AC", // 세븐일레븐
        "https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=bjZF&qvt=0&query=%EC%9D%B4%EB%A7%88%ED%8A%B824%20%ED%96%89%EC%82%AC", // 이마트24
    ];

    for (let link of links) {

        await Promise.allSettled([
            page.goto(link),
            page.waitForSelector("div.api_subject_bx div.item_list")
        ]).then(async (result) => {
            if (result[1].status === "fulfilled") {
                const total = await page.$eval("span._total", e => e.innerText);

                for (let i = 0; i < total - 1; i++) {

                    const list = await page.$$("div.eg-flick-container div.eg-flick-panel ul[role='list'] li[role='listitem']");

                    for (let item of list) {
                        evtProds.push({
                            title: await item.evaluate((e) => {
                                return e.querySelector("span.name_text").innerText;
                            }),
                            price: await item.evaluate((e) => {
                                if (e.querySelector("span.item_discount")) {
                                    // 할인
                                    return {
                                        cost: e.querySelector("span.item_discount").innerText,
                                        discount: e.querySelector("p.item_price > em").innerText
                                    }
                                } else {
                                    return e.querySelector("p.item_price > em").innerText
                                }
                            }),
                            type: await item.evaluate((e) => {
                                return e.querySelector("span.ico_event").innerText;
                            }),
                            store: await item.evaluate((e) => {
                                if (e.querySelector("span.store_info").innerText === "세븐일레븐") {
                                    return "7-eleven";
                                } else if (e.querySelector("span.store_info").innerText === "이마트24") {
                                    return "emart24";
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
            } else {
                console.log(link, "아이템 없음");
            }
        });

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

    await Promise.allSettled([
        page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#"), // CU
        page2.goto("http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood") // gs25
    ]);

    const [cuProds, gsProds] = await Promise.allSettled([
        scrapCu(page),
        scrapGs(page2)
    ]).then(result => {
        console.log(`cu status : ${result[0].status} / gs status: ${result[1].status}`);
        return [
            result[0].status === "rejected" ? [] : result[0].value,
            result[1].status === "rejected" ? [] : result[1].value
        ];
    });

    await browser.close();
    console.log(`cu length: ${cuProds.length} / gs length: ${gsProds.length}`);

    return { cu: cuProds, gs: gsProds };
}

async function scrapCu(page) {

    let cuProds = [];

    if (await page.locator("li.cardInfo_02 > a").isEnabled()) {
        await Promise.all([
            page.click("li.cardInfo_02 > a"),
            page.click("li.cardInfo_02.on > a"),
            page.waitForSelector("#prodListWrap > ul", { state: "visible" }),
            page.click("#setC > a"),
            page.waitForSelector("#prodListWrap > ul", { state: "visible" })
        ]);

        const cuList = await page.$$("li.prod_list");
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
    }

    cuProds = cuProds.filter(e => e.title && e);
    return cuProds;
}

async function scrapGs(page2) {

    let gsProds = [];
    const gsLinks = [
        "http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood"
        , "http://gs25.gsretail.com/gscvs/ko/products/youus-different-service"
    ];

    for (let link of gsLinks) {
        await Promise.all([
            page2.goto(link),
            page2.waitForSelector("ul.prod_list")
        ]);

        const gsList = await page2.$$("div.prod_box");

        for (let item of gsList) {

            gsProds.push({
                title: await item.evaluate(e => {
                    return e.querySelector("p.tit").innerText;
                }),
                price: await item.evaluate(e => {
                    return e.querySelector("p.price > span.cost").innerText.slice(0, -1);
                }),
                imgsrc: await item.evaluate(e =>
                    e.querySelector("p.img > img") !== null
                        ? e.querySelector("p.img > img").src : ""
                )
            });
        }
    }

    return gsProds;
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
        case "stylesheet":
        case "font":
            // case "image":
            route.abort();
            break;
        default:
            route.continue();
            break;
    }
}