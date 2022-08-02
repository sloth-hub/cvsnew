import React from "react";
import NewProds from "../components/NewProds";

const GS = ({ prods }) => {

    return (
        <div className="prods-wrap ">
            <div className="inner">
                <h2>GS25</h2>
                <ul className="prods">
                    {prods.gs.map((newProd, index) =>
                        <NewProds key={index} prods={newProd} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default GS;