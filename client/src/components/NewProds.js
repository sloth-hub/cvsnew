import React from "react";

const NewProds = ({ prods }) => {

    return (
        <div className="prod-box">
            <img src={prods.imgsrc} alt={prods.title} />
            <h3>{prods.title}</h3>
            <h4>{prods.price}</h4>
        </div>
    )
}

export default NewProds;