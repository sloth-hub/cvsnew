import React, { useEffect } from "react";
import NewProds from "../components/NewProds";

const SE = ({ isLoading, prods, uid }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="prods-wrap">
            <div className="inner">
                <h1>7-ELEVEN | 오늘의 신상</h1>
                <section className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.se.map((newProd, index) =>
                                <NewProds key={index} prods={newProd} cvs="7-eleven" uid={uid} />
                            )}
                        </>
                    }
                </section>
            </div>
        </section>
    )
}

export default SE;