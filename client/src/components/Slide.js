import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 2000,
        speed: 1500,
        arrows: false
        // slidesToShow: 1,
        // slidesToScroll: 1
    }

    return (
        <Slider {...settings}>
            <div className="slide-box one">
                <div>
                    <div className="text-box one">
                        <h3>연세우유 생크림빵 시리즈</h3>
                        <h4>진하고 고소한 연세우유 생크림을 가득 넣은</h4>
                        <span className="cvs-name"><img src="./images/cu_logo.png" alt="CU" /></span>
                    </div>
                    <div className="img-box">
                        <img src="./images/hot_cu.png" alt="연세우유 생크림빵 시리즈" />
                    </div>
                </div>
            </div>
            <div className="slide-box two">
                <div>

                    <div className="text-box two">
                        <h3>핫더티 슈퍼말차 시리즈</h3>
                        <h4>말차의 모든 것을 편의점에서 가까이</h4>
                        <span className="cvs-name"><img src="./images/gs_logo.gif" alt="GS25" /></span>
                    </div>
                    <div className="img-box">
                        <img src="./images/hot_gs.png" alt="핫더티 슈퍼말차 시리즈" />
                    </div>
                </div>
            </div>
        </Slider>
    )
}

export default Slide;