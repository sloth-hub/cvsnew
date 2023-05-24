import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1300,
        arrows: false
    }

    return (
        <Slider {...settings}>
            <div className="slide-box one">
                <div className="img-box">
                    <img src={`${process.env.PUBLIC_URL}/images/bg_1_s.png`} />
                </div>
                <div className="text-box blind">
                    <p>부드러운 말차크림을 진한 커스타드와 화이트 초콜렛으로 감싼  </p>
                    <h3>CU 연세우유 말차생크림빵</h3>
                </div>
            </div>
            <div className="slide-box two">
                <div className="img-box">
                <img src={`${process.env.PUBLIC_URL}/images/bg_2_s.png`}/>
                </div>
                <div className="text-box blind">
                    <p>물대신 제주우유로 반죽해서 더 부드러운</p>
                    <h3>7-Eleven 제주우유 생크림빵</h3>
                </div>
            </div>
            <div className="slide-box three">
                <div className="img-box">
                <img src={`${process.env.PUBLIC_URL}/images/bg_3_s.png`} />
                </div>
                <div className="text-box blind">
                    <p>상큼 딸기 X 촉촉 생크림 X 깜찍 몰랑이</p>
                    <h3>GS25 딸기 샌드위치 에디션</h3>
                </div>
            </div>
        </Slider>
    )
}

export default Slide;