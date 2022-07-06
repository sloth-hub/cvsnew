const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

async function scrapData() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://cu.bgfretail.com/product/product.do?category=product&depth2=4&sf=N");
    await page.waitForSelector("#dataTable > div.prodListBtn > div.prodListBtn-w > a");
    await page.click("#dataTable > div.prodListBtn > div.prodListBtn-w > a");
    await page.waitForSelector("div.prodListWrap");
    const list = await page.$$("li.prod_list");
    const prods = [];
    for (let item of list) {
        title = await item.$eval("div.prod_text > div.name > p", (e) => {
            return e.innerText;
        });
        price = await item.$eval("div.prod_text > div.price > strong", (e)=> {
            return e.innerText;
        });
        imgsrc = await item.$eval("div.prod_img > img.prod_img", (e)=> {
            return e.src;
        });
        prods.push({ title: title, price: price, imgsrc: imgsrc});
    }
    await browser.close();
    return prods;
}

router.get("/", async (req, res) => {
    const cudata = await scrapData();
    res.send(cudata);
});

module.exports = router;