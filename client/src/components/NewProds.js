import React from "react";
import Buttons from "./Buttons";

const NewProds = ({ prods, cvs, isHome, uid }) => {

    const imgLazyLoading = ({ target }) => {
        const loader = target.parentElement.previousSibling;
        if (target.complete) {
            loader.classList.add("false");
        }
    }

    return (
        isHome ? <article className="prod-box">
            <div className="img-loader"></div>
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src = "images/error.webp"} onLoad={imgLazyLoading} />
            </div>
            <div className="info">
                <h3>{prods.title}</h3>
                <p><strong>{prods.price}</strong>원</p>
            </div>
        </article> :
            <li className="prod-box">
                <div className="img-loader"></div>
                <div className="img-box">
                    <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src = "images/error.webp"} onLoad={imgLazyLoading} />
                </div>
                <Buttons prods={prods} cvs={cvs} uid={uid} />
                <div className="info">
                    <h3>{prods.title}</h3>
                    <p><strong>{prods.price}</strong>원</p>
                </div>
            </li>
    )
}

export default NewProds;