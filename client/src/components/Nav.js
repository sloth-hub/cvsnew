import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav className="inner">
                <Link to="/">
                    <h1 className="logo">CVSNEW</h1>
                </Link>
            <ul>
                <Link to="/best">
                    <li>BEST</li>
                </Link>
                <Link to="/cu">
                    <li>CU</li>
                </Link>
                <Link to="/se">
                    <li>7ELEVEN</li>
                </Link>
                <Link to="/gs">
                    <li>GS25</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;