import React from "react";
import NewProds from "../components/NewProds";

const CU = ({ isLoading, prods }) => {

    return (
        <div className="prods-wrap ">
            <div className="inner">
                <h2>CU</h2>
                <ul className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.cu.map((newProd, index) =>
                                <NewProds key={index} prods={newProd} cvs="gs" />
                            )}
                        </>
                    }
                    <div className={isLoading ? "loader" : "loader hide"}>
                        <img src="./images/loading.gif" alt="loading" />
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default CU;