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
import words from "../word.json";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);
  const dbRef = ref(database);

  useEffect(() => {
    getProds();
    if (window.location.port) {
      const TIME_ZONE = 3240 * 10000;
      const today = new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0];
      const updateDate = window.localStorage.getItem("date");
      const evtDate = window.localStorage.getItem("evtUpdate");
      if (today !== updateDate) {
        updateProds(today);
      }
      if (today.substring(5, 7) !== evtDate.substring(5, 7)) {
        updateEvtProds(today);
      }
    }
    window.addEventListener("scroll", scrollEvent);
  }, []);

  const getProds = () => {
    setIsLoading(true);

    get(child(dbRef, "prods")).then((snapshot) => {
      const data = snapshot.val();
      let cuData = Object.values(data.cu);
      let gsData = Object.values(data.gs);
      const seData = Object.values(data.se);

      cuData = cuData.filter(a => !words.some(e => a.title.includes(e)));
      gsData.splice(-8, 8);
      gsData = gsData.filter(a => !words.some(e => a.title.includes(e)));

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

  const updateEvtProds = (today) => {
    console.log("Event Scraping Start");
    console.time();
    axios.post("/all").then((res) => {
      console.log(`Scraping Is Done! \n Number of items: ${res.data.length}`);
      console.timeEnd();
      setTimeout(() => window.location.reload(), 1000);
    });
    window.localStorage.setItem("evtUpdate", today);
  }

  const updateProds = (today) => {
    console.log("Scraping Start");
    console.time();
    axios.post("/update").then((res) => {
      console.log(`Scraping Is Done!`);
      console.timeEnd();
      setTimeout(() => window.location.reload(), 1000);
    });
    window.localStorage.setItem("date", today);
  }

  const clickedTop = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  const scrollEvent = () => {
    const footerY = document.querySelector("footer").offsetTop;
    const topBtn = document.querySelector("a.top");
    if (window.pageYOffset > footerY - 850) {
      topBtn.classList.add("active");
    } else {
      topBtn.classList.remove("active");
    }
  }

  const scrapTest = () => {
    axios.post("/all").then((res) => {
      console.log(res.data);
    });
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
            <button onClick={scrapTest}>test</button>
            <a href="#" className="top" onClick={clickedTop}><BiArrowToTop /></a>
          </div>
        </footer>
      </Router>
    </div>
  );

}

export default App;
