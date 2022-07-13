import React, { useEffect, useState } from "react";
import axios from "axios";
import NewProds from "../components/NewProds";

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [newProds, setNewProds] = useState(null);

    useEffect(() => {
        axios.get("/api").then((res) => {
            setNewProds({
                cu: res.data[0],
                se: res.data[1],
                gs: res.data[2]
            });
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="wrap">
            {isLoading ? <div className="loader">loading...</div> :
                <div>
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
                </div>
            }
        </div>
    );
}

export default Home;