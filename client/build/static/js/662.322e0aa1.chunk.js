"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[662],{6293:function(e,t,n){n.d(t,{Z:function(){return v}});var s=n(885),c=n(2791),i=n(8014),a=n(8820),r=n(3108),l=n(408),o=n(6355),d=n(7425),u=n(7692),h=n(4270),p=n(184),m=function(){return(0,p.jsxs)(h.q,{children:[(0,p.jsx)("meta",{property:"og:type",content:"website"}),(0,p.jsx)("meta",{property:"og:title",content:"CVSNEW"}),(0,p.jsx)("meta",{property:"og:url",content:"https://cvsnew-sloth-hub.koyeb.app/"}),(0,p.jsx)("meta",{property:"og:description",content:""}),(0,p.jsx)("meta",{property:"og:image",content:""})]})},x=function(e){var t=e.prods,n=e.cvs;function s(){var e=document.querySelector("meta[property='og\\:description']"),s=document.querySelector("meta[property='og\\:image']"),c=t.title;t.type?"\uc99d\uc815"===t.type?e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \ud589\uc0ac \uc54c\ub9ac\ubbf8 \ud83d\udce2 \uc9c0\uae08 ".concat(n,"\uc5d0\uc11c\ub294 ").concat(c,"\uc774(\uac00) ").concat(t.price,"\uc6d0!")):"\ud560\uc778"===t.type?(c=c.indexOf(")")>0?c.split(")")[1]:c,e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \ud589\uc0ac \uc54c\ub9ac\ubbf8 \ud83d\udce2 \uc9c0\uae08 ".concat(n,"\uc5d0\uc11c\ub294 ").concat(c,"\uc774(\uac00) ").concat(t.price.discount,"\uc6d0!"))):(c=c.indexOf(")")>0?c.split(")")[1]:c,e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \ud589\uc0ac \uc54c\ub9ac\ubbf8 \ud83d\udce2 \uc9c0\uae08 ".concat(n,"\uc5d0\uc11c\ub294 ").concat(c,"\uc774(\uac00) ").concat(t.type,"!"))):(c=c.indexOf(")")>0?c.split(")")[1]:c,e.setAttribute("content","\ud83d\udce2 \ud3b8\uc758\uc810 \uc2e0\uc0c1 \uc54c\ub9ac\ubbf8 \ud83d\udce2 ".concat(n,"\uc5d0\uc11c \uc0c8\ub85c \ub098\uc628 ").concat(c," \uba39\uc5b4\ubcf4\uc790!"))),s.setAttribute("content",t.imgsrc)}return(0,p.jsxs)("div",{className:"share-list",children:[(0,p.jsxs)("button",{className:"facebook",onClick:function(){s(),window.open("https://www.facebook.com/sharer.php?u=".concat(encodeURIComponent(window.location.href)))},children:[(0,p.jsx)(o.R9i,{}),(0,p.jsx)("span",{className:"blind",children:"\ud398\uc774\uc2a4\ubd81"})]}),(0,p.jsxs)("button",{className:"twitter",onClick:function(){s();var e=document.querySelector("meta[property='og\\:description']").getAttribute("content");window.open("https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(e),"&url=").concat(encodeURIComponent(window.location.href)))},children:[(0,p.jsx)(o.N1v,{}),(0,p.jsx)("span",{className:"blind",children:"\ud2b8\uc704\ud130"})]}),(0,p.jsxs)("button",{className:"kakaotalk",onClick:function(){var e=window.Kakao;e.isInitialized()&&e.Share.sendCustom({templateId:t.type&&"\uc99d\uc815"!==t.type?93351:93216,templateArgs:{name:t.title,price:t.price.discount?t.price.discount:t.price,image:t.imgsrc,cvs:t.type&&"\uc99d\uc815"!==t.type?n:"7-eleven\uc73c",type:t.type,header:"\uc99d\uc815"===t.type?"\ud589\uc0ac":"\uc2e0\uc0c1"}})},children:[(0,p.jsx)(d.X78,{}),(0,p.jsx)("span",{className:"blind",children:"\uce74\uce74\uc624\ud1a1"})]}),(0,p.jsxs)("button",{onClick:function(e){var t=e.target,n=document.createElement("div");n.innerText="\ubcf5\uc0ac\uc644\ub8cc",n.className="popup";var s=t.closest(".share-list");s.querySelector(".popup")||(s.appendChild(n),navigator.clipboard.writeText(document.location.href),setTimeout((function(){return s.removeChild(n)}),1e3))},children:[(0,p.jsx)(u.BNl,{}),(0,p.jsx)("span",{className:"blind",children:"\ub9c1\ud06c\ubcf5\uc0ac"})]}),(0,p.jsx)(m,{})]})},f=n(1830),j=n.n(f),v=function(e){var t=e.prods,n=e.cvs,o=e.uid,d=(0,c.useState)(0),u=(0,s.Z)(d,2),h=u[0],m=u[1],f=(0,c.useState)([]),v=(0,s.Z)(f,2),b=v[0],g=v[1],N=(0,c.useState)(!1),y=(0,s.Z)(N,2),w=y[0],C=y[1],k=(0,l.iH)(r.F);return(0,c.useEffect)((function(){(0,l.U2)((0,l.iU)(k,"likes")).then((function(e){var n=Object.values(e.val());g(n);var s=0;n.forEach((function(e){e.name===t.title&&m(s+=1)}))})).catch((function(e){return console.log(e)}))}),[]),(0,p.jsxs)("div",{className:"buttons",children:[(0,p.jsxs)("button",{className:"like",onClick:function(){b.find((function(e){return e.name===t.title&&e.uid===o}))||w?j().fire({title:"\uc88b\uc544\uc694\ub294 \ud55c\ubc88\ub9cc \uac00\ub2a5\ud569\ub2c8\ub2e4.",icon:"warning",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#4BCFE5"}):(m(h+1),C(!0),(0,l.VF)((0,l.iU)(k,"likes"),{uid:o,name:t.title}))},children:[(0,p.jsx)(a.M_L,{}),(0,p.jsx)("span",{className:"blind",children:"\uc88b\uc544\uc694"})]}),(0,p.jsx)("span",{className:"count",children:h}),(0,p.jsxs)("button",{className:"share",onClick:function(e){var t=e.target.closest(".buttons").querySelector(".share-list"),n=document.querySelectorAll(".share-list");t.classList.toggle("active"),n.forEach((function(e){t!==e&&e.classList.remove("active")}))},children:[(0,p.jsx)(i.HrR,{}),(0,p.jsx)("span",{className:"blind",children:"sns \uacf5\uc720"})]}),(0,p.jsx)(x,{prods:t,cvs:n})]})}},3662:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var s=n(4165),c=n(5861),i=n(885),a=n(2791),r=n(3108),l=n(408),o=n(6293),d=n(184),u=function(e){var t=e.prods,n=e.isHome,s=e.uid;return(0,d.jsxs)("li",{className:"prod-box",children:[(0,d.jsx)("div",{className:"img-loader"}),(0,d.jsx)("div",{className:"img-box",children:(0,d.jsx)("img",{src:-1===t.imgsrc.indexOf("http")?"images/error.webp":t.imgsrc,alt:t.title,onLoad:function(e){var t=e.target,n=t.parentElement.previousSibling;t.complete&&n.classList.add("false")}})}),(0,d.jsxs)("div",{className:"ico",children:[(0,d.jsx)("i",{className:"evt-type",children:t.type}),(0,d.jsx)("i",{className:"evt-store ".concat("7-eleven"===t.store?"se":t.store),children:"emart24"===t.store?"\uc774\ub9c8\ud2b824":t.store})]}),n?null:(0,d.jsx)(o.Z,{prods:t,cvs:t.store,uid:s}),(0,d.jsxs)("div",{className:"info",children:[(0,d.jsx)("h3",{children:t.title}),t.price.discount?(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:t.price.discount}),"\uc6d0",(0,d.jsx)("del",{className:"discount",children:t.price.cost})]}):(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:t.price}),"\uc6d0"]})]})]})},h=n(6355),p=n(1830),m=n.n(p),x=function(e){var t=e.uid,n=(0,a.useState)(null),o=(0,i.Z)(n,2),p=o[0],x=o[1],f=(0,a.useState)(null),j=(0,i.Z)(f,2),v=j[0],b=j[1],g=(0,a.useState)(!0),N=(0,i.Z)(g,2),y=N[0],w=N[1],C=(0,a.useState)("\uc804\uccb4"),k=(0,i.Z)(C,2),S=k[0],Z=k[1],E=(0,a.useState)("\uc804\uccb4"),A=(0,i.Z)(E,2),q=A[0],L=A[1],I=(0,a.useState)(0),T=(0,i.Z)(I,2),U=T[0],B=T[1],F=(0,a.useState)(20),O=(0,i.Z)(F,2),H=O[0],R=O[1],D=(0,a.useState)(1),K=(0,i.Z)(D,2),M=K[0],V=K[1],z=(0,a.useState)(""),W=(0,i.Z)(z,2),X=W[0],$=W[1];function _(){return(_=(0,c.Z)((0,s.Z)().mark((function e(){var t,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,l.IO)((0,l.iH)(r.F,"events")),e.next=3,(0,l.U2)(t).then((function(e){return e.val()}));case 3:n=e.sent,b(n),w(!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function G(e,t){0!==e.length?(x(e),w(!1)):(x(null),t&&$(""),w(!1))}function J(e){if(e.preventDefault(),V(1),B(0),R(20),e.target.closest(".main-tab")){var t="\uc774\ub9c8\ud2b824"===e.target.closest(".tab").textContent?"emart24":e.target.closest(".tab").textContent;Z(t),document.querySelectorAll(".main-tab .tab").forEach((function(e){e.classList.remove("active")})),e.target.closest(".tab").classList.add("active")}else{L(e.target.closest(".tab").textContent),document.querySelectorAll(".sub-tab .tab").forEach((function(e){e.classList.remove("active")})),e.target.closest(".tab").classList.add("active")}document.querySelectorAll(".share-list").forEach((function(e){e.classList.remove("active")}))}function P(){if(0!==X.length&&""!==X.replace(/^\s+|\s+$/g,"")){var e=v.filter((function(e){return"\uc804\uccb4"===S&&"\uc804\uccb4"===q?e.title.match(X):"\uc804\uccb4"===q?e.store.match(S)&&e.title.match(X):"\uc804\uccb4"===S?e.type===q&&e.title.match(X):e.type===q&&e.store.match(S)&&e.title.match(X)}));B(0),R(20),V(1),G(e,!0)}else m().fire({title:"\uac80\uc0c9\uc5b4\ub97c \uc785\ub825\ud558\uc138\uc694.",icon:"warning",confirmButtonText:"\ud655\uc778",confirmButtonColor:"#4BCFE5"})}return(0,a.useEffect)((function(){window.scrollTo(0,0),function(){_.apply(this,arguments)}()}),[]),(0,a.useEffect)((function(){!function(){if("\uc804\uccb4"===S&&"\uc804\uccb4"===q)x(v);else if(S&&"\uc804\uccb4"===q){G(v.filter((function(e){return e.store.match(S)})),!1)}else if(q&&"\uc804\uccb4"===S){G(v.filter((function(e){return e.type===q})),!1)}else{G(v.filter((function(e){return e.type===q&&e.store.match(S)})),!1)}}()}),[S,q,y]),(0,d.jsx)("section",{className:"events-wrap",children:(0,d.jsxs)("div",{className:"inner",children:[(0,d.jsxs)("h1",{children:[(new Date).getMonth()+1,"\uc6d4 \ud589\uc0ac\uc0c1\ud488"]}),(0,d.jsxs)("div",{className:"tab-wrap",children:[(0,d.jsxs)("ul",{className:"main-tab",children:[(0,d.jsx)("li",{className:"tab active",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"\uc804\uccb4"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"cu"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"7-eleven"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"gs25"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"\uc774\ub9c8\ud2b824"})})]}),(0,d.jsxs)("ul",{className:"sub-tab",children:[(0,d.jsx)("li",{className:"tab active",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"\uc804\uccb4"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"1+1"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"2+1"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"3+1"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"\uc99d\uc815"})}),(0,d.jsx)("li",{className:"tab",href:"#",onClick:J,children:(0,d.jsx)("a",{children:"\ud560\uc778"})})]})]}),(0,d.jsxs)("div",{className:"search-wrap",children:[(0,d.jsx)("input",{type:"text",value:X,onChange:function(e){return $(e.target.value)},onKeyDown:function(e){"Enter"===e.code&&P()}}),(0,d.jsx)("button",{className:"btn",onClick:P,children:"\uac80\uc0c9"})]}),(0,d.jsx)("div",{className:"prods-wrap",children:y?(0,d.jsx)("div",{className:y?"loader":"loader hide",children:(0,d.jsx)("img",{src:"./images/loading.gif",alt:"loading"})}):null!==p?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"prods",children:p.slice(U,H).map((function(e,n){return(0,d.jsx)(u,{prods:e,isHome:!1,uid:t},n)}))}),(0,d.jsxs)("div",{className:"page-area",children:[(0,d.jsx)("button",{className:"btn prev",onClick:function(){M>1&&(V(M-1),window.scrollTo(0,0)),U>0&&(B(U-20),R(H-20))},children:(0,d.jsx)(h.bUI,{})}),(0,d.jsxs)("div",{className:"page-wrap",children:[(0,d.jsx)("span",{className:"page",children:M}),(0,d.jsx)("span",{children:"/"}),(0,d.jsx)("span",{className:"total",children:p.length%20===0?p.length/20:parseInt(p.length/20)+1})]}),(0,d.jsx)("button",{className:"btn next",onClick:function(){var e=p.length%20===0?p.length/20:parseInt(p.length/20)+1;M<e&&(V(M+1),window.scrollTo(0,0)),p.length>H&&(B(H),R(H+20))},children:(0,d.jsx)(h.Dli,{})})]})]}):(0,d.jsx)("div",{className:"null",children:"\uc0c1\ud488\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."})})]})})}}}]);
//# sourceMappingURL=662.322e0aa1.chunk.js.map