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

    function evt() {
        axios.get("/all").then((res) => {
            console.log(res);
        });
    }

    function clickedTab(e) {
        e.preventDefault();
        if (e.target.closest(".main-tab")) {
            const items = document.querySelectorAll(".main-tab .tab");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            e.target.closest(".tab").classList.add("active");
        } else {
            const items = document.querySelectorAll(".sub-tab .tab");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            e.target.closest(".tab").classList.add("active");
        }
    }

    return (
        <div className="events-wrap">
            <div className="inner">
                <h2>행사상품</h2>
                <button onClick={evt}>evt</button>
                <div className="tab-wrap">
                    <ul className="main-tab">
                        <a className="tab active" href="#" onClick={clickedTab}><li>전체</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>CU</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>7-ELEVEN</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>GS25</li></a>
                    </ul>
                    <ul className="sub-tab">
                        <a className="tab active" href="#" onClick={clickedTab}><li>전체</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>1+1</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>2+1</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>3+1</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>증정</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>할인</li></a>
                    </ul>
                </div >
                <div className="prods">
                    {isLoading ? <div className={isLoading ? "loader" : "loader hide"}>
                        <img src="./images/loading.gif" alt="loading" />
                    </div> :
                        evtProds.map((prod, index) =>
                            <EvtProds key={index} prods={prod} />
                        )
                    }
                </div>
            </div >
        </div >
    )
}

export default Events;