import React from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa"
import { RiKakaoTalkFill } from "react-icons/ri"
import { BiLinkAlt } from "react-icons/bi";
import ShareHelmet from "./ShareHelmet";

const ShareBtn = ({ prods, cvs }) => {

    function shareToKakao() {
        const kakao = window.Kakao;
        if (kakao.isInitialized()) {
            kakao.Share.sendCustom({
                templateId: 93216,
                templateArgs: {
                    name: prods.title,
                    price: prods.price.discount ? prods.price.discount : prods.price,
                    image: prods.imgsrc,
                    cvs: cvs === "7-eleven" ? "7-eleven으" : cvs
                }
            });
        }
    }

    function changeMetaData() {
        let dsc = document.querySelector("meta[property='og\\:description']");
        let img = document.querySelector("meta[property='og\\:image']");
        let title = prods.title;
        if (prods.type) {
            if (prods.type === "증정") {
                dsc.setAttribute("content", `📢 편의점 행사 알리미 📢 지금 ${cvs}에서는 ${title}이(가) ${prods.price}원!`);
            } else if (prods.type === "할인") {
                // 앞에 브랜드명이 있으면 제품명만 표기
                title = title.indexOf(")") > 0 ? title.split(")")[1] : title;
                dsc.setAttribute("content", `📢 편의점 행사 알리미 📢 지금 ${cvs}에서는 ${title}이(가) ${prods.price.discount}원!`);
            } else {
                // 앞에 브랜드명이 있으면 제품명만 표기
                title = title.indexOf(")") > 0 ? title.split(")")[1] : title;
                dsc.setAttribute("content", `📢 편의점 행사 알리미 📢 지금 ${cvs}에서는 ${title}이(가) ${prods.type}!`);
            }
        } else {
            // 앞에 브랜드명이 있으면 제품명만 표기
            title = title.indexOf(")") > 0 ? title.split(")")[1] : title;
            dsc.setAttribute("content", `📢 편의점 신상 알리미 📢 ${cvs}에서 새로 나온 ${title} 먹어보자!`);
        }
        img.setAttribute("content", prods.imgsrc);
    }
    function shareToTwitter() {
        changeMetaData();
        const dsc = document.querySelector("meta[property='og\\:description']").getAttribute("content");;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(dsc)}&url=${encodeURIComponent(window.location.href)}`);
    }

    function shareToFacebook() {
        changeMetaData();
        window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`);
    }

    function shareToURL({ target }) {
        let popup = document.createElement("div");
        popup.innerText = "복사완료";
        popup.className = "popup";
        const list = target.closest(".share-list");
        if (!list.querySelector(".popup")) {
            list.appendChild(popup);
            navigator.clipboard.writeText(document.location.href);
            setTimeout(() => list.removeChild(popup), 1000);
        }
    }

    return (
        <div className="share-list">
            <button className="facebook" onClick={shareToFacebook}><FaFacebookSquare /><span className="blind">페이스북</span></button>
            <button className="twitter" onClick={shareToTwitter}><FaTwitterSquare /><span className="blind">트위터</span></button>
            <button className="kakaotalk" onClick={shareToKakao}><RiKakaoTalkFill /><span className="blind">카카오톡</span></button>
            <button onClick={shareToURL}><BiLinkAlt /><span className="blind">링크복사</span></button>
            <ShareHelmet />
        </div>
    );
}

export default ShareBtn;