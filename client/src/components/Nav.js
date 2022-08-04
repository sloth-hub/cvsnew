import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {

    function activeMenu(e) {
        const items = document.querySelectorAll("nav ul li");
        items.forEach((e)=>{
            e.classList.remove("active");
        });
        e.target.classList.add("active");
    }

    return (
        <nav className="inner">
            <Link to="/" onClick={activeMenu}>
                <h1 className="logo">CVSNEW</h1>
            </Link>
            <ul>
                <Link to="/best" onClick={activeMenu}>
                    <li>BEST</li>
                </Link>
                <Link to="/cu" onClick={activeMenu}>
                    <li>CU</li>
                </Link>
                <Link to="/se" onClick={activeMenu}>
                    <li>7ELEVEN</li>
                </Link>
                <Link to="/gs" onClick={activeMenu}>
                    <li>GS25</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;