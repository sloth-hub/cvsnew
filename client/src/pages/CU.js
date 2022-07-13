import React from "react";
import NewProds from "../components/NewProds";

const CU = ({ isLoading, prods }) => {

    return (
        <>
            <div>CU</div>
            <ul className="prods">
                {prods.cu.map((newProd, index) =>
                    <NewProds key={index} prods={newProd} />
                )}
            </ul>
        </>
    )
}

export default CU;