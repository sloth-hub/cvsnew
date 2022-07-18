import React from "react";
import NewProds from "../components/NewProds";
import Slide from "../components/Slide";

const Home = ({ isLoading, prods }) => {

    return (
        <>
            <div className={isLoading ? "loader" : "loader hide"}>
                <img src="./images/loading.gif" alt="loading"/>
            </div>
            <div className="hot-prods">
                <h1>이달의 핫한 신상</h1>
                <Slide />
            </div>
            {isLoading ? null : <>
                <div className="new-prods">
                    <h1>CU</h1>
                    <ul className="prods">
                        {prods.cu.slice(0, 8).map((newProd, index) =>
                            <NewProds key={index} prods={newProd} />
                        )}
                    </ul>
                    <h1>7ELEVEN</h1>
                    <ul className="prods">
                        {prods.se.slice(0, 8).map((newProd, index) =>
                            <NewProds key={index} prods={newProd} />
                        )}
                    </ul>
                    <h1>GS25</h1>
                    <ul className="prods">
                        {prods.gs.slice(0, 8).map((newProd, index) =>
                            <NewProds key={index} prods={newProd} />
                        )}
                    </ul>
                </div>
            </>}
        </>
    );
}

export default Home;