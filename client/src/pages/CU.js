import React from "react";
import NewProds from "../components/NewProds";

const CU = ({ prods }) => {

    return (
        <div className="prods-wrap ">
            <div className="inner">
                <h2>CU</h2>
                <ul className="prods">
                    {prods.cu.map((newProd, index) =>
                        <NewProds key={index} prods={newProd} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default CU;