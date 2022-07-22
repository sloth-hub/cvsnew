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
                    <span className="cvs-name">CU</span>
                    <div className="text-box one">
                        <h3>연세우유 생크림빵 시리즈</h3>
                        <h4>진하고 고소한 연세우유 생크림을 가득 넣은</h4>
                    </div>
                    <div className="img-box">
                        <img src="./images/hot_cu.png" alt="연세우유 생크림빵" />
                    </div>
                </div>
            </div>
            <div className="slide-box two">
                <div>
                <span className="cvs-name">GS25</span>
                    <div className="text-box two">
                        <h3>슈퍼말차라떼</h3>
                        <h4>텍스트 테스트 입니다</h4>
                    </div>
                    <img src="./images/hot_prods_gs.png" alt="슈퍼말차라떼" />
                </div>
            </div>
        </Slider>
    )
}

export default Slide;