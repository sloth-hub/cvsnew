import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewProds from "../components/NewProds";
import Slide from "../components/Slide";
import { Link } from "react-router-dom";

const Home = ({ isLoading, prods }) => {

    const setting = {
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true
                }
            }
        ]
    }

    return (
        <>
            <div className="hot-prods">
                <div className="inner">
                    <Slide />
                </div>
            </div>
            <div className="new-prods">
                <div className="inner">
                    {isLoading ? null :
                        <>
                            <div className="title-wrap">
                                <h1>오늘의 신상품</h1>
                                <p>각 편의점별 오늘의 신상품들을 만나보세요!</p>
                            </div>
                            <div className="cvs-wrap">
                                <div className="title">
                                    <h2>CU</h2>
                                    <Link to="/cu" className="more">상품 더보기</Link>
                                </div>
                                <Slider {...setting}>
                                    {prods.cu.slice(0, 10).map((newProd, index) =>
                                        <NewProds key={index} prods={newProd} cvs={"cu"} isHome={true} />
                                    )}
                                </Slider>
                            </div>
                            <div className="cvs-wrap">
                                <div className="title">
                                    <h2>7ELEVEN</h2>
                                    <Link to="/se" className="more">상품 더보기</Link>
                                </div>
                                <Slider {...setting}>
                                    {prods.se === undefined ? null : prods.se.slice(0, 10).map((newProd, index) =>
                                        <NewProds key={index} prods={newProd} cvs={"se"} isHome={true} />
                                    )}
                                </Slider>
                            </div>
                            <div className="cvs-wrap">
                                <div className="title">
                                    <h2>GS25</h2>
                                    <Link to="/gs" className="more">상품 더보기</Link>
                                </div>
                                <Slider {...setting}>
                                    {prods.gs.slice(0, 10).map((newProd, index) =>
                                        <NewProds key={index} prods={newProd} cvs={"gs"} isHome={true} />
                                    )}
                                </Slider>
                            </div>
                        </>
                    }
                    <div className={isLoading ? "loader" : "loader hide"}>
                        <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;