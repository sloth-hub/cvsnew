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
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>진하고 고소한 연세우유 생크림을 가득 넣은</p>
                    <h3>CU 연세우유<br/>생크림빵 시리즈</h3>
                </div>
            </div>
            <div className="slide-box two">
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>포켓몬 스티커 &#38; 써클칩이 들어있는</p>
                    <h3><span>7</span>-Eleven 포켓몬<br/>피카츄 도시락 시리즈</h3>
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