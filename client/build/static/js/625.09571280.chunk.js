"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[625],{6293:function(e,s,t){t.d(s,{Z:function(){return v}});var n=t(885),i=t(2791),c=t(8014),r=t(8820),o=t(3108),a=t(408),l=t(6355),d=t(7425),m=t(7692),x=t(4270),h=t(184),p=function(){return(0,h.jsxs)(x.q,{children:[(0,h.jsx)("meta",{property:"og:type",content:"website"}),(0,h.jsx)("meta",{property:"og:title",content:"CVSNEW"}),(0,h.jsx)("meta",{property:"og:url",content:"https://cvsnew-sloth-hub.koyeb.app/"}),(0,h.jsx)("meta",{property:"og:description",content:""}),(0,h.jsx)("meta",{property:"og:image",content:""})]})},u=function(e){var s=e.prods,t=e.cvs;function n(){var e=document.querySelector("meta[property='og\\:description']"),n=document.querySelector("meta[property='og\\:image']"),i=s.title;s.type?"\uc99d\uc815"===s.type?e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \ud589\uc0ac \uc54c\ub9ac\ubbf8 \ud83d\udce2 \uc9c0\uae08 ".concat(t,"\uc5d0\uc11c\ub294 ").concat(i,"\uc774(\uac00) ").concat(s.price,"\uc6d0!")):"\ud560\uc778"===s.type?(i=i.indexOf(")")>0?i.split(")")[1]:i,e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \ud589\uc0ac \uc54c\ub9ac\ubbf8 \ud83d\udce2 \uc9c0\uae08 ".concat(t,"\uc5d0\uc11c\ub294 ").concat(i,"\uc774(\uac00) ").concat(s.price.discount,"\uc6d0!"))):(i=i.indexOf(")")>0?i.split(")")[1]:i,e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \ud589\uc0ac \uc54c\ub9ac\ubbf8 \ud83d\udce2 \uc9c0\uae08 ".concat(t,"\uc5d0\uc11c\ub294 ").concat(i,"\uc774(\uac00) ").concat(s.type,"!"))):(i=i.indexOf(")")>0?i.split(")")[1]:i,e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \uc2e0\uc0c1 \uc54c\ub9ac\ubbf8 \ud83d\udce2 ".concat(t,"\uc5d0\uc11c \uc0c8\ub85c \ub098\uc628 ").concat(i," \uba39\uc5b4\ubcf4\uc790!"))),n.setAttribute("content",s.imgsrc)}return(0,h.jsxs)("div",{className:"share-list",children:[(0,h.jsxs)("button",{className:"facebook",onClick:function(){n(),window.open("https://www.facebook.com/sharer.php?u=".concat(encodeURIComponent(window.location.href)))},children:[(0,h.jsx)(l.R9i,{}),(0,h.jsx)("span",{className:"blind",children:"\ud398\uc774\uc2a4\ubd81"})]}),(0,h.jsxs)("button",{className:"twitter",onClick:function(){n();var e=document.querySelector("meta[property='og\\:description']").getAttribute("content");window.open("https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(e),"&url=").concat(encodeURIComponent(window.location.href)))},children:[(0,h.jsx)(l.N1v,{}),(0,h.jsx)("span",{className:"blind",children:"\ud2b8\uc704\ud130"})]}),(0,h.jsxs)("button",{className:"kakaotalk",onClick:function(){var e=window.Kakao;e.isInitialized()&&e.Share.sendCustom({templateId:s.type&&"\uc99d\uc815"!==s.type?93351:93216,templateArgs:{name:s.title,price:s.price.discount?s.price.discount:s.price,image:s.imgsrc,cvs:s.type&&"\uc99d\uc815"!==s.type?t:"7-eleven\uc73c",type:s.type,header:"\uc99d\uc815"===s.type?"\ud589\uc0ac":"\uc2e0\uc0c1"}})},children:[(0,h.jsx)(d.X78,{}),(0,h.jsx)("span",{className:"blind",children:"\uce74\uce74\uc624\ud1a1"})]}),(0,h.jsxs)("button",{onClick:function(e){var s=e.target,t=document.createElement("div");t.innerText="\ubcf5\uc0ac\uc644\ub8cc",t.className="popup";var n=s.closest(".share-list");n.querySelector(".popup")||(n.appendChild(t),navigator.clipboard.writeText(document.location.href),setTimeout((function(){return n.removeChild(t)}),1e3))},children:[(0,h.jsx)(m.BNl,{}),(0,h.jsx)("span",{className:"blind",children:"\ub9c1\ud06c\ubcf5\uc0ac"})]}),(0,h.jsx)(p,{})]})},j=t(1830),g=t.n(j),v=function(e){var s=e.prods,t=e.cvs,l=e.uid,d=(0,i.useState)(0),m=(0,n.Z)(d,2),x=m[0],p=m[1],j=(0,i.useState)([]),v=(0,n.Z)(j,2),b=v[0],f=v[1],N=(0,i.useState)(!1),w=(0,n.Z)(N,2),y=w[0],S=w[1],k=(0,a.iH)(o.F);return(0,i.useEffect)((function(){(0,a.U2)((0,a.iU)(k,"likes")).then((function(e){var t=Object.values(e.val());f(t);var n=0;t.forEach((function(e){e.name===s.title&&p(n+=1)}))})).catch((function(e){return console.log(e)}))}),[]),(0,h.jsxs)("div",{className:"buttons",children:[(0,h.jsxs)("button",{className:"like",onClick:function(){b.find((function(e){return e.name===s.title&&e.uid===l}))||y?g().fire({title:"\uc88b\uc544\uc694\ub294 \ud55c\ubc88\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4.",icon:"warning",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#4BCFE5"}):(p(x+1),S(!0),(0,a.VF)((0,a.iU)(k,"likes"),{uid:l,name:s.title}))},children:[(0,h.jsx)(r.M_L,{}),(0,h.jsx)("span",{className:"blind",children:"\uc88b\uc544\uc694"})]}),(0,h.jsx)("span",{className:"count",children:x}),(0,h.jsxs)("button",{className:"share",onClick:function(e){var s=e.target.closest(".buttons").querySelector(".share-list"),t=document.querySelectorAll(".share-list");s.classList.toggle("active"),t.forEach((function(e){s!==e&&e.classList.remove("active")}))},children:[(0,h.jsx)(c.HrR,{}),(0,h.jsx)("span",{className:"blind",children:"sns \uacf5\uc720"})]}),(0,h.jsx)(u,{prods:s,cvs:t})]})}},6165:function(e,s,t){t(2791);var n=t(6293),i=t(184);s.Z=function(e){var s=e.prods,t=e.cvs,c=e.isHome,r=e.uid,o=function(e){var s=e.target,t=s.parentElement.previousSibling;s.complete&&t.classList.add("false")};return c?(0,i.jsxs)("article",{className:"prod-box",children:[(0,i.jsx)("div",{className:"img-loader"}),(0,i.jsx)("div",{className:"img-box",children:(0,i.jsx)("img",{src:s.imgsrc,alt:s.title,onError:function(e){return e.target.src="images/error.webp"},onLoad:o})}),(0,i.jsxs)("div",{className:"info",children:[(0,i.jsx)("h3",{children:s.title}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:s.price}),"\uc6d0"]})]})]}):(0,i.jsxs)("article",{className:"prod-box",children:[(0,i.jsx)("div",{className:"img-loader"}),(0,i.jsx)("div",{className:"img-box",children:(0,i.jsx)("img",{src:s.imgsrc,alt:s.title,onError:function(e){return e.target.src="images/error.webp"},onLoad:o})}),(0,i.jsx)(n.Z,{prods:s,cvs:t,uid:r}),(0,i.jsxs)("div",{className:"info",children:[(0,i.jsx)("h3",{children:s.title}),(0,i.jsxs)("p",{children:[(0,i.jsx)("strong",{children:s.price}),"\uc6d0"]})]})]})}},5739:function(e,s,t){t.r(s),t.d(s,{default:function(){return d}});var n=t(1413),i=t(2791),c=t(5717),r=(t(3037),t(8688),t(6165)),o=t(184),a=function(){(0,i.useEffect)((function(){e(["/images/bg_1_s.webp","/images/bg_2_s.webp","/images/bg_3_s.webp"])}),[]);var e=function(e){e.forEach((function(e){(new Image).src="".concat("").concat(e)}))},s=function(e){var s=e.target,t=s.nextSibling;s.complete&&t.classList.add("false")};return(0,o.jsxs)(c.Z,(0,n.Z)((0,n.Z)({},{dots:!0,infinite:!0,autoplay:!0,autoplaySpeed:4e3,speed:1300,arrows:!1}),{},{children:[(0,o.jsxs)("div",{className:"slide-box one",children:[(0,o.jsxs)("div",{className:"img-box",children:[(0,o.jsx)("img",{src:"".concat("","/images/bg_1_s.webp"),alt:"CU \uc5f0\uc138\uc6b0\uc720 \ub9d0\ucc28\uc0dd\ud06c\ub9bc\ube75",onLoad:s}),(0,o.jsx)("div",{className:"img-loader"})]}),(0,o.jsxs)("div",{className:"text-box blind",children:[(0,o.jsx)("h1",{children:"\ubd80\ub4dc\ub7ec\uc6b4 \ub9d0\ucc28\ud06c\ub9bc\uc744 \uc9c4\ud55c \ucee4\uc2a4\ud0c0\ub4dc\uc640 \ud654\uc774\ud2b8 \ucd08\ucf5c\ub81b\uc73c\ub85c \uac10\uc2fc"}),(0,o.jsx)("h2",{children:"CU \uc5f0\uc138\uc6b0\uc720 \ub9d0\ucc28\uc0dd\ud06c\ub9bc\ube75"})]})]}),(0,o.jsxs)("div",{className:"slide-box two",children:[(0,o.jsxs)("div",{className:"img-box",children:[(0,o.jsx)("img",{src:"".concat("","/images/bg_2_s.webp"),alt:"7-Eleven \uc0b0\ub9ac\uc624 \uce90\ub9ad\ud130\uc988 \ud478\ub4dc \uc5d0\ub514\uc158",onLoad:s}),(0,o.jsx)("div",{className:"img-loader"})]}),(0,o.jsxs)("div",{className:"text-box blind",children:[(0,o.jsx)("h1",{children:"\uc0b0\ub9ac\uc624\uce90\ub9ad\ud130\uc988 \ud310\ubc15\uc774 \uc2a4\ud2f0\ucee4\uac00 \ub4e4\uc5b4\uc788\ub294"}),(0,o.jsx)("h2",{children:"7-Eleven \uc0b0\ub9ac\uc624 \uce90\ub9ad\ud130\uc988 \ud478\ub4dc \uc5d0\ub514\uc158"})]})]}),(0,o.jsxs)("div",{className:"slide-box three",children:[(0,o.jsxs)("div",{className:"img-box",children:[(0,o.jsx)("img",{src:"".concat("","/images/bg_3_s.webp"),alt:"GS25 \ud61c\uc790\ub85c\uc6b4\uc9d1\ubc25 \ub3c4\uc2dc\ub77d \uc2dc\ub9ac\uc988",onLoad:s}),(0,o.jsx)("div",{className:"img-loader"})]}),(0,o.jsxs)("div",{className:"text-box blind",children:[(0,o.jsx)("h1",{children:"\uc9d1\ubc25\ucc98\ub7fc \ub9db\uc788\uace0 \ud478\uc9d0\ud558\uac8c!"}),(0,o.jsx)("h2",{children:"GS25 \ud61c\uc790\ub85c\uc6b4\uc9d1\ubc25 \ub3c4\uc2dc\ub77d \uc2dc\ub9ac\uc988"})]})]})]}))},l=t(3504),d=function(e){var s=e.isLoading,t=e.prods,i={speed:500,slidesToShow:5,slidesToScroll:5,responsive:[{breakpoint:1199,settings:{slidesToShow:4,slidesToScroll:4}},{breakpoint:767,settings:{slidesToShow:3,slidesToScroll:3,arrows:!1,dots:!0}},{breakpoint:575,settings:{slidesToShow:2,slidesToScroll:2,arrows:!1,dots:!0}}]};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("section",{className:"hot-prods",children:(0,o.jsx)("div",{className:"inner",children:(0,o.jsx)(a,{})})}),(0,o.jsx)("section",{className:"new-prods",children:(0,o.jsxs)("div",{className:"inner",children:[s?null:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("header",{className:"title-wrap",children:[(0,o.jsx)("h1",{children:"\uc624\ub298\uc758 \uc2e0\uc0c1\ud488"}),(0,o.jsx)("p",{children:"\uac01 \ud3b8\uc758\uc810\ubcc4 \uc624\ub298\uc758 \uc2e0\uc0c1\ud488\ub4e4\uc744 \ub9cc\ub098\ubcf4\uc138\uc694!"})]}),(0,o.jsxs)("section",{className:"cvs-wrap",children:[(0,o.jsxs)("header",{className:"title",children:[(0,o.jsx)("h2",{children:"CU"}),(0,o.jsx)(l.rU,{to:"/cu",className:"more",children:"\uc0c1\ud488 \ub354\ubcf4\uae30"})]}),(0,o.jsx)(c.Z,(0,n.Z)((0,n.Z)({},i),{},{children:t.cu.slice(0,10).map((function(e,s){return(0,o.jsx)(r.Z,{prods:e,cvs:"cu",isHome:!0},s)}))}))]}),(0,o.jsxs)("section",{className:"cvs-wrap",children:[(0,o.jsxs)("header",{className:"title",children:[(0,o.jsx)("h2",{children:"7ELEVEN"}),(0,o.jsx)(l.rU,{to:"/se",className:"more",children:"\uc0c1\ud488 \ub354\ubcf4\uae30"})]}),(0,o.jsx)(c.Z,(0,n.Z)((0,n.Z)({},i),{},{children:void 0===t.se?null:t.se.slice(0,10).map((function(e,s){return(0,o.jsx)(r.Z,{prods:e,cvs:"se",isHome:!0},s)}))}))]}),(0,o.jsxs)("section",{className:"cvs-wrap",children:[(0,o.jsxs)("header",{className:"title",children:[(0,o.jsx)("h2",{children:"GS25"}),(0,o.jsx)(l.rU,{to:"/gs",className:"more",children:"\uc0c1\ud488 \ub354\ubcf4\uae30"})]}),(0,o.jsx)(c.Z,(0,n.Z)((0,n.Z)({},i),{},{children:t.gs.slice(0,10).map((function(e,s){return(0,o.jsx)(r.Z,{prods:e,cvs:"gs",isHome:!0},s)}))}))]})]}),(0,o.jsx)("div",{className:s?"loader":"loader hide",children:(0,o.jsx)("img",{src:"".concat("","/images/loading.gif"),alt:"loading"})})]})})]})}}}]);
//# sourceMappingURL=625.09571280.chunk.js.map