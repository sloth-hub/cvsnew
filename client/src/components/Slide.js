import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 4000,
        speed: 1300,
        arrows: false
    }

    return (
        <Slider {...settings}>
            <div className="slide-box one">
                <p className="blind">잔하고 고소한 연세우유 생크림을 가득 넣은</p>
                <h3 className="blind">CU 연세우유 생크림빵 시리즈</h3>
            </div>
            <div className="slide-box three">
                <p className="blind">말차의 모든것을 편의점에서 가까이</p>
                <h3 className="blind">GS25 핫더티 슈퍼말차 시리즈</h3>
            </div>
        </Slider>
    )
}

export default Slide;