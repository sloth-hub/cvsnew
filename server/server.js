const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const admin = require("firebase-admin");
var serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cvsnew-a3611-default-rtdb.firebaseio.com"
});

var db = admin.database();

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/all", async (req, res) => {
    const data = await db.ref("prods").once("value", (snapshot) => {
        const dataObj = snapshot.val();
        return Object.keys(dataObj);
    });
    res.send(data);
});

app.get("/update", async (req, res) => {
    const [data1, data2] = await Promise.all([
        scrapSe(),
        scrapCuGs()
    ]);
    data2.se = data1;
    db.ref("prods").set(data2);
    res.send("success");
});

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(port, () => { console.log(`Listening on port ${port}`) });

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