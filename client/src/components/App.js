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
    const data = axios.get("/api").then(()=>{
      setIsLoading(false);
    });
    setNewProds({
      cu: data[0],
      se: data[1],
      gs: data[2]
    });
  }

  return (
    <div>
      {isLoading ? <p>loading...</p> :
        <Router>
          <Routes>
            <Route exact path="/" element={<Home isLoading={isLoading} newProds={newProds} />} />
          </Routes>
        </Router>
      }
    </div>
  );

}

export default App;
