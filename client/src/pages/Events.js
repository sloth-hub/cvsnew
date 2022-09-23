import React, { useEffect } from "react";
import axios from "axios";

const Events = () => {

    function updateData() {
        axios.get("update").then((res) => {
            console.log(res);
        });
    }

    return (
        <div className="events-wrap">
            <div className="inner">
                <button onClick={updateData}>update</button>
            </div>
        </div>
    )
}

export default Events;