import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewProds from "../components/NewProds";
import Slide from "../components/Slide";

const Home = ({ isLoading, prods }) => {

    const setting = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    }

    return (
        <>
            <div className="hot-prods">
                <Slide />
                <div className="inner">
                    <h2>이달의 <strong>핫한</strong> 신상</h2>
                </div>
            </div>
            <div className="new-prods">
                <div className="inner">
                    <div className={isLoading ? "loader" : "loader hide"}>
                        <img src="./images/loading.gif" alt="loading" />
                    </div>
                    {isLoading ? null :
                        <>
                            <h2>CU</h2>
                            <Slider {...setting}>
                                {prods.cu.slice(0, 8).map((newProd, index) =>
                                    <NewProds key={index} prods={newProd} />
                                )}
                            </Slider>
                            <h2>7ELEVEN</h2>
                            <Slider {...setting}>
                                {prods.se.slice(0, 8).map((newProd, index) =>
                                    <NewProds key={index} prods={newProd} />
                                )}
                            </Slider>
                            <h2>GS25</h2>
                            <Slider {...setting}>
                                {prods.gs.slice(0, 8).map((newProd, index) =>
                                    <NewProds key={index} prods={newProd} />
                                )}
                            </Slider>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;