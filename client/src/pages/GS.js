import React, { useEffect } from "react";
import NewProds from "../components/NewProds";

const GS = ({ isLoading, prods, uid }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="prods-wrap">
            <div className="inner">
                <h1>GS25 | 오늘의 신상</h1>
                <section className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.gs.map((newProd, index) =>
                                <NewProds key={index} prods={newProd} cvs="gs25" uid={uid} />
                            )}
                        </>
                    }
                </section>
            </div>
        </section>
    )
}

export default GS;