import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { get, ref, query } from "firebase/database";
import EvtProds from "../components/EvtProds";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Swal from "sweetalert2";

const Events = ({ uid }) => {

    const [evtProds, setEvtProds] = useState(null);
    const [allProds, setAllProds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [store, setStore] = useState("전체");
    const [evtType, setEvtType] = useState("전체");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(12);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        getAllProds();
    }, []);

    useEffect(() => {
        showProds();
    }, [store, evtType, isLoading]);

    async function getAllProds() {
        let q = query(ref(database, "events"));
        const result = await get(q).then((snapshot) => snapshot.val());
        setAllProds(result);
        setIsLoading(false);
    }

    function showProds() {
        if (store === "전체" && evtType === "전체") {
            setEvtProds(allProds);
        } else if (store && evtType === "전체") {
            const result = allProds.filter(v => v.store.match(store));
            setProds(result, false);
        } else if (evtType && store === "전체") {
            const result = allProds.filter(v => v.type === evtType);
            setProds(result, false);
        } else {
            const result = allProds.filter(v => v.type === evtType && v.store.match(store));
            setProds(result, false);
        }
    }

    function setProds(array, isSearched) {
        if (array.length !== 0) {
            setEvtProds(array);
            setIsLoading(false);
        } else {
            setEvtProds(null);
            if (isSearched) setSearchValue("");
            setIsLoading(false);
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
        const lists = document.querySelectorAll(".share-list");
        lists.forEach(list => {
            list.classList.remove("active");
        });
    }

    function pageUp() {
        let total = evtProds.length % 12 === 0 ? evtProds.length / 12 : parseInt(evtProds.length / 12) + 1;
        if (page < total) {
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

    function clickedSearch() {
        if (searchValue.length !== 0 && searchValue.replace(/^\s+|\s+$/g, "") !== "") {
            const result = allProds.filter((v) => {
                if (store === "전체" && evtType === "전체") {
                    return v.title.match(searchValue);
                } else if (evtType === "전체") {
                    return v.store.match(store) && v.title.match(searchValue);
                } else if (store === "전체") {
                    return v.type === evtType && v.title.match(searchValue);
                } else {
                    return v.type === evtType && v.store.match(store) && v.title.match(searchValue);
                }
            });
            setMin(0);
            setMax(12);
            setPage(1);
            setProds(result, true);
        } else {
            Swal.fire({
                title: "검색어를 입력하세요.",
                icon: "warning",
                confirmButtonText: "확인",
                confirmButtonColor: "#4BCFE5"
            });
        }
    }



    return (
        <div className="events-wrap">
            <div className="inner">
                <h2>{new Date().getMonth() + 1}월 행사상품</h2>
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
                <div className="search-wrap">
                    <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={e => { if (e.code === "Enter") clickedSearch() }} />
                    <button className="btn" onClick={clickedSearch}>검색</button>
                </div>
                <div className="prods">
                    {isLoading ? <div className={isLoading ? "loader" : "loader hide"}>
                        <img src="./images/loading.gif" alt="loading" />
                    </div> :
                        evtProds !== null ?
                            <>
                                {evtProds.slice(min, max).map((prod, index) =>
                                    <EvtProds key={index} prods={prod} isHome={false} uid={uid} />)}
                                <div className="blank"></div>
                                <div className="page-area">
                                    <button className="btn prev" onClick={pageDown}><FaChevronLeft /></button>
                                    <div className="page-wrap">
                                        <span className="page">{page}</span>
                                        <span>/</span>
                                        <span className="total">{evtProds.length % 12 === 0 ? evtProds.length / 12 : parseInt(evtProds.length / 12) + 1}</span>
                                    </div>
                                    <button className="btn next" onClick={pageUp}><FaChevronRight /></button>
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