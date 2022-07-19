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
            <div className={isLoading ? "loader" : "loader hide"}>
                <img src="./images/loading.gif" alt="loading" />
            </div>
            <div className="hot-prods">
                <div className="inner">
                    <h1>이달의 핫한 신상</h1>
                </div>
                <Slide />
            </div>
            {isLoading ? null : <>
                <div className="new-prods">
                    <div className="inner">
                        <h1>CU</h1>
                        <Slider {...setting}>
                            {prods.cu.slice(0, 8).map((newProd, index) =>
                                <NewProds key={index} prods={newProd} />
                            )}
                        </Slider>
                        <h1>7ELEVEN</h1>
                        <Slider {...setting}>
                            {prods.se.slice(0, 8).map((newProd, index) =>
                                <NewProds key={index} prods={newProd} />
                            )}
                        </Slider>
                        <h1>GS25</h1>
                        <Slider {...setting}>
                            {prods.gs.slice(0, 8).map((newProd, index) =>
                                <NewProds key={index} prods={newProd} />
                            )}
                        </Slider>
                    </div>
                </div>
            </>}
        </>
    );
}

export default Home;