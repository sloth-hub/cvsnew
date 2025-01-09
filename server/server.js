const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const cheerio = require("cheerio");
const axios = require("axios");
const admin = require("firebase-admin");
const chromium = require("@sparticuz/chromium");
const playwright = require("playwright-core");
const cors = require("cors");
const TIME_ZONE = 3240 * 10000;
const today = new Date(+new Date() + TIME_ZONE).toISOString().split("T")[0];

require("dotenv").config({ path: "../.env" });

const isLocal = process.env.NODE_ENV === "development";

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
const args = process.argv.slice(2);
const task = args.find((arg) => arg.startsWith("--task="))?.split("=")[1];

(async () => {
    if (task === "update") {
        console.log("Running daily update task...");
        await updateProds();
        process.exit(0);
    } else if (task === "all") {
        console.log("Running monthly event scraping task...");
        await scrapeEvents();
        process.exit(0);
    }
})();

app.post("/update", async (req, res) => {
    const data = await updateProds();
    res.send(data);
});

app.post("/all", async (req, res) => {
    console.log("이벤트 상품 자동 스크래핑 시작!");
    const events = await scrapEvents();
    db.ref("events").set(events);
    db.ref("update").child("evtUpdate").set(today);
    res.send(events);
    console.log("이벤트 상품 자동 스크래핑 끝!");
});

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });


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

async function updateProds() {
    console.log("신상품 자동 스크래핑 시작!");
    const [data1, data2] = await Promise.all([
        scrapSe(),
        scrapCuGs()
    ]);

    if (!data1 || typeof data1 !== "object" || Object.keys(data1).length === 0) {
        console.error("scrapSe returned invalid data.");
        throw new Error("Invalid 'prods.se' data from scrapSe.");
    }

    const sanitizedData = {
        cu: data2.cu || [],
        gs: data2.gs || [],
        se: data1 || [],
    };

    await db.ref("prods").set(sanitizedData);
    db.ref("update").child("prodUpdate").set(today);

    console.log("신상품 자동 스크래핑 끝!");
    return [...data1, data2];
}

async function scrapEvents() {

    const browser = await playwright.chromium.launch({
        executablePath: isLocal ? undefined : await chromium.executablePath(),
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            ...chromium.args]
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

async function createNewPage(context) {
    if (!context) {
        throw new Error("Browser context is unavailable.");
    }
    try {
        return await context.newPage();
    } catch (error) {
        console.error("Failed to create a new page:", error);
        throw error; // 에러 발생 시 상위 함수에서 처리
    }
}

async function scrapCuGs() {

    const browser = await playwright.chromium.launch({
        executablePath: isLocal ? undefined : await chromium.executablePath(),
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            ...chromium.args]
    });

    const context = await browser.newContext();

    try {
        const [page, page2] = await Promise.all([
            createNewPage(context),
            createNewPage(context),
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

        console.log(`cu length: ${cuProds.length} / gs length: ${gsProds.length}`);
        return { cu: cuProds, gs: gsProds };

    } catch (error) {
        console.error("Error in scrapCuGs:", error);
        // 브라우저 상태 확인 및 디버깅
        if (!browser.isConnected()) {
            console.error("Browser was disconnected.");
        }
        return { cu: [], gs: [] };
    } finally {
        if (browser.isConnected()) {
            await browser.close();
        }
    }
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
            throw new Error("Failed to fetch 'prods.se' data.");
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