const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

async function scrapData() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#");
    await page.$eval("li.cardInfo_02 > a", e => e.click());
    await page.$eval("#setC > a", e => e.click());
    await new Promise((resolve) => { setTimeout(resolve, 1500) });
    const cuList = await page.$$("li.prod_list");
    const cuProds = [];
    for (let item of cuList) {
        title = await item.$eval("div.prod_text > div.name > p", (e) => {
            return e.innerText;
        });
        price = await item.$eval("div.prod_text > div.price > strong", (e) => {
            return e.innerText;
        });
        imgsrc = await item.$eval("div.prod_img > img.prod_img", (e) => {
            return e.src;
        });
        cuProds.push({
            title: title,
            price: price,
            imgsrc: imgsrc
        });
    }
    await browser.close();
    return cuProds;
}

router.get("/", async (req, res) => {
    const cudata = await scrapData();
    res.send(cudata);
});

module.exports = router;