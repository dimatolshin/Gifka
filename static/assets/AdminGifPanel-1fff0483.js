import{r,j as s,L as _,a as x,u as f,g as L,k as B,d as P,O as A}from"./index-550ee144.js";import{L as G}from"./LoadImgServ-9bb64a5f.js";import{b as N,l as S,c as C}from"./dataImg-24b28bd9.js";import{u as E}from"./useQuery-c24d6ff9.js";import{u as F,a as R,q as j}from"./queryClient-9ad0277d.js";import{g as U}from"./getAdminGif-8fba910d.js";import{L as q}from"./ListFilter-e9cebc1f.js";import{B as g}from"./Button-f481225d.js";import"./Modal.module-7cebd6cd.js";import"./ListBox-c2585741.js";const $="_adminPanelBlock_orxl9_1",w="_adminPanelBlockRight_orxl9_8",O="_adminPanelBlockUpper_orxl9_14",m={adminPanelBlock:$,adminPanelBlockRight:w,adminPanelBlockUpper:O},D="_staticImgBlock_17rmn_1",T="_pictureIdList_17rmn_6",K="_link_17rmn_11",u={staticImgBlock:D,pictureIdList:T,link:K};function M({images:n}){const[i,c]=r.useState([]),[a,l]=r.useState([]);return r.useEffect(()=>{n&&(c(n.filter(t=>t.picture_id)),l(n.filter(t=>t.full_picture_id)))},[n]),s.jsxs("div",{className:u.staticImgBlock,children:[s.jsxs("div",{children:[s.jsx("h2",{children:"Новые элементы"}),s.jsx("div",{className:u.pictureIdList,children:i.map(t=>s.jsx("div",{children:s.jsx(_,{className:u.link,to:`new/${t.picture_id}`,children:t.picture_id})},t.picture_id))})]}),s.jsxs("div",{children:[s.jsx("h2",{children:"Старые элементы"}),a.map(t=>s.jsx("div",{children:s.jsxs(_,{className:u.link,to:`old/${t.full_picture_id}`,children:[t.full_picture_id," ",t.name]})},t.full_picture_id))]})]})}const Q="_filterBtns_v0c02_1",h={filterBtns:Q};function z(){const n={country:"",language:"",currency:"",banner_format:"",banner_theme:""},i=x(),c=f(L),{t:a}=F(),[l,t]=r.useState([{id:1,selectedValues:n}]),y=(e,o,V)=>{t(l.map(d=>d.id===e?{...d,selectedValues:{...d.selectedValues,[o]:V}}:d))},p=R({mutationFn:e=>N(e.token,e.country,e.language,e.value,e.format,e.topic),onSuccess:e=>{i(B.adminGifAdd(e))}},j),k=()=>{l.forEach(e=>{p.mutate({token:c,country:e.selectedValues.country===a("Country")?"":e.selectedValues.country,language:e.selectedValues.language===a("Language")?"":e.selectedValues.language,value:e.selectedValues.currency===a("Currency")?"":e.selectedValues.currency,format:e.selectedValues.banner_format===a("Banner_format")?"":e.selectedValues.banner_format,topic:e.selectedValues.banner_theme===a("Banner_theme")?"":e.selectedValues.banner_theme})})},I=()=>{p.mutate({token:c,country:"",language:"",value:"",format:"",topic:""})},v=e=>t(l.filter(o=>o.id!==e));return s.jsxs("div",{children:[l.map((e,o)=>s.jsx(q,{index:o,block:e,listBoxItems:S,handleListBoxChange:y,removeBlock:v,t:a},e.id)),s.jsx(g,{className:h.filterBtns,onClick:k,children:"Фильтровать"}),s.jsx(g,{className:h.filterBtns,onClick:I,children:"Очистить фильтр"})]})}function ne(){const n=f(P),i=f(U),c=x(),[a,l]=r.useState();r.useEffect(()=>{Array.isArray(i)&&i&&l(i)},[i]);const t=E({queryKey:["adminGif"],queryFn:()=>C(),enabled:!!(n!=null&&n.is_admin),retry:1},j);return r.useEffect(()=>{t.data&&c(B.adminGifAdd(t.data))},[t.data]),s.jsx(s.Fragment,{children:s.jsxs("div",{className:m.adminPanelBlock,children:[s.jsx(G,{}),s.jsxs("div",{className:m.adminPanelBlockRight,children:[s.jsxs("div",{className:m.adminPanelBlockUpper,children:[s.jsx(z,{}),s.jsx(M,{images:a})]}),s.jsx(A,{})]})]})})}export{ne as default};
