import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import Best from "../pages/Best";
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
    axios.get("/all").then((res) => {
      setNewProds({
        cu: res.data[0],
        se: res.data[1],
        gs: res.data[2]
      });
      setIsLoading(false);
    });
  }

  return (
    <Router>
      <header>
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<Home prods={newProds} isLoading={isLoading} />} />
        <Route path="/best" element={<Best />} />
        <Route path="/cu" element={<CU prods={newProds} isLoading={isLoading} />} />
        <Route path="/se" element={<SE prods={newProds} isLoading={isLoading} />} />
        <Route path="/gs" element={<GS prods={newProds} isLoading={isLoading} />} />
      </Routes>
      <footer>
        &copy; 2022 cvsnew. All rights reserved.
      </footer>
    </Router>
  );

}

export default App;
