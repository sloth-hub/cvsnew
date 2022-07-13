import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "../pages/Home";
import Best from "../pages/Best";
import CU from "../pages/CU";
import SE from "../pages/SE";
import GS from "../pages/GS";

const App = () => {

  return (
    <Router>
      <header>
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/best" element={<Best />} />
        <Route path="/cu" element={<CU />} />
        <Route path="/se" element={<SE />} />
        <Route path="/gs" element={<GS />} />
      </Routes>
      <footer>
        &copy; 2022 cvsnew. All rights reserved.
      </footer>
    </Router>
  );

}

export default App;
