import axios from "axios";
import React from "react";

const Events = () => {

    function test() {
        axios.get("update").then((res) => {
            console.log(res);
        });
    }

    return (
        <div className="events-wrap">
            <div className="inner">
                <button onClick={test}>update</button>
            </div>
        </div>
    )
}

export default Events;