import{u as V,m as H,l as W,g as M,r as i,j as s}from"./index-550ee144.js";import{g as O}from"./getAdminImg-09967c00.js";import{B as m}from"./Button-f481225d.js";import{s as a}from"./OldImageAdmin.module-21041e04.js";import{D as U}from"./cjs-5bd555e6.js";import{l as w,u as J,s as X,g as Y,e as Z}from"./dataImg-24b28bd9.js";import{u as ee,a as d,q as r}from"./queryClient-9ad0277d.js";import{_ as g}from"./index-247e44a1.js";import{L as te}from"./ListFilter-e9cebc1f.js";import"./ListBox-c2585741.js";const de=()=>{const I={country:"",language:"",currency:"",banner_format:"",banner_theme:""},L=V(O),R=H(),{full_picture_id:z}=W(),{t:F}=ee(),t=L.find(e=>e.full_picture_id===Number(z)),y=V(M),[q,v]=i.useState(),f=i.useRef(null),[l,S]=i.useState({x:0,y:0}),[j,E]=i.useState("Тест текст"),[p,P]=i.useState("30"),[x,N]=i.useState("#000000"),[u,_]=i.useState([{id:1,selectedValues:I}]);i.useEffect(()=>{t&&(P(t.size),N(t.color_text),S({x:t.left,y:t.top}),_([{id:1,selectedValues:{country:t.country||"",language:t.language||"",currency:t.value||"",banner_format:t.format||"",banner_theme:t.topic||""}}]))},[t]);const B=d({mutationFn:e=>J(e.pictures),onSuccess:()=>{r.invalidateQueries({queryKey:["img"]})},onError:e=>{g.error(e.message)}},r),C=d({mutationFn:e=>X(e.token,e.full_picture_id),onSuccess:e=>{v(e)},onError:e=>{g.error(e.message)}},r),D=d({mutationFn:e=>Y(e.full_picture_id),onSuccess:e=>{r.invalidateQueries({queryKey:["img"]}),g.success(e.data)}},r),$=e=>{D.mutate({full_picture_id:e})},b=d({mutationFn:e=>Z(e.token,e.full_picture_id),onSuccess:e=>{R(-1),r.invalidateQueries({queryKey:["img"]}),g.success(e.Success)}},r),A=e=>{b.mutate({token:y,full_picture_id:e})},k=(e,n)=>{S({x:n.x,y:n.y})},G=(e,n,h)=>{_(u.map(o=>o.id===e?{...o,selectedValues:{...o.selectedValues,[n]:h}}:o))},K=()=>{const e=f.current;if(e){const n=e.offsetWidth,h=e.offsetHeight,o=u.map(c=>({full_picture_id:t.full_picture_id,country:c.selectedValues.country,language:c.selectedValues.language,value:c.selectedValues.currency,format:c.selectedValues.banner_format,topic:c.selectedValues.banner_theme,color:x,left:l.x.toString(),right:(l.x+n).toString(),top:l.y.toString(),bottom:(l.y+h).toString(),size:p,start_frame:0,end_frame:0}));B.mutate({pictures:o})}},Q=e=>{v(null),C.mutate({token:y,full_picture_id:e})},T=e=>_(u.filter(n=>n.id!==e));return s.jsxs("div",{className:a.redactorBox,children:[s.jsxs("div",{className:a.draggableImgBox,children:[s.jsx(U,{nodeRef:f,bounds:"parent",position:l,onDrag:k,children:s.jsx("div",{ref:f,className:a.draggableBox,style:{fontSize:`${p}px`,color:x},children:j})}),t.url&&s.jsx("img",{className:a.redactorImg,src:t.url,alt:"img"})]}),s.jsxs("div",{className:a.controls,children:[s.jsx("input",{className:`${a.text} ${a.inputAdmin}`,type:"text",value:j,onChange:e=>E(e.target.value),placeholder:"Введите текст"}),s.jsx("input",{className:`${a.size} ${a.inputAdmin}`,type:"number",value:p,onChange:e=>P(e.target.value),placeholder:"Размер шрифта"}),s.jsx("input",{className:a.color,type:"color",value:x,onChange:e=>N(e.target.value)})]}),u.map((e,n)=>s.jsx(te,{index:n,block:e,listBoxItems:w,handleListBoxChange:G,removeBlock:T,t:F},e.id)),s.jsxs("div",{className:a.btnBox,children:[s.jsx(m,{isLoading:B.isPending,className:a.adminRedactorButton,onClick:K,children:"Изменить"}),s.jsx(m,{isLoading:D.isPending,className:a.adminRedactorButton,onClick:()=>$(t.full_picture_id),children:"Опубликовать"}),s.jsx(m,{isLoading:C.isPending,className:a.adminRedactorButton,onClick:()=>Q(t.full_picture_id),children:"Demo"}),s.jsx(m,{isLoading:b.isPending,className:a.btnDelete,onClick:()=>A(t.full_picture_id),children:"Удалить"})]}),s.jsx("img",{src:q,alt:""})]})};export{de as default};
