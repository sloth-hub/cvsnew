import React from "react";

const NewProds = ({ prods, cvs }) => {

    return (
        <li className={`prod-box ${cvs}`}>
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src ="images/error.png"} />
            </div>
            <div className="info">
                <h3>{prods.title}</h3>
                <h4>{prods.price}<span>원</span></h4>
            </div>
        </li>
    )
}

export default NewProds;