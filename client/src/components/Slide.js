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

    useEffect(() => {
        window.onresize = (e) => {
            const textbox = document.querySelectorAll("div.text-box");
            textbox.forEach((e) => {
                if (window.innerWidth <= 767) {
                    e.classList.remove("blind");
                } else {
                    e.classList.add("blind");
                }
            });
        }
    }, []);

    return (
        <Slider {...settings}>
            <div className="slide-box one">
                <div className="img-box"></div>
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>CU X 어프어프의 귀여운 콜라보!</p>
                    <h3>CU 레몬토닉 &<br />얼그레이 하이볼캔</h3>
                </div>
            </div>
            <div className="slide-box two">
                <div className="img-box"></div>
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>고소하고 담백한 제주우유에 샤인머스캣과 감귤이 퐁당!</p>
                    <h3><span>7</span>-Eleven 제주우유<br />샤인머스캣&감귤샌드</h3>
                </div>
            </div>
            <div className="slide-box three">
                <div className="img-box"></div>
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>상큼 딸기 X 촉촉 생크림 X 깜찍 몰랑이</p>
                    <h3>GS25 딸기<br />샌드위치 에디션</h3>
                </div>
            </div>
        </Slider>
    )
}

export default Slide;