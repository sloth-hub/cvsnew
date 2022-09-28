import React from "react";
import axios from "axios";

const Events = ({prods}) => {

    function scrapeData() {
        axios.get("cu").then((res) => {
            let exceptdata = Object.values(res.data);
            let cudata = prods.cu;
            console.log(cudata);
            cudata = cudata.filter(item => {
               return !exceptdata.some(e => e.title === item.title);
            });
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