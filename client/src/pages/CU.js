import React, { useEffect } from "react";
import NewProds from "../components/NewProds";

const CU = ({ isLoading, prods, uid }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="prods-wrap">
            <div className="inner">
                <h1>CU | 오늘의 신상</h1>
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
        </section>
    )
}

export default CU;