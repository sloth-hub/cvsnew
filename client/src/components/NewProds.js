import React from "react";
import { GiShare } from "react-icons/gi"
import { AiFillHeart } from "react-icons/ai"
import ShareBtn from "./ShareBtn";

const NewProds = ({ prods, cvs, isHome }) => {

    function clickedShareBtn({ target }) {
        const shareList = target.closest(".buttons").querySelector(".share-list");
        const lists = document.querySelectorAll(".share-list");
        shareList.classList.toggle("active");
        lists.forEach(list => {
            if (shareList !== list) list.classList.remove("active");
        });
    }

    return (
        <li className="prod-box">
            <div className="img-box">
                <img src={prods.imgsrc} alt={prods.title} onError={e => e.target.src = "images/error.png"} />
            </div>
            {isHome ? null : <div className="buttons">
                <button className="like"><AiFillHeart /><span className="blind">좋아요</span></button>
                <button className="share" onClick={clickedShareBtn}><GiShare /><span className="blind">sns 공유</span></button>
                <ShareBtn prods={prods} cvs={cvs} />
            </div>}
            <div className="info">
                <h3>{prods.title}</h3>
                <h4>{prods.price}<span>원</span></h4>
            </div>
        </li>
    )
}

export default NewProds;