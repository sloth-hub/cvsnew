import React, { useEffect } from "react";
import NewProds from "../components/NewProds";

const CU = ({ isLoading, prods, uid, upDate }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="prods-wrap">
            <div className="inner">
                <h2>CU | 오늘의 신상</h2>
                <div className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.cu.map((newProd, index) =>
                                <NewProds key={index} prods={newProd} cvs="cu" uid={uid} />
                            )}
                        </>
                    }
                </div>
                <div className={isLoading ? "loader" : "loader hide"}>
                    <img src="./images/loading.gif" alt="loading" />
                </div>
            </div>
        </div>
    )
}

export default CU;