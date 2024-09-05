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
    const [max, setMax] = useState(20);
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
        setMax(20);
        if (e.target.closest(".main-tab")) {
            let storeName = e.target.closest(".tab").textContent === "이마트24" ? "emart24" : e.target.closest(".tab").textContent;
            setStore(storeName);
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
        let total = evtProds.length % 20 === 0 ? evtProds.length / 20 : parseInt(evtProds.length / 20) + 1;
        if (page < total) {
            setPage(page + 1);
            window.scrollTo(0, 0);
        }
        if (evtProds.length > max) {
            setMin(max);
            setMax(max + 20);
        }
    }

    function pageDown() {
        if (page > 1) {
            setPage(page - 1);
            window.scrollTo(0, 0);
        }
        if (min > 0) {
            setMin(min - 20);
            setMax(max - 20);
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
            setMax(20);
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
        <section className="events-wrap">
            <div className="inner">
                <h1>{new Date().getMonth() + 1}월 행사상품</h1>
                <div className="tab-wrap">
                    <ul className="main-tab">
                        <li className="tab active" href="#" onClick={clickedTab}><a>전체</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>cu</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>7-eleven</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>gs25</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>이마트24</a></li>
                    </ul>
                    <ul className="sub-tab">
                        <li className="tab active" href="#" onClick={clickedTab}><a>전체</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>1+1</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>2+1</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>3+1</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>증정</a></li>
                        <li className="tab" href="#" onClick={clickedTab}><a>할인</a></li>
                    </ul>
                </div >
                <div className="search-wrap">
                    <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} onKeyDown={e => { if (e.code === "Enter") clickedSearch() }} />
                    <button className="btn" onClick={clickedSearch}>검색</button>
                </div>
                <div className="prods-wrap">
                    {isLoading ? <div className={isLoading ? "loader" : "loader hide"}>
                        <i className="loader-icon"></i>
                    </div> :
                        evtProds !== null ?
                            <>
                                <div className="prods">
                                    {evtProds.slice(min, max).map((prod, index) =>
                                        <EvtProds key={index} prods={prod} isHome={false} uid={uid} />)}
                                </div>
                                <div className="page-area">
                                    <button className="btn prev" onClick={pageDown}><FaChevronLeft /></button>
                                    <div className="page-wrap">
                                        <span className="page">{page}</span>
                                        <span>/</span>
                                        <span className="total">{evtProds.length % 20 === 0 ? evtProds.length / 20 : parseInt(evtProds.length / 20) + 1}</span>
                                    </div>
                                    <button className="btn next" onClick={pageUp}><FaChevronRight /></button>
                                </div>
                            </>
                            : <div className="null">상품이 없습니다.</div>
                    }
                </div>
            </div >
        </section>
    )
}

export default Events;