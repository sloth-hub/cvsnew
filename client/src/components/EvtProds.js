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
        <div className="prod-box">
            <div className="img-loader"></div>
            <div className="img-box">
                <img src={prods.imgsrc.indexOf("http") === -1 ? "images/error.webp" : prods.imgsrc} alt={prods.title} onLoad={imgLazyLoading} />
            </div>
            <div className="ico">
                <span className="evt-type">{prods.type}</span>
                <span className={`evt-store ${prods.store === "7-eleven" ? "se" : prods.store}`}>{prods.store === "emart24" ? "이마트24" : prods.store}</span>
            </div>
            {isHome ? null : <Buttons prods={prods} cvs={prods.store} uid={uid} />}
            <div className="info">
                <h3>{prods.title}</h3>
                {prods.price.discount ?
                    <h4>{prods.price.discount}<span>원</span><span className="discount">{prods.price.cost}</span></h4> :
                    <h4>{prods.price}<span>원</span></h4>
                }
            </div>
        </div >
    )
}

export default EvtProds;