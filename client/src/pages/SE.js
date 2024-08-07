import React, { useEffect } from "react";
import NewProds from "../components/NewProds";

const SE = ({ isLoading, prods, uid }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="prods-wrap">
            <div className="inner">
                <h2>7-ELEVEN | 오늘의 신상</h2>
                <div className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.se.map((newProd, index) =>
                                <NewProds key={index} prods={newProd} cvs="7-eleven" uid={uid} />
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

export default SE;