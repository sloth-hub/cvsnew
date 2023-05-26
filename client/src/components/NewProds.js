import React from "react";
import Buttons from "./Buttons";

const NewProds = ({ prods, cvs, isHome, uid }) => {

    return (
        isHome ? <div className="prod-box">
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src = "images/error.png"} />
            </div>
            
            <div className="info">
                <h3>{prods.title}</h3>
                <h4>{prods.price}<span>원</span></h4>
            </div>
        </div> :
            <li className="prod-box">
                <div className="img-box">
                    <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src = "images/error.png"} />
                </div>
                <Buttons prods={prods} cvs={cvs} uid={uid} />
                <div className="info">
                    <h3>{prods.title}</h3>
                    <h4>{prods.price}<span>원</span></h4>
                </div>
            </li>
    )
}

export default NewProds;