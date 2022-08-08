import React from "react";
import NewProds from "../components/NewProds";

const SE = ({ isLoading, prods }) => {

    return (
        <div className="prods-wrap ">
        <div className="inner">
            <h2>7ELEVEN</h2>
            <ul className="prods">
                {isLoading ? <></> :
                    <>
                        {prods.se.map((newProd, index) =>
                            <NewProds key={index} prods={newProd} cvs="se" />
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

export default SE;