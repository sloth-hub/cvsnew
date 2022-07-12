import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "../pages/Home";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [newProds, setNewProds] = useState(null);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    axios.get("/api").then((res)=>{
      setNewProds({
        cu: res.data[0],
        se: res.data[1],
        gs: res.data[2]
      });
      setIsLoading(false);
    });
  }

  return (
    <div>
      {isLoading ? <p>loading...</p> :
        <Router>
          <Routes>
            <Route exact path="/" element={<Home newProds={newProds} />} />
          </Routes>
        </Router>
      }
    </div>
  );

}

export default App;
