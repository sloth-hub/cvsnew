import React from "react";
import NewProds from "../components/NewProds";
import prods from "../best.json";

const Best = () => {

    const today = new Date();

    function getWeekOfMonth(date) {
        const dayOfMonth = date.getDate();
        const first = new Date(date.getFullYear() + "/" + (date.getMonth() + 1) + "/01");
        const monthFirstDateDay = first.getDay();
        return Math.ceil((dayOfMonth + monthFirstDateDay) / 7);
    }

    return (
        <div className="best-wrap">
            <div className="inner">
                <h2>{today.getFullYear()}년 {today.getMonth() + 1}월 {getWeekOfMonth(today)}주차 BEST 신상</h2>
                <ul className="prods">
                    {prods.cu.map((newProd, index) =>
                        <NewProds key={index} prods={newProd} cvs="cu" />
                    )}
                     {prods.gs.map((newProd, index) =>
                        <NewProds key={index} prods={newProd} cvs="gs" />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Best;