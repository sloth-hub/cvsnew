import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1
    }

    return (
        <Slider {...settings}>
            <div>
                <img src="./images/hot_prods_cu.jpg" alt="연세우유 우유생크림빵" />
                 <h4>연세우유 우유생크림빵</h4>
            </div>
            <div>
                <img src="./images/hot_prods_gs.jpg" alt="슈퍼말차라떼" />
                <h4>슈퍼말차라떼</h4>
            </div>
        </Slider>
    )
}

export default Slide;