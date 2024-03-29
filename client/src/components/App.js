import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import { database } from "../firebase";
import { get, update, ref, child } from "firebase/database";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { BiArrowToTop } from "react-icons/bi";
import words from "../word.json";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);
  const [userId, setUserId] = useState(null);
  const [upDate, setUpDate] = useState("");
  const dbRef = ref(database);
  const Home = React.lazy(() => import("../pages/Home"));
  const Events = React.lazy(() => import("../pages/Events"));
  const CU = React.lazy(() => import("../pages/CU"));
  const SE = React.lazy(() => import("../pages/SE"));
  const GS = React.lazy(() => import("../pages/GS"));

  useEffect(() => {
    authInit();
    kakaoInit();
    window.addEventListener("scroll", scrollEvent);
  }, []);

  const authInit = () => {
    const auth = getAuth();
    signInAnonymously(auth).then(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          getProds();
          setUserId(user.uid);
          if (window.location.port) {
            // yyyy-mm-dd 형식으로 파싱
            const TIME_ZONE = 3240 * 10000;
            const today = new Date(+new Date() + TIME_ZONE).toISOString().split("T")[0];
            get(child(dbRef, "update")).then((snapshot) => {
              const updateDate = snapshot.val().prodUpdate;
              setUpDate(updateDate);
              const evtDate = snapshot.val().evtUpdate;
              if (today !== updateDate) {
                updateProds(today, evtDate);
              }
            }).catch(err => console.log(err));
          }
        }
      });
    }).catch(err => console.log(err));
  }

  const kakaoInit = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_SHARE_KEY);
      }
    }
  }

  const getProds = async () => {
    setIsLoading(true);
    await get(child(dbRef, "prods")).then((snapshot) => {
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

  const updateEvtProds = async (today) => {
    console.log("Event Scraping Start");
    console.time();
    await axios.post("/all").then((res) => {
      if (res.status === 200) {
        console.log(`Scraping Is Done! \n Number of items: ${res.data.length}`);
        console.timeEnd();
        update(dbRef, { "update/evtUpdate": today });
        setTimeout(() => window.location.reload(), 1000);
      }
    }).catch(err => console.log(err));
  }

  const updateProds = async (today, evtDate) => {
    console.log("Scraping Start");
    console.time();
    await axios.post("/update").then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        console.log(`Scraping Is Done!`);
        console.timeEnd();
        update(dbRef, { "update/prodUpdate": today });
        if (today.substring(5, 7) !== evtDate.substring(5, 7)) {
          updateEvtProds(today);
        } else {
          setTimeout(() => window.location.reload(), 1000);
        }
      }
    }).catch(err => console.log(err));
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
        <Suspense fallback={<div className="loader">
          <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading" />
        </div>}>
          <header>
            <Nav />
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<Home prods={newProds} isLoading={isLoading} />} />
              <Route path="/events" element={<Events uid={userId} />} />
              <Route path="/cu" element={<CU prods={newProds} isLoading={isLoading} uid={userId}/>} />
              <Route path="/se" element={<SE prods={newProds} isLoading={isLoading} uid={userId} />} />
              <Route path="/gs" element={<GS prods={newProds} isLoading={isLoading} uid={userId}/>} />
            </Routes>
          </main>
          <footer>
            <div className="inner">
              <p>&copy; 2022 cvsnew. All rights reserved.</p>
              <button onClick={scrapTest} className="blind">test</button>
              <a href="#top" className="top" onClick={clickedTop}><BiArrowToTop /></a>
            </div>
          </footer>
        </Suspense>
      </Router>
    </div>
  );

}

export default App;
