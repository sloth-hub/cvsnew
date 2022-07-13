import React from "react";
import NewProds from "../components/NewProds";

const SE = ({ prods }) => {

    return (
        <>
            <div>7Eleven</div>
            <ul className="prods">
                {prods.se.map((newProd, index) =>
                    <NewProds key={index} prods={newProd} />
                )}
            </ul>
        </>
    )
}

export default SE;