import React from "react";
import NewProds from "../components/NewProds";
import cheerio from "cheerio";
import axios from "axios";

const GS = ({ isLoading, prods }) => {

    return (
        <div className="prods-wrap ">
            <div className="inner">
                <h2>GS25</h2>
                <ul className="prods">
                    {isLoading ? <></> :
                        <>
                            {prods.gs.map((newProd, index) =>
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

export default GS;