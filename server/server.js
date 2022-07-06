const express = require("express");
const app = express();
const scraper = require("./Router/scraper");
const port = 5000;

app.listen(port, () => { console.log(`Listening on port ${port}`) });

app.use("/api", scraper);
