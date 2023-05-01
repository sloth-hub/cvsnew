import React from "react";
import { Helmet } from "react-helmet";

const ShareHelmet = (props) => {

    if (props.type) {
        return (
            <Helmet>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CVSNEW" />
                <meta property="og:url" content="https://cvsnew-sloth-hub.koyeb.app/" />
                {props.type === "증정" || "할인" ? <meta property="og:description" content={`📢 편의점 행사 알리미 📢 지금 ${props.cvs}에서는 ${props.name}이(가) ${props.price}원!`} /> :
                    <meta property="og:description" content={`📢 편의점 행사 알리미 📢 지금 ${props.cvs}에서는 ${props.name}이(가) ${props.type}!`} />
                }
                <meta property="og:image" content={props.image} />
            </Helmet>
        );
    } else {
        return (
            <Helmet>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CVSNEW" />
                <meta property="og:url" content="https://cvsnew-sloth-hub.koyeb.app/" />
                <meta property="og:description" content={`📢 편의점 신상 알리미 📢 ${props.cvs}에서 새로 나온 ${props.name} 먹어보자! `} />
                <meta property="og:image" content={props.image} />
            </Helmet>
        );
    }

}

export default ShareHelmet;