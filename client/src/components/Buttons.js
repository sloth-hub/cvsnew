import React, { useEffect, useState } from "react";
import { GiShare } from "react-icons/gi"
import { AiFillHeart } from "react-icons/ai"
import { database } from "../firebase";
import { get, push, ref, child } from "firebase/database";
import ShareBtn from "./ShareBtn";
import Swal from "sweetalert2";

const Buttons = ({ prods, cvs, uid }) => {

    const [count, setCount] = useState(0);
    const [likes, setLikes] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const dbRef = ref(database);

    useEffect(() => {
        get(child(dbRef, "likes")).then((snapshot) => {
            const likeData = Object.values(snapshot.val());
            setLikes(likeData);
            let i = 0;
            likeData.forEach(e => {
                if (e.name === prods.title) {
                    i += 1;
                    setCount(i);
                }
            });
        }).catch(err => console.log(err));
    }, []);

    function clickedShareBtn({ target }) {
        const shareList = target.closest(".buttons").querySelector(".share-list");
        const lists = document.querySelectorAll(".share-list");
        shareList.classList.toggle("active");
        lists.forEach(list => {
            if (shareList !== list) list.classList.remove("active");
        });
    }

    function clickedLikeBtn() {
        if (likes.find(v => v.name === prods.title && v.uid === uid)) {
            Swal.fire({
                title: "좋아요는 한번만 가능합니다.",
                icon: "warning",
                confirmButtonText: "확인",
                confirmButtonColor: "#4BCFE5"
            });
        } else {
            if (!isClicked) {
                setCount(count + 1);
                setIsClicked(true);
                push(child(dbRef, "likes"), {
                    uid: uid,
                    name: prods.title
                });
            } else {
                Swal.fire({
                    title: "좋아요는 한번만 가능합니다.",
                    icon: "warning",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#4BCFE5"
                });
            }
        }
    }

    return (
        <div className="buttons">
            <button className="like" onClick={clickedLikeBtn}><AiFillHeart /><span className="blind">좋아요</span></button>
            <span className="count">{count}</span>
            <button className="share" onClick={clickedShareBtn}><GiShare /><span className="blind">sns 공유</span></button>
            <ShareBtn prods={prods} cvs={cvs} />
        </div>
    );
}

export default Buttons;