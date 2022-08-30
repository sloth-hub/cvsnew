const express = require("express");
const app = express();
const path = require("path");
const scraper = require("./Router/scraper");
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));
// app.use("/all", (req, res) => {
//     res.send("test");
// });
app.use("/all", scraper);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

let server = app.listen(port, () => { console.log(`Listening on port ${port}`) });

server.on("clientError", (err, socket)=> {
    console.error(err);
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});