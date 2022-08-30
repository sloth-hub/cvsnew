const express = require("express");
const app = express();
const path = require("path");
// const scraper = require("./Router/scraper");
const port = process.env.PORT || 5000;
const puppeteer = require("puppeteer");

app.use(express.static(path.join(__dirname, '../client/build')));
app.use("/all", (req, res) => {
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

    const page = await browser.newPage();
    await page.goto("https://cu.bgfretail.com/product/pb.do?category=product&depth2=1&sf=N#");
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

    return cuProds;

}