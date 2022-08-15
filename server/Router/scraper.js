const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

async function scrapAll() {
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
    ]);

    // CU

    await page.$eval("li.cardInfo_02 > a", e => e.click());
    await page.$eval("#setC > a", e => e.click());
    await new Promise((resolve) => { setTimeout(resolve, 1600) });
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

    // 7eleven

    const seProds = [];
    await page2.waitForSelector("div.dosirak_list");
    const seList1 = await page2.$$("div.dosirak_list > ul >li:not(:first-child):not(:last-child)");
    
    for (let item of seList1) {
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

    // gs25

    const gsProds = [];
    const gsLinks = [
        "http://gs25.gsretail.com/gscvs/ko/products/youus-freshfood"
        , "http://gs25.gsretail.com/gscvs/ko/products/youus-different-service"];

    for (let link of gsLinks) {
        await Promise.all([
            page3.waitForNavigation(),
            page3.goto(link),
            page3.waitForSelector("ul.prod_list")
        ]);
        let list = await page3.$$("div.prod_box");
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
    const prods = await scrapAll();
    res.send(prods);
});

module.exports = router;