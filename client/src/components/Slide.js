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
                    <p>팥·완두앙금과 버터크림,
                         국산 딸기잼을 듬뿍 넣은</p>
                    <h3>CU 고대 1905<br/>딸기잼 맘모스빵</h3>
                </div>
            </div>
            <div className="slide-box two">
                <div className="img-box"></div>
                <div className={window.innerWidth <= 767 ? "text-box" : "text-box blind"}>
                    <p>물대신 제주우유로 반죽해서 더 부드러운</p>
                    <h3><span>7</span>-Eleven<br />제주우유 생크림빵</h3>
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