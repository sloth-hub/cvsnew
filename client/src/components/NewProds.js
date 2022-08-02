import React from "react";

const NewProds = ({ prods }) => {

    return (
        <div className="prod-box">
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} />
            </div>
            <div className="info">
                <h3>{prods.title}</h3>
                <h4>{prods.price}</h4>
            </div>
        </div>
    )
}

export default NewProds;