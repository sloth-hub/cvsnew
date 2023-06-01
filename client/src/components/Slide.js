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
        imagePreload([
            "/images/bg_1_s.webp",
            "/images/bg_2_s.webp",
            "/images/bg_3_s.webp"
        ]);
    }, []);

    const imagePreload = (urls) => {
        urls.forEach(url => {
            const img = new Image();
            img.src = `${process.env.PUBLIC_URL}${url}`
        });
    }

    return (
        <Slider {...settings}>
            <div className="slide-box one">
                <div className="img-box">
                    <img src={`${process.env.PUBLIC_URL}/images/bg_1_s.webp`} alt="CU 연세우유 말차생크림빵" loading="lazy" />
                </div>
                <div className="text-box blind">
                    <h1>부드러운 말차크림을 진한 커스타드와 화이트 초콜렛으로 감싼</h1>
                    <h2>CU 연세우유 말차생크림빵</h2>
                </div>
            </div>
            <div className="slide-box two">
                <div className="img-box">
                    <img src={`${process.env.PUBLIC_URL}/images/bg_2_s.webp`} alt="7-Eleven 산리오 캐릭터즈 푸드 에디션" loading="lazy" />
                </div>
                <div className="text-box blind">
                    <h1>산리오캐릭터즈 판박이 스티커가 들어있는</h1>
                    <h2>7-Eleven 산리오 캐릭터즈 푸드 에디션</h2>
                </div>
            </div>
            <div className="slide-box three">
                <div className="img-box">
                    <img src={`${process.env.PUBLIC_URL}/images/bg_3_s.webp`} alt="GS25 혜자로운집밥 도시락 시리즈" loading="lazy" />
                </div>
                <div className="text-box blind">
                    <h1>집밥처럼 맛있고 푸짐하게!</h1>
                    <h2>GS25 혜자로운집밥 도시락 시리즈</h2>
                </div>
            </div>
        </Slider>
    )
}

export default Slide;