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
                    <p>단짠단짠 옥수수크림과 톡톡 터지는 옥수수알이 가득!</p>
                    <h3>CU 연세우유<br />옥수수 생크림빵</h3>
                </div>
            </div>
            <div className="slide-box two">
                <div className="img-box"></div>
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>18종 랜덤 포켓몬 스티커가 들어있는</p>
                    <h3><span>7</span>-Eleven 포켓몬<br />피카츄 & 파이리 덮밥</h3>
                </div>
            </div>
            <div className="slide-box three">
                <div className="img-box"></div>
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>말차의 모든것을 편의점에서 가까이</p>
                    <h3>GS25 핫더티<br />슈퍼말차 시리즈</h3>
                </div>
            </div>
        </Slider>
    )
}

export default Slide;