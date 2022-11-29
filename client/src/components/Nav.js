import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"

const Nav = () => {

    useEffect(() => {
        menuInit();
    }, []);

    function menuInit() {
        let path = window.location.pathname.substr(1);
        const items = document.querySelectorAll("nav ul li");
        items.forEach((e) => {
            if (e.dataset.value === path) {
                e.classList.add("active");
            }
        });
    }

    function activeMenu(e) {
        const items = document.querySelectorAll("nav ul li");
        items.forEach((e) => {
            e.classList.remove("active");
        });
        e.target.classList.add("active");
    }

    function hmbgrMenu(e) {
        document.querySelector("ul.menu").classList.toggle("active");
    }

    return (
        <nav className="inner">
            <Link to="/" onClick={activeMenu}>
                <h1 className="logo">CVSNEW</h1>
            </Link>
            <ul className="menu">
                <Link to="/events" onClick={activeMenu}>
                    <li data-value="events">EVENTS</li>
                </Link>
                <Link to="/cu" onClick={activeMenu}>
                    <li data-value="cu">CU</li>
                </Link>
                <Link to="/se" onClick={activeMenu}>
                    <li data-value="se">7ELEVEN</li>
                </Link>
                <Link to="/gs" onClick={activeMenu}>
                    <li data-value="gs">GS25</li>
                </Link>
            </ul>
            <button className="hmbgr" onClick={hmbgrMenu}>
                <FiMenu size="30" color="#5b5b5d" />
                <div className="blind">menu</div>
            </button>
        </nav>
    )
}

export default Nav;