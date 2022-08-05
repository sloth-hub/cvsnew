const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

async function scrapData() {


}

router.get("/", async (req, res) => {
    const result = await scrapData();
    res.send(console.log(result));
});

module.exports = router;