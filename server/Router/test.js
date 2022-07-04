const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
  res.send({ test: "테스트"});
});

module.exports = router;