import{l as n}from"./index-bff7c930.js";const c="https://bwcreatorhub.com";function d(a,s,t,r){return n.post(`${c}/auth/users/`,{email:r,password:s,re_password:t,username:a}).then(e=>e.data).catch(e=>{const o=Object.keys(e.response.data).map(u=>`${e.response.data[u]}`).join(", ");throw new Error(o)})}function h(a,s){return n.post(`${c}/auth/token/login/`,{password:s,username:a}).then(t=>t.data.auth_token).catch(t=>{const r=Object.keys(t.response.data).map(e=>`${t.response.data[e]}`).join(", ");throw new Error(r)})}function i(a){return n.post(`${c}/auth/users/reset_password/`,{email:a}).then(s=>s.data).catch(s=>{const t=Object.keys(s.response.data).map(r=>`${s.response.data[r]}`).join(", ");throw new Error(t)})}function w(a,s,t,r){return n.post(`${c}/auth/users/reset_password_confirm/`,{new_password:a,re_new_password:s,uid:t,token:r}).then(e=>e.data).catch(e=>{const o=Object.keys(e.response.data).map(u=>`${e.response.data[u]}`).join(", ");throw new Error(o)})}function $(a){return n.post(`${c}/auth/token/logout/`,{},{headers:{"Content-Type":"application/json",Authorization:`Token ${a}`}}).then(()=>{})}export{h as a,i as b,w as c,$ as l,d as r};
