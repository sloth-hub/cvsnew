import React, { useEffect } from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa"
import { RiKakaoTalkFill } from "react-icons/ri"
import { BiLinkAlt } from "react-icons/bi";
import ShareHelmet from "./ShareHelmet";

const ShareBtn = ({ name, price, image, cvs }) => {

    function shareToKakao() {
        const kakao = window.Kakao;
        if (kakao.isInitialized()) {
            console.log(cvs);
            kakao.Share.sendCustom({
                templateId: 93216,
                templateArgs: {
                    name,
                    price,
                    image,
                    cvs: cvs === "7-eleven" ? "7-eleven으" : cvs
                }
            });

        }
    }

    function shareToTwitter() {

    }

    function shareToFacebook() {

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
        </div>
    );
}

export default ShareBtn;