import{u as I,b as H,m as W,g as M,r as n,j as s}from"./index-27cacaf7.js";import{g as O}from"./getAdminImg-09967c00.js";import{B as d}from"./Button-84c75981.js";import{s as a}from"./OldImageAdmin.module-21041e04.js";import{D as U}from"./cjs-521985a1.js";import{l as w,u as J,s as X,g as Y,e as Z}from"./dataImg-893cbd10.js";import{u as ee,a as m,q as r}from"./queryClient-5637703c.js";import{_ as g}from"./index-5cabf26d.js";import{L as te}from"./ListFilter-aab71a08.js";import"./ListBox-3d27fbe8.js";const me=()=>{const L={country:"",language:"",currency:"",banner_format:"",banner_theme:""},R=I(O),z=H(),{full_picture_id:F}=W(),{t:q}=ee(),t=R.find(e=>e.full_picture_id===Number(F)),y=I(M),[v,j]=n.useState(),f=n.useRef(null),[l,S]=n.useState({x:0,y:0}),[P,E]=n.useState("Тест текст"),[p,N]=n.useState("30"),[x,B]=n.useState("#000000"),[u,_]=n.useState([{id:1,selectedValues:L}]);n.useEffect(()=>{t&&(N(t.size),B(t.color_text),S({x:t.left,y:t.top}),_([{id:1,selectedValues:{country:t.country||"",language:t.language||"",currency:t.value||"",banner_format:t.format||"",banner_theme:t.topic||""}}]))},[t]);const b=m({mutationFn:e=>J(e.pictures),onSuccess:()=>{r.invalidateQueries({queryKey:["img"]})},onError:e=>{g.error(e.message)}},r),C=m({mutationFn:e=>X(e.token,e.full_picture_id),onSuccess:e=>{j(e)},onError:e=>{g.error(e.message)}},r),D=m({mutationFn:e=>Y(e.full_picture_id),onSuccess:e=>{r.invalidateQueries({queryKey:["img"]}),g.success(e.data)}},r),$=e=>{D.mutate({full_picture_id:e})},V=m({mutationFn:e=>Z(e.token,e.full_picture_id),onSuccess:e=>{z(-1),r.invalidateQueries({queryKey:["img"]}),g.success(e.Success)}},r),A=e=>{V.mutate({token:y,full_picture_id:e})},k=(e,i)=>{S({x:i.x,y:i.y})},G=(e,i,h)=>{_(u.map(o=>o.id===e?{...o,selectedValues:{...o.selectedValues,[i]:h}}:o))},K=()=>{const e=f.current;if(e){const i=e.offsetWidth,h=e.offsetHeight,o=u.map(c=>({full_picture_id:t.full_picture_id,country:c.selectedValues.country,language:c.selectedValues.language,value:c.selectedValues.currency,format:c.selectedValues.banner_format,topic:c.selectedValues.banner_theme,color:x,left:l.x.toString(),right:(l.x+i).toString(),top:l.y.toString(),bottom:(l.y+h).toString(),size:p,start_frame:0,end_frame:0}));b.mutate({pictures:o})}},Q=e=>{j(null),C.mutate({token:y,full_picture_id:e})},T=e=>_(u.filter(i=>i.id!==e));return s.jsxs("div",{className:a.redactorBox,children:[s.jsxs("div",{className:a.draggableImgBox,children:[s.jsx(U,{nodeRef:f,bounds:"parent",position:l,onDrag:k,children:s.jsx("div",{ref:f,className:a.draggableBox,style:{fontSize:`${p}px`,color:x},children:P})}),t.url&&s.jsx("img",{className:a.redactorImg,src:t.url,alt:"img"})]}),s.jsxs("div",{className:a.controls,children:[s.jsx("input",{className:`${a.text} ${a.inputAdmin}`,type:"text",value:P,onChange:e=>E(e.target.value),placeholder:"Введите текст"}),s.jsx("input",{className:`${a.size} ${a.inputAdmin}`,type:"number",value:p,onChange:e=>N(e.target.value),placeholder:"Размер шрифта"}),s.jsx("input",{className:a.color,type:"color",value:x,onChange:e=>B(e.target.value)})]}),u.map((e,i)=>s.jsx(te,{index:i,block:e,listBoxItems:w,handleListBoxChange:G,removeBlock:T,t:q},e.id)),t.is_publish?s.jsx("div",{children:"Опубликовано"}):s.jsx("div",{children:"Не опубликовано"}),s.jsxs("div",{className:a.btnBox,children:[s.jsx(d,{isLoading:b.isPending,className:a.adminRedactorButton,onClick:K,children:"Изменить"}),s.jsx(d,{isLoading:C.isPending,className:a.adminRedactorButton,onClick:()=>Q(t.full_picture_id),children:"Demo"}),s.jsx(d,{isLoading:D.isPending,className:a.adminRedactorButton,onClick:()=>$(t.full_picture_id),children:"Опубликовать"}),s.jsx(d,{isLoading:V.isPending,className:a.btnDelete,onClick:()=>A(t.full_picture_id),children:"Удалить"})]}),v&&s.jsx("img",{src:v,alt:""})]})};export{me as default};
