import{a as g,u as l,g as y,r as x,h as b,j as t}from"./index-5e81b91c.js";import{s as c,l as j,S as V,A as B,C as G}from"./StatickGif-cebc4e17.js";import{g as _}from"./ScrollSpy.module-79cd629c.js";import{B as C}from"./Button-1ab70214.js";import"./Modal.module-7cebd6cd.js";import{u as w,a as A,q as S}from"./queryClient-4e3f4a74.js";import{_ as M}from"./index-cd3c7b2d.js";import{L as U}from"./ListFilter-770b5bdd.js";import"./ListBox-a88bdaf2.js";const v=()=>{const s={country:"",language:"",currency:"",banner_format:"",banner_theme:""},{t:n}=w(),d=g(),u=l(y),[r,f]=x.useState([{id:1,selectedValues:s}]),p=(e,o,h)=>{f(r.map(i=>i.id===e?{...i,selectedValues:{...i.selectedValues,[o]:h}}:i))},a=A({mutationFn:e=>_(e.token,e.country,e.language,e.value,e.format,e.topic),onSuccess:e=>{d(b.gifGenAdd(e))},onError:e=>{M.error(e.message)}},S),m=()=>{r.forEach(e=>{a.mutate({token:u,country:e.selectedValues.country===n("Country")?"":e.selectedValues.country,language:e.selectedValues.language===n("Language")?"":e.selectedValues.language,value:e.selectedValues.currency===n("Currency")?"":e.selectedValues.currency,format:e.selectedValues.banner_format===n("Banner_format")?"":e.selectedValues.banner_format,topic:e.selectedValues.banner_theme===n("Banner_theme")?"":e.selectedValues.banner_theme})})};return t.jsxs("div",{className:`${c.topbarStatic}`,children:[t.jsx("div",{children:r.map((e,o)=>t.jsx(U,{index:o,block:e,listBoxItems:j,handleListBoxChange:p,removeBlock:()=>{},t:n},e.id))}),t.jsx("div",{children:t.jsx(C,{isLoading:a.isPending,onClick:m,className:c.topBtn,children:n("Generare Now")})})]})},L=[{id:"1",title:"How is pricing determined for each plan ?",text:"Metronic embraces flexible licensing options that empower you tochoose the perfect fit for your project's needs and budget.Understanding the factors influencing each plan's pricing helps you make an informed decision."},{id:"2",title:"What payment methods are accepted for subscriptions ?",text:"Metronic embraces flexible licensing options that empower you tochoose the perfect fit for your project's needs and budget.Understanding the factors influencing each plan's pricing helps you make an informed decision."},{id:"3",title:"Are there any hidden fees in the pricing ?",text:"Metronic embraces flexible licensing options that empower you tochoose the perfect fit for your project's needs and budget.Understanding the factors influencing each plan's pricing helps you make an informed decision."},{id:"4",title:"Is there a discount for annual subscriptions?",text:"Metronic embraces flexible licensing options that empower you tochoose the perfect fit for your project's needs and budget.Understanding the factors influencing each plan's pricing helps you make an informed decision."},{id:"5",title:"Do you offer refunds on subscription cancellations?",text:"Metronic embraces flexible licensing options that empower you tochoose the perfect fit for your project's needs and budget.Understanding the factors influencing each plan's pricing helps you make an informed decision."},{id:"6",title:"Can I add extra features to my current plan?",text:"Metronic embraces flexible licensing options that empower you tochoose the perfect fit for your project's needs and budget.Understanding the factors influencing each plan's pricing helps you make an informed decision."}],E=s=>s.gifGen.urlGif,R=()=>{const s=l(E);return t.jsxs(t.Fragment,{children:[t.jsx(v,{}),t.jsx(V,{url:s}),t.jsx(B,{arrAccord:L}),t.jsx(G,{})]})};export{R as default};
