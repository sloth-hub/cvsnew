import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import Events from "../pages/Events";
import CU from "../pages/CU";
import SE from "../pages/SE";
import GS from "../pages/GS";
import axios from "axios";
import { database } from "../firebase";
import { get, ref, child } from "firebase/database";
import { BiArrowToTop } from "react-icons/bi";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);
  const words = ["원니즈", "충전기", "이어폰", "서울FB", "쇼핑백", "유심", "비비안", "다회용", "캐시비", "마스크", "콘돔", "타이즈", "깨끗", "양말", "바세린", "장갑", "핫팩"];

  useEffect(() => {
    getProds();
    // updateProds();
    window.addEventListener("scroll", scrollEvent);
  }, []);

  const getProds = () => {
    setIsLoading(true);
    const dbRef = ref(database);
    get(child(dbRef, "prods")).then((snapshot) => {
      const data = snapshot.val();
      let cuData = Object.values(data.cu);
      const gsData = Object.values(data.gs);
      const seData = Object.values(data.se);

      cuData = cuData.filter(a => !words.some(e => a.title.includes(e)));
      gsData.splice(-10, 10);
      setNewProds({
        cu: cuData,
        se: seData,
        gs: gsData
      });
      setIsLoading(false);

    }).catch((err) => {
      console.log(err);
    });
  }

  const updateProds = () => {
    console.time();
    axios.post("/update").then((res) => {
      console.timeEnd();
      console.log(res.data);
    });
  }

  const clickedTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  const scrollEvent = ()=> {
   const footerY = document.querySelector("footer").offsetTop;
   const topBtn = document.querySelector("a.top");
    if (window.pageYOffset > footerY-850) {
      topBtn.classList.add("active");
    } else {
      topBtn.classList.remove("active");
    }
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
            <Route path="/events" element={<Events />} />
            <Route path="/cu" element={<CU prods={newProds} isLoading={isLoading} />} />
            <Route path="/se" element={<SE prods={newProds} isLoading={isLoading} />} />
            <Route path="/gs" element={<GS prods={newProds} isLoading={isLoading} />} />
          </Routes>
        </main>
        <footer>
          <div className="inner">
            <p>&copy; 2022 cvsnew. All rights reserved.</p>
            <a href="#" className="top" onClick={clickedTop}><BiArrowToTop /></a>
          </div>
        </footer>
      </Router>
    </div>
  );

}

export default App;
