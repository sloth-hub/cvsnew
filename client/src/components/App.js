import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import About from "../pages/About";
import CU from "../pages/CU";
import SE from "../pages/SE";
import GS from "../pages/GS";
import axios from "axios";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);

  useEffect(() => {
    getProds();
  }, []);

  const getProds = () => {
    setIsLoading(true);
    axios.get("/all").then((res) => {
      console.log(res);
      // const cuData = filtering(res.data[0]);
      // const seData = filtering(res.data[1]);
      // setNewProds({
      //   cu: cuData,
      //   se: seData,
      //   gs: res.data[2]
      // });
      // setIsLoading(false);
    });
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
            <Route path="/" element={<Home prods={newProds} isLoading={isLoading} />} />
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
