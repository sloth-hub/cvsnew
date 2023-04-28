import React from "react";
import { GiShare } from "react-icons/gi"
import { AiFillHeart } from "react-icons/ai"
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa"
import { RiKakaoTalkFill } from "react-icons/ri"
import { BiLinkAlt } from "react-icons/bi";

const EvtProds = ({ prods, isHome }) => {

    function clickedShareBtn({target}) {
        const shareList = target.closest(".buttons").querySelector(".share-list");
        shareList.classList.toggle("active");
    }

    return (
        <li className="prod-box">
            <div className="img-box">
                <img src={prods.imgsrc.indexOf("http") === -1 ? "images/error.png" : prods.imgsrc} alt={prods.title}/>
            </div>
            <div className="ico">
                <span className="evt-type">{prods.type}</span>
                <span className={`evt-store ${prods.store === "7-eleven" ? "se" : prods.store}`}>{prods.store}</span>
            </div>
            {isHome ? null : <div className="buttons">
                <button className="like"><AiFillHeart /><span className="blind">좋아요</span></button>
                <button className="share" onClick={clickedShareBtn}><GiShare /><span className="blind">sns 공유</span></button>
                <div className="share-list">
                    <button className="facebook"><FaFacebookSquare /><span className="blind">페이스북</span></button>
                    <button className="twitter"><FaTwitterSquare /><span className="blind">트위터</span></button>
                    <button className="kakaotalk"><RiKakaoTalkFill /><span className="blind">카카오톡</span></button>
                    <button><BiLinkAlt /><span className="blind">링크복사</span></button>
                </div>
            </div>}
            <div className="info">
                <h3>{prods.title}</h3>
                {prods.price.discount ?
                    <h4>{prods.price.discount}<span>원</span><span className="discount">{prods.price.cost}</span></h4> :
                    <h4>{prods.price}<span>원</span></h4>
                }
            </div>
        </li>
    )
}

export default EvtProds;