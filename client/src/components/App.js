import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import { database } from "../firebase";
import { get, ref, child } from "firebase/database";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { BiArrowToTop } from "react-icons/bi";
import words from "../word.json";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);
  const [userId, setUserId] = useState(null);
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
      let [cuData, gsData, seData] = [
        Object.values(data.cu), Object.values(data.gs), Object.values(data.se)
      ];

      gsData.splice(-8, 8);
      gsData = gsData.filter(a => !words.some(e => a.title.includes(e)));
      cuData = cuData.filter(a => !words.some(e => a.title.includes(e)));

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

  const scrollEvent = () => {
    const footer = document.querySelector("footer");
    const topBtn = document.querySelector("a.top");
    const footerTop = footer.getBoundingClientRect().top;
    const buttonBottom = topBtn.getBoundingClientRect().bottom;

    if (buttonBottom >= footerTop) {
      topBtn.classList.add("active");
    } else {
      topBtn.classList.remove("active");
    }
  }

  return (
    <div className="wrap">
      <Router>
        <Suspense fallback={<div className="loader">
          <i className="loader-icon"></i>
        </div>}>
          <header>
            <Nav />
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<Home prods={newProds} isLoading={isLoading} />} />
              <Route path="/events" element={<Events uid={userId} />} />
              <Route path="/cu" element={<CU prods={newProds} isLoading={isLoading} uid={userId} />} />
              <Route path="/se" element={<SE prods={newProds} isLoading={isLoading} uid={userId} />} />
              <Route path="/gs" element={<GS prods={newProds} isLoading={isLoading} uid={userId} />} />
            </Routes>
          </main>
          <footer>
            <div className="inner">
              <p>&copy; 2022 cvsnew. All rights reserved.</p>
              <a href="#top" className="top" onClick={() => window.scrollTo(0, 0)}><span className="blind">top</span><BiArrowToTop /></a>
            </div>
          </footer>
        </Suspense>
      </Router>
    </div>
  );

}

export default App;
