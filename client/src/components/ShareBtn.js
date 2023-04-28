import React, { useEffect } from "react";
import { GiShare } from "react-icons/gi"
import { AiFillHeart } from "react-icons/ai"
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa"
import { RiKakaoTalkFill } from "react-icons/ri"
import { BiLinkAlt } from "react-icons/bi";

const ShareBtn = ({ name, price, image, cvs }) => {

    function createKakaoButton({ target }) {
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

    return (
        <div className="share-list">
            <button className="facebook"><FaFacebookSquare /><span className="blind">페이스북</span></button>
            <button className="twitter"><FaTwitterSquare /><span className="blind">트위터</span></button>
            <button className="kakaotalk" onClick={createKakaoButton}><RiKakaoTalkFill /><span className="blind">카카오톡</span></button>
            <button><BiLinkAlt /><span className="blind">링크복사</span></button>
        </div>
    );
}

export default ShareBtn;