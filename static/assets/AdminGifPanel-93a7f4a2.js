import{r,j as s,L as _,a as B,u as f,g as P,i as A,l as j,d as N,O as G}from"./index-cbfc2fe3.js";import{L as S}from"./LoadImgServ-2db07234.js";import{b as C,l as E,c as F}from"./dataImg-2f17d174.js";import{u as R}from"./useQuery-a552b845.js";import{u as U,a as q,q as y}from"./queryClient-4e838911.js";import{g as $}from"./getAdminGif-8fba910d.js";import{L as w}from"./ListFilter-f8da8797.js";import{B as h}from"./Button-9ab4d410.js";import"./Modal.module-7cebd6cd.js";import"./ListBox-42914518.js";const O="_adminPanelBlock_orxl9_1",D="_adminPanelBlockRight_orxl9_8",T="_adminPanelBlockUpper_orxl9_14",m={adminPanelBlock:O,adminPanelBlockRight:D,adminPanelBlockUpper:T},K="_staticImgBlock_17rmn_1",M="_pictureIdList_17rmn_6",Q="_link_17rmn_11",u={staticImgBlock:K,pictureIdList:M,link:Q};function z({images:n}){const[i,l]=r.useState([]),[a,c]=r.useState([]);return r.useEffect(()=>{n&&(l(n.filter(t=>t.picture_id)),c(n.filter(t=>t.full_picture_id)))},[n]),s.jsxs("div",{className:u.staticImgBlock,children:[s.jsxs("div",{children:[s.jsx("h2",{children:"Новые элементы"}),s.jsx("div",{className:u.pictureIdList,children:i.map(t=>s.jsx("div",{children:s.jsx(_,{className:u.link,to:`new/${t.picture_id}`,children:t.picture_id})},t.picture_id))})]}),s.jsxs("div",{children:[s.jsx("h2",{children:"Старые элементы"}),a.map(t=>s.jsx("div",{children:s.jsxs(_,{className:u.link,to:`old/${t.full_picture_id}`,children:[t.full_picture_id," ",t.name]})},t.full_picture_id))]})]})}const H="_filterBtns_v0c02_1",x={filterBtns:H};function J(){const n={country:"",language:"",currency:"",banner_format:"",banner_theme:""},i=B(),l=f(P),{t:a}=U(),c=A(),[t,g]=r.useState([{id:1,selectedValues:n}]),v=(e,o,L)=>{g(t.map(d=>d.id===e?{...d,selectedValues:{...d.selectedValues,[o]:L}}:d))},p=q({mutationFn:e=>C(e.token,e.country,e.language,e.value,e.format,e.topic),onSuccess:e=>{i(j.adminGifAdd(e))}},y),k=()=>{c("/admin-meneger-gif"),t.forEach(e=>{p.mutate({token:l,country:e.selectedValues.country===a("Country")?"":e.selectedValues.country,language:e.selectedValues.language===a("Language")?"":e.selectedValues.language,value:e.selectedValues.currency===a("Currency")?"":e.selectedValues.currency,format:e.selectedValues.banner_format===a("Banner_format")?"":e.selectedValues.banner_format,topic:e.selectedValues.banner_theme===a("Banner_theme")?"":e.selectedValues.banner_theme})})},I=()=>{c("/admin-meneger-gif"),p.mutate({token:l,country:"",language:"",value:"",format:"",topic:""})},V=e=>g(t.filter(o=>o.id!==e));return s.jsxs("div",{children:[t.map((e,o)=>s.jsx(w,{index:o,block:e,listBoxItems:E,handleListBoxChange:v,removeBlock:V,t:a},e.id)),s.jsx(h,{className:x.filterBtns,onClick:k,children:"Фильтровать"}),s.jsx(h,{className:x.filterBtns,onClick:I,children:"Очистить фильтр"})]})}function ie(){const n=f(N),i=f($),l=B(),[a,c]=r.useState();r.useEffect(()=>{Array.isArray(i)&&i&&c(i)},[i]);const t=R({queryKey:["adminGif"],queryFn:()=>F(),enabled:!!(n!=null&&n.is_admin),retry:1},y);return r.useEffect(()=>{t.data&&l(j.adminGifAdd(t.data))},[t.data]),s.jsx(s.Fragment,{children:s.jsxs("div",{className:m.adminPanelBlock,children:[s.jsx(S,{}),s.jsxs("div",{className:m.adminPanelBlockRight,children:[s.jsxs("div",{className:m.adminPanelBlockUpper,children:[s.jsx(J,{}),s.jsx(z,{images:a})]}),s.jsx(G,{})]})]})})}export{ie as default};
