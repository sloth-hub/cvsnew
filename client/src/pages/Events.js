import axios from "axios";
import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { get, ref, child } from "firebase/database";
import EvtProds from "../components/EvtProds";

const Events = () => {

    const [evtProds, setEvtProds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, "events")).then((snapshot) => {
            const data = snapshot.val();
            setEvtProds(data);
            // let cuData = Object.values(data.cu);
            // const gsData = Object.values(data.gs);
            // const seData = Object.values(data.se);
            // setEvtProds({
            //     cu: cuData,
            //     se: seData,
            //     gs: gsData
            // });
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function test() {
        axios.get("update").then((res) => {
            console.log(res);
        });
    }

    function evt() {
        axios.get("/all").then((res) => {
            console.log(res);
        });
    }

    function clickedTab(e) {
        e.preventDefault();
    }

    return (
        <div className="events-wrap">
            <div className="inner">
                <h2>행사상품</h2>
                <div className="tab-wrap">
                    <ul className="main-tab">
                        <li><a href="#" onClick={clickedTab}>전체</a></li>
                        <li><a href="#" onClick={clickedTab}>CU</a></li>
                        <li><a href="#" onClick={clickedTab}>7-ELEVEN</a></li>
                        <li><a href="#" onClick={clickedTab}>GS25</a></li>
                    </ul>
                    <ul className="sub-tab">
                        <li><a href="#" onClick={clickedTab}>전체</a></li>
                        <li><a href="#" onClick={clickedTab}>1+1</a></li>
                        <li><a href="#" onClick={clickedTab}>2+1</a></li>
                        <li><a href="#" onClick={clickedTab}>증정</a></li>
                        <li><a href="#" onClick={clickedTab}>할인</a></li>
                    </ul>
                </div>
                <div className="prods">
                    {isLoading ? <div className={isLoading ? "loader" : "loader hide"}>
                        <img src="./images/loading.gif" alt="loading" />
                    </div> :
                        evtProds.map((prod, index) =>
                            <EvtProds key={index} prods={prod} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Events;