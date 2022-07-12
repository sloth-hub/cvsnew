import React from "react";
import NewProds from "../components/NewProds";

const Home = ({ newProds }) => {

    return (
        <>
            <div className="hot-prods">
                <ul>
                    <li>
                        <img src="./images/hot_prods_cu.jpg" alt="연세우유 우유생크림빵" />
                    </li>
                    <li>
                        <img src="./images/hot_prods_gs.jpg" alt="슈퍼말차라떼" />
                    </li>
                </ul>
            </div>
            <div className="new-prods">
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
            </div>
        </>
    );
}

export default Home;