import axios from "axios";
import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { get, ref, query, orderByChild, equalTo } from "firebase/database";
import EvtProds from "../components/EvtProds";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Events = () => {

    const [evtProds, setEvtProds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [store, setStore] = useState("전체");
    const [evtType, setEvtType] = useState("전체");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(12);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        showProds();
    }, [store, evtType]);

    function showProds(page) {
        let q;
        if (store === "전체" && evtType === "전체") {
            q = query(ref(database, "events"));
            get(q).then((snapshot) => {
                setEvtProds(snapshot.val());
                setIsLoading(false);
            });
        } else if (store && evtType === "전체") {
            q = query(ref(database, "events"), orderByChild("store"), equalTo(store));
            get(q).then(snapshot => {
                if (snapshot.val()) {
                    const val = Object.values(snapshot.val());
                    setEvtProds(val);
                    setIsLoading(false);
                } else {
                    setEvtProds(null);
                    setIsLoading(false);
                }
            });
        } else if (evtType && store === "전체") {
            q = query(ref(database, "events"), orderByChild("type"), equalTo(evtType));
            get(q).then(snapshot => {
                if (snapshot.val()) {
                    const val = Object.values(snapshot.val());
                    setEvtProds(val);
                    setIsLoading(false);
                } else {
                    setEvtProds(null);
                    setIsLoading(false);
                }
            });
        } else {
            q = query(ref(database, "events"), orderByChild("store"), equalTo(store));
            get(q).then(snapshot => {
                if (snapshot.val()) {
                    let val = Object.values(snapshot.val());
                    val = val.filter((v) => v.type === evtType);
                    if (val.length == 0) {
                        setEvtProds(null);
                        setIsLoading(false);
                    } else {
                        setEvtProds(val);
                        setIsLoading(false);
                    }
                } else {
                    setEvtProds(null);
                    setIsLoading(false);
                }
            });
        }
    }

    function clickedTab(e) {
        e.preventDefault();
        setPage(1);
        setMin(0);
        setMax(12);
        if (e.target.closest(".main-tab")) {
            setStore(e.target.closest(".tab").textContent);
            const items = document.querySelectorAll(".main-tab .tab");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            e.target.closest(".tab").classList.add("active");
        } else {
            setEvtType(e.target.closest(".tab").textContent);
            const items = document.querySelectorAll(".sub-tab .tab");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            e.target.closest(".tab").classList.add("active");
        }
    }

    function pageUp() {
        if (page < Math.round(evtProds.length / 12)) {
            setPage(page + 1);
        }
        if (evtProds.length > max) {
            setMin(max);
            setMax(max + 12);
        }
    }

    function pageDown() {
        if (page > 1) {
            setPage(page - 1);
        }
        if (min > 0) {
            setMin(min - 12);
            setMax(max - 12);
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
                <h2>{new Date().getMonth()+1}월 행사상품</h2>
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
                        evtProds !== null ?
                            <>
                                {evtProds.slice(min, max).map((prod, index) =>
                                    <EvtProds key={index} prods={prod} />)}
                                <div className="page-area">
                                    <button className="btn prev" onClick={pageDown}><FaChevronLeft/></button>
                                    <div className="page-wrap">
                                        <span className="page">{page}</span>
                                        <span>/</span>
                                        <span className="total">{Math.round(evtProds.length / 12)}</span>
                                    </div>
                                    <button className="btn next" onClick={pageUp}><FaChevronRight/></button>
                                </div>
                            </>
                            : <div className="null">상품이 없습니다.</div>
                    }
                </div>
            </div >
        </div >
    )
}

export default Events;