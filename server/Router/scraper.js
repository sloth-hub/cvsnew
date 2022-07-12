const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

async function scrapData() {
    const browser = await puppeteer.launch({ headless: false });
    const [page, page2, page3] = await Promise.all([
        browser.newPage(),
        browser.newPage(),
        browser.newPage()
    ]);

    await Promise.all([
        await page.setRequestInterception(true),
        await page2.setRequestInterception(true),
        await page3.setRequestInterception(true)
    ]);

    await Promise.all([
        page.on('request', (req) => {
            speedUp(req);
        }),
        page2.on('request', (req) => {
            speedUp(req);
        }),
        page3.on('request', (req) => {
            speedUp(req);
        })
    ]);

    await Promise.all([
        page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#"), // CU
        page2.goto("https://www.7-eleven.co.kr/product/bestdosirakList.asp"), // 7-eleven
        page3.goto("http://gs25.gsretail.com/gscvs/ko/products/youus-main"), // gs25
    ]);

    // CU

    await page.$eval("li.cardInfo_02 > a", e => e.click());
    await page.$eval("#setC > a", e => e.click());
    await new Promise((resolve) => { setTimeout(resolve, 1500) });
    const cuList = await page.$$("li.prod_list");
    const cuProds = [];
    for (let item of cuList) {
        cuProds.push({
            title: await item.$eval("div.prod_text > div.name > p", (e) => {
                return e.innerText;
            }),
            price: await item.$eval("div.prod_text > div.price > strong", (e) => {
                return e.innerText;
            }),
            imgsrc: await item.$eval("div.prod_img > img.prod_img", (e) => {
                return e.src;
            })
        });
    }

    // 7eleven

    await page2.waitForSelector("div.dosirak_list");
    const seList = await page2.$$("div.pic_product");
    const seProds = [];
    for (let item of seList) {
        seProds.push({
            title: await item.$eval("div.infowrap > div.name", (e) => {
                return e.innerText;
            }),
            price: await item.$eval("div.infowrap > div.price > span", (e) => {
                return e.innerText;
            }),
            imgsrc: await item.$eval("img", (e) => {
                return e.src;
            })
        });
    }

    // gs25

    await page3.waitForSelector("div.brdwrap");
    const gsList = await page3.$$("div.cnt_section div.prod_box");
    const gsProds = [];

    for (let item of gsList) {
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

    await browser.close();
    return [cuProds, seProds, gsProds];
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

router.get("/", async (req, res) => {
    const prods = await scrapData();
    res.send(prods);
});

module.exports = router;