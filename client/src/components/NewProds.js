import React from "react";
import Buttons from "./Buttons";

const NewProds = ({ prods, cvs, isHome, uid }) => {

    return (
        <li className="prod-box">
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src = "images/error.png"} />
            </div>
            {isHome ? null : <Buttons prods={prods} cvs={cvs} uid={uid} />}
            <div className="info">
                <h3>{prods.title}</h3>
                <h4>{prods.price}<span>원</span></h4>
            </div>
        </li>
    )
}

export default NewProds;