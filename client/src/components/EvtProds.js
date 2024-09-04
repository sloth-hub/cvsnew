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
                {prods.title.includes("증정") &&
                    <div className="giveaway-wrap">
                        <span className="giveaway">증정품</span>
                        <span className="giveaway-name">{prods.title.split("증정")[1].substr(1)}</span>
                    </div>}
            </div>
            <div className="ico">
                {prods.type !== "증정" && <i className="evt-type">{prods.type}</i>}
                <i className={`evt-store ${prods.store === "7-eleven" ? "se" : prods.store}`}>{prods.store === "emart24" ? "이마트24" : prods.store}</i>
            </div>
            <div className="info">
                {isHome ? null : <Buttons prods={prods} cvs={prods.store} uid={uid} />}
                <h3>{prods.title.includes("증정") ? prods.title.split("증정")[0].slice(0, -2) : prods.title}</h3>
                {prods.price.discount ?
                    <p><strong>{prods.price.discount}</strong>원<del className="discount">{prods.price.cost}</del></p> :
                    <p><strong>{prods.price}</strong>원</p>
                }
            </div>
        </li>
    )
}

export default EvtProds;