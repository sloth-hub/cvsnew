import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false
        // slidesToShow: 1,
        // slidesToScroll: 1
    }

    return (
        <Slider {...settings}>
            <div className="slide-box">
                <img src="./images/slide_1.png" alt="연세우유 우유생크림빵" />
            </div>
            <div className="slide-box">
                <img src="./images/slide_1.png" alt="연세우유 우유생크림빵" />
            </div>
        </Slider>
    )
}

export default Slide;