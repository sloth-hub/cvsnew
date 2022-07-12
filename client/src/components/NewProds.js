import React from "react";
// import { Link } from "react-router-dom";

const NewProds = ({ prods }) => {

    return (
        <li>
            {/* <Link to={{
                pathname: `/prod/${prods.id}`,
                state: {
                    id: prods.id,
                    name: prods.name,
                    image: prods.image,
                    price: prods.price,
                    score: prods.score,
                    date: prods.date
                }
            }}> */}
            <img src={prods.imgsrc} alt={prods.title} />
            <h4>{prods.title}</h4>
            <h5>{prods.price}</h5>
            {/* </Link> */}
        </li>
    )
}

export default NewProds;