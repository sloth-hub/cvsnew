import React from "react";

const NewProds = ({ prods }) => {

    return (
        <div className="prod-box">
            <img src={prods.imgsrc} alt={prods.title} />
            <h2>{prods.title}</h2>
            <h3>{prods.price}</h3>
        </div>
    )
}

export default NewProds;