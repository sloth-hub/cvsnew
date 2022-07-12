import React from "react";
import NewProds from "../components/NewProds";

const Home = ({ newProds }) => {

    return (
        <>
            <ul className="prods">
                {newProds.cu.slice(0, 8).map((newProd, index) =>
                    <NewProds key={index} prods={newProd} />
                )}
            </ul>
            <ul className="prods">
                {newProds.se.slice(0, 8).map((newProd, index) =>
                    <NewProds key={index} prods={newProd} />
                )}
            </ul>
            <ul className="prods">
                {newProds.gs.slice(0, 8).map((newProd, index) =>
                    <NewProds key={index} prods={newProd} />
                )}
            </ul>
        </>
    );
}

export default Home;