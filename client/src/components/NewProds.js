import React from "react";

const NewProds = ({ prods }) => {

    return (
        <li>
            <img src={prods.imgsrc} alt={prods.title} />
            <h4>{prods.title}</h4>
            <h5>{prods.price}</h5>
        </li>
    )
}

export default NewProds;