import React, { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data);
    }, (err) => console.log(err));
  }

  return (
    <div>test</div>
  );

}

export default App;
