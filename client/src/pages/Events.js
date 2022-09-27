import React from "react";
import axios from "axios";

const Events = () => {

    function scrapeData() {
        axios.get("cu").then((res) => {
            let cudata = Object.values(res.data.cu);
            let exceptdata = Object.values(res.data.except);
            cudata.filter(e => exceptdata.includes(e));
            console.log(cudata);
        });
    }

    return (
        <div className="events-wrap">
            <div className="inner">
                <button onClick={scrapeData}>update</button>
            </div>
        </div>
    )
}

export default Events;