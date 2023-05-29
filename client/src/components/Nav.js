import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi"

const Nav = () => {

    const body = document.querySelector("body");
    const header = body.querySelector("header");
    const menu = body.querySelector("ul.menu");
    const items = document.querySelectorAll("nav ul li a");

    useEffect(() => {
        window.addEventListener("scroll", scrollEvent);
    }, []);

    function scrollEvent() {
        if (window.pageYOffset > 5) {
            document.querySelector("header").style.borderBottom = "1px solid #ebebeb";
        } else {
            document.querySelector("header").style.borderBottom = "";
        }
    }

    function activeMenu({ target }) {

        header.style.backdropFilter = "saturate(180%) blur(20px)";
        if (target.classList.contains("logo")) {
            items.forEach((e) => {
                e.classList.remove("active");
            });
            if (menu.classList.contains("active")) {
                body.classList.remove("stop-scrolling");
                menu.classList.remove("active");
            }
        } else {
            items.forEach((e) => {
                e.classList.remove("active");
            });
            target.classList.add("active");
            if (window.innerWidth < 575.98) {
                menu.classList.toggle("active");
                if (menu.classList.contains("active")) {
                    body.classList.add("stop-scrolling");
                } else {
                    body.classList.remove("stop-scrolling");
                }
            }
        }
    }

    function hmbgrMenu() {
        menu.classList.toggle("active");
        if (menu.classList.contains("active")) {
            header.style.backdropFilter = "none";
            body.classList.add("stop-scrolling");
        } else {
            header.style.backdropFilter = "saturate(180%) blur(20px)";
            body.classList.remove("stop-scrolling");
        }
    }

    return (
        <nav className="inner">
            <Link to="/" onClick={activeMenu}>
                <h1 className="logo">CVSNEW</h1>
            </Link>
            <ul className="menu">
                <li>
                    <Link to="/events" onClick={activeMenu} className={window.location.pathname.substr(1) === "events" ? "active" : ""}>
                        EVENTS
                    </Link>
                </li>
                <li>
                    <Link to="/cu" onClick={activeMenu} className={window.location.pathname.substr(1) === "cu" ? "active" : ""}>
                        CU
                    </Link>
                </li>
                <li>
                    <Link to="/se" onClick={activeMenu} className={window.location.pathname.substr(1) === "se" ? "active" : ""}>
                        7ELEVEN
                    </Link>
                </li>
                <li>
                    <Link to="/gs" onClick={activeMenu} className={window.location.pathname.substr(1) === "gs" ? "active" : ""}>
                        GS25
                    </Link>
                </li>
            </ul>
            <button className="hmbgr" onClick={hmbgrMenu}>
                <FiMenu size="30" color="#5b5b5d" />
                <div className="blind">menu</div>
            </button>
        </nav>
    )
}

export default Nav;