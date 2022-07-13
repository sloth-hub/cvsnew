import React from "react";
import NewProds from "../components/NewProds";

const GS = ({ prods }) => {

    return (
        <>
            <div>GS25</div>
            <ul className="prods">
                {prods.gs.map((newProd, index) =>
                    <NewProds key={index} prods={newProd} />
                )}
            </ul>
        </>
    )
}

export default GS;