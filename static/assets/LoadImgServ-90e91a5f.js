import{r as m,j as s}from"./index-5e81b91c.js";import{a as U,q as p}from"./queryClient-4e3f4a74.js";import{d as k}from"./dataImg-ad0e902f.js";import{B as g}from"./Button-1ab70214.js";import"./Modal.module-7cebd6cd.js";var n=[];for(var h=0;h<256;++h)n.push((h+256).toString(16).slice(1));function I(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}var r,L=new Uint8Array(16);function N(){if(!r&&(r=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!r))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(L)}var D=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const _={randomUUID:D};function S(e,t,d){if(_.randomUUID&&!t&&!e)return _.randomUUID();e=e||{};var a=e.random||(e.rng||N)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,t){d=d||0;for(var i=0;i<16;++i)t[d+i]=a[i];return t}return I(a)}const b="_fileBlock_16uh2_1",f="_inputBlock_16uh2_8",C="_hiddenInput_16uh2_14",R="_customLabel_16uh2_18",w="_loadButton_16uh2_30",q="_deleteButton_16uh2_37",E="_selectedFile_16uh2_43",V="_selectedFilesList_16uh2_47",c={fileBlock:b,inputBlock:f,hiddenInput:C,customLabel:R,loadButton:w,deleteButton:q,selectedFile:E,selectedFilesList:V};function M(){const e=m.useRef(null),[t,d]=m.useState([]),[a,i]=m.useState(null),y=l=>{const o=Array.from(l.target.files).map(u=>({id:S(),file:u}));d(u=>[...u,...o]),i(o[o.length-1].file.name)},x=U({mutationFn:l=>k(l.formData),onSuccess:()=>{i(null),d([]),p.invalidateQueries({queryKey:["img"]}),p.invalidateQueries({queryKey:["adminGif"]})}},p),B=async()=>{if(t.length===0){alert("Файл не добавлен");return}const l=new FormData;t.forEach(({file:o})=>{l.append("photos",o)}),x.mutate({formData:l})},v=l=>{d(o=>{const u=o.filter(j=>j.id!==l);return u.length>0?i(u[u.length-1].file.name):i(null),u})},F=()=>{e.current.click()};return s.jsxs("div",{className:c.fileBlock,children:[s.jsxs("div",{className:c.inputBlock,children:[s.jsx("input",{type:"file",multiple:!0,onChange:y,className:c.hiddenInput,ref:e,accept:"image/*,.png,.jpg,.gif,.web,.jpeg,.svg"}),s.jsx("button",{onClick:F,className:c.customLabel,children:"Выбрать файлы"}),s.jsx(g,{className:c.loadButton,onClick:B,children:"Загрузить"})]}),a&&s.jsxs("span",{className:c.fileName,children:["Последний загруженный файл: ",a]}),s.jsx("ul",{className:c.selectedFilesList,children:t.map(({id:l,file:o})=>s.jsxs("li",{children:[s.jsxs("p",{className:c.selectedFile,children:["Название файла: ",o.name]}),s.jsx(g,{className:c.deleteButton,onClick:()=>v(l),children:"Удалить"})]},l))})]})}export{M as L};
