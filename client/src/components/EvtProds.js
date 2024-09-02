import React from "react";
import Buttons from "./Buttons";

const EvtProds = ({ prods, isHome, uid }) => {

    const imgLazyLoading = ({ target }) => {
        const loader = target.parentElement.previousSibling;
        if (target.complete) {
            loader.classList.add("false");
        }
    }

    return (
        <li className="prod-box">
            <div className="img-loader"></div>
            <div className="img-box">
                <img src={prods.imgsrc.indexOf("http") === -1 ? "images/error.webp" : prods.imgsrc} alt={prods.title} onLoad={imgLazyLoading} />
            </div>
            <div className="ico">
                <i className="evt-type">{prods.type}</i>
                <i className={`evt-store ${prods.store === "7-eleven" ? "se" : prods.store}`}>{prods.store === "emart24" ? "이마트24" : prods.store}</i>
            </div>
            {isHome ? null : <Buttons prods={prods} cvs={prods.store} uid={uid} />}
            <div className="info">
                <h3>{prods.title}</h3>
                {prods.price.discount ?
                    <p><strong>{prods.price.discount}</strong>원<del className="discount">{prods.price.cost}</del></p> :
                    <p><strong>{prods.price}</strong>원</p>
                }
            </div>
        </li>
    )
}

export default EvtProds;