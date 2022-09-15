import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import About from "../pages/About";
import CU from "../pages/CU";
import SE from "../pages/SE";
import GS from "../pages/GS";
import axios from "axios";
import cheerio from "cheerio";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);

  useEffect(() => {
    getProds();
  }, []);

  const getProds = async () => {
    setIsLoading(true);
    const [data1, data2] = await Promise.all([
      getSEProds(),
      getCUGSProds()
    ]);
    data2.se = data1;
    console.log(data2);
  }

  const getCUGSProds = async () => {
    const cugsdata = await axios.get("/all").then((res) => {
      filtering(res.data.cu);
      res.data.gs.splice(-8, 8);
      return res.data;
    });
    return cugsdata;
  }

  const getSEProds = async () => {
    setIsLoading(true);
    const seData = await axios.get("/sedata").then((res) => {
      return res.data;
    });
    return seData;
    // const seProds = [];
    // setIsLoading(true);
    // console.time();
    // await axios.get("se/product/bestdosirakList.asp")
    //   .then((html) => {
    //     const $ = cheerio.load(html.data);
    //     $("div.dosirak_list > ul > li:not(:first-child):not(:last-child)")
    //       .each((index, item) => {
    //         seProds.push({
    //           title: $(item).find("div.infowrap > div.name").text(),
    //           price: $(item).find("div.infowrap > div.price > span").text(),
    //           imgsrc: `https://www.7-eleven.co.kr${$(item).find("div.pic_product > img").attr("src")}`
    //         });
    //       });
    //   }).catch(err => console.log(err));;
    // // return seProds;
    // console.log(seProds);
  }

  const filtering = (data) => {
    data = data.filter(e => {
      if (e.title)
        return e;
    });
    return data;
  }

  return (
    <div className="wrap">
      <Router>
        <header>
          <Nav />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<Home prods={newProds} isLoading={isLoading} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cu" element={<CU prods={newProds} isLoading={isLoading} />} />
            <Route path="/se" element={<SE prods={newProds} isLoading={isLoading} />} />
            <Route path="/gs" element={<GS prods={newProds} isLoading={isLoading} />} />
          </Routes>
        </main>
        <footer>
          <div className="inner">
            <p>&copy; 2022 cvsnew. All rights reserved.</p>
          </div>
        </footer>
      </Router>
    </div>
  );

}

export default App;
