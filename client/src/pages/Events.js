import axios from "axios";
import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { get, ref, child, query, orderByChild, equalTo } from "firebase/database";
import EvtProds from "../components/EvtProds";

const Events = () => {

    const [evtProds, setEvtProds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const dbRef = ref(database);
        setIsLoading(true);
        get(child(dbRef, "events")).then((snapshot) => {
            const data = snapshot.val();
            setEvtProds(data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function showProds(e) {
        const dbRef = ref(database);
        if (e.closest(".tab").innerText === "전체") {
            get(child(dbRef, "events")).then((snapshot) => {
                setEvtProds(snapshot.val());
            });
        } else {
            const q = query(ref(database, "events"), orderByChild("store"), equalTo(e.closest(".tab").textContent));
            get(q).then(snapshot => {
                if (snapshot.val()) {
                    if (Array.isArray(snapshot.val())) {
                        setEvtProds(snapshot.val());
                    } else {
                        const val = Object.values(snapshot.val());
                        setEvtProds(val);
                    }
                } else if (snapshot.val() === null) {
                    setEvtProds(null);
                }
            });
        }
    }

    function clickedTab(e) {
        e.preventDefault();
        if (e.target.closest(".main-tab")) {
            const items = document.querySelectorAll(".main-tab .tab");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            e.target.closest(".tab").classList.add("active");
            showProds(e.target);
        } else {
            const items = document.querySelectorAll(".sub-tab .tab");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            e.target.closest(".tab").classList.add("active");
            showProds(e.target);
        }
    }

    function evt() {
        axios.get("/all").then((res) => {
            console.log(res);
        });
    }


    return (
        <div className="events-wrap">
            <div className="inner">
                <h2>행사상품</h2>
                <button onClick={evt}>evt</button>
                <div className="tab-wrap">
                    <ul className="main-tab">
                        <a className="tab active" href="#" onClick={clickedTab}><li>전체</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>cu</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>7-eleven</li></a>
                        <a className="tab" href="#" onClick={clickedTab}><li>gs25</li></a>
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
                        (evtProds !== null ? evtProds.map((prod, index) =>
                            <EvtProds key={index} prods={prod} />
                        ) : <div className="null">상품이 없습니다.</div>)
                    }
                </div>
            </div >
        </div >
    )
}

export default Events;