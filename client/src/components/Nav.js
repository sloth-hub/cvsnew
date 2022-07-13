import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <nav>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
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