import React, { useEffect } from "react";

const EvtProds = ({ prods }) => {

    return (
        <li className={`prod-box`}>
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} />
            </div>
            <div className="info">
                <h3>{prods.title}</h3><span>{prods.type}</span>
                <h4>{prods.price}<span>원</span></h4>
            </div>
        </li>
    )
}

export default EvtProds;