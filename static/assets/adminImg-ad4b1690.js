import{k as r}from"./queryClient-ddd1e2ac.js";const e="https://bwcreatorhub.com";function s(t){return r.post(`${e}/api/load_picture/`,t).then(()=>{})}function c(){return r.get(`${e}/api/all_picture/`).then(t=>t.data).catch(t=>{const a=Object.keys(t.response.data).map(o=>`${t.response.data[o]}`).join(", ");throw new Error(a)})}export{c as a,s as l};
