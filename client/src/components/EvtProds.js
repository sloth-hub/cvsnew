import React from "react";

const EvtProds = ({ prods }) => {

    return (
        <li className="prod-box">
            <div className="img-box">
                <img src={prods.imgsrc.indexOf("http") === -1 ? "images/error.png" : prods.imgsrc} alt={prods.title}/>
            </div>
            <div className="ico">
                <span className="evt-type">{prods.type}</span>
                <span className={`evt-store ${prods.store === "7-eleven" ? "se" : prods.store}`}>{prods.store}</span>
            </div>
            <div className="info">
                <h3>{prods.title}</h3>
                {prods.price.discount ?
                    <h4>{prods.price.discount}<span>원</span><span className="discount">{prods.price.cost}</span></h4> :
                    <h4>{prods.price}<span>원</span></h4>
                }
            </div>
        </li>
    )
}

export default EvtProds;