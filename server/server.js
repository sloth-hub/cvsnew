const express = require("express");
const app = express();
const path = require("path");
const scraper = require("./Router/scraper");
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on port ${port}`) });

app.use(express.static(path.join(__dirname, '../client/build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.use("/all", scraper);