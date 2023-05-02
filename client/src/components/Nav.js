import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"

const Nav = () => {

    const body  = document.querySelector("body");
    const header = body.querySelector("header");
    const menu = body.querySelector("ul.menu");
    const items = document.querySelectorAll("nav ul li");

    useEffect(() => {
        menuInit();
        window.addEventListener("scroll", scrollEvent);
    }, []);

    function menuInit() {
        let path = window.location.pathname.substr(1);
        items.forEach((e) => {
            if (e.dataset.value === path) {
                e.classList.add("active");
            }
        });
    }

    function scrollEvent() {
        if (window.pageYOffset > 5) {
            document.querySelector("header").style.borderBottom = "1px solid #ebebeb";
        }else{
            document.querySelector("header").style.borderBottom = "";
        }
    }

    function activeMenu({target}) {

        header.style.backdropFilter = "saturate(180%) blur(20px)";
        body.classList.toggle("stop-scrolling");
        if (target.classList.contains("logo")) {
            items.forEach((e) => {
                e.classList.remove("active");
            });
            menu.classList.remove("active");
            if(body.classList.contains("stop-scrolling")) {
                body.classList.remove("stop-scrolling");
            }
        } else {
            menu.classList.toggle("active");
            items.forEach((e) => {
                e.classList.remove("active");
            });
            target.classList.add("active");
        }
    }

    function hmbgrMenu() {
        menu.classList.toggle("active");
        body.classList.toggle("stop-scrolling");
        if (menu.classList.contains("active")) {
            header.style.backdropFilter = "none";
        } else {
            header.style.backdropFilter = "saturate(180%) blur(20px)";
        }
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