import React, { useEffect } from "react";
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
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>잔하고 고소한 연세우유<br/>생크림을 가득 넣은</p>
                    <h3>CU 연세우유<br/>생크림빵 시리즈</h3>
                </div>
            </div>
            <div className="slide-box three">
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>말차의 모든것을 편의점에서 가까이</p>
                    <h3>GS25 핫더티<br/>슈퍼말차 시리즈</h3>
                </div>
            </div>
        </Slider>
    )
}

export default Slide;