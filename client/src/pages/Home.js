import React from "react";
import NewProds from "../components/NewProds";

const Home = ({ isLoading, prods }) => {

    return (
        <>
            {isLoading ? <div className="loader">loading...</div> :
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
                </>
            }
        </>
    );
}

export default Home;