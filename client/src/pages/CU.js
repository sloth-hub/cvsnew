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
                <section className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.cu.map((newProd, index) =>
                                <NewProds key={index} prods={newProd} cvs="cu" uid={uid} />
                            )}
                        </>
                    }
                </section>
            </div>
        </section>
    )
}

export default CU;