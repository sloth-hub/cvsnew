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
                        <h3>연세우유 우유생크림빵</h3>
                        <h4>텍스트 테스트 입니다</h4>
                    </div>
                    <img src="./images/hot_prods_cu.png" alt="연세우유 우유생크림빵" />
                </div>
            </div>
            <div className="slide-box two">
                <div>
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