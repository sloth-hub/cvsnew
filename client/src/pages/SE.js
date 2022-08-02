import React from "react";
import NewProds from "../components/NewProds";

const SE = ({ prods }) => {

    return (
        <div className="prods-wrap ">
            <div className="inner">
                <h2>7Eleven</h2>
                <ul className="prods">
                    {prods.se.map((newProd, index) =>
                        <NewProds key={index} prods={newProd} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SE;