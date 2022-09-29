import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewProds from "../components/NewProds";

const CU = ({ isLoading, prods }) => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    
    const navigate = useNavigate();

    return (
        <div className="prods-wrap ">
            <div className="inner">
                <h2>CU</h2>
                <ul className="prods">
                    {isLoading ? navigate("/") :
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