import React, { useEffect } from "react";
import NewProds from "../components/NewProds";

const SE = ({ isLoading, prods, uid, upDate }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="prods-wrap">
            <div className="inner">
                <h2>7ELEVEN</h2>
                <span className="update-date">update | {upDate}</span>
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