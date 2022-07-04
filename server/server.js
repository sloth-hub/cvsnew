const express = require("express");
const app = express();
const test = require("./Router/test");
const port = 5000;

app.listen(port, () => { console.log(`Listening on port ${port}`) });

app.use("/api", test);

// app.get("/api", (req, res)=>{
//     res.send(test);
// });