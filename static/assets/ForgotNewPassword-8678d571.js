import{j as s,L as S,h as P,r as n}from"./index-0b3af79d.js";import{B as k}from"./Button-afff04c6.js";import{u as v,a as y,d as C,t as q,q as F,e as T}from"./queryClient-fd267908.js";const $="_form_1qp0v_1",E="_title_1qp0v_5",R="_descr_1qp0v_12",L="_label_1qp0v_19",Y="_formTitle_1qp0v_25",B="_btn_1qp0v_31",e={form:$,title:E,descr:R,label:L,formTitle:Y,btn:B},M="/assets/SuccessForgot-e016dbe3.png",U="_boxSuccess_r1rdl_1",z="_img_r1rdl_6",A="_title_r1rdl_9",D="_descr_r1rdl_16",G="_link_r1rdl_24",o={boxSuccess:U,img:z,title:A,descr:D,link:G};function H(){return s.jsxs("div",{className:o.boxSuccess,children:[s.jsx("img",{className:o.img,src:M,alt:""}),s.jsx("h2",{className:o.title,children:"Your password is changed"}),s.jsxs("p",{className:o.descr,children:["Your password has been successfully updated. ",s.jsx("br",{}),"Your account's security is our priority."]}),s.jsx(S,{className:o.link,to:"/auth",children:"Sign in"})]})}function O(){var d,m;const{uid:u,token:p}=P(),[w,g]=n.useState(!1),[c,h]=n.useState(!1),[l,x]=n.useState(!1),_=()=>{h(r=>!r)},j=()=>{x(r=>!r)},t=v({mutationFn:r=>C(r.new_password,r.re_new_password,r.uid,r.token),onSuccess:()=>{g(!0),f()}},F),{register:i,handleSubmit:b,formState:{errors:a},reset:f}=y({resolver:q(T)});return w?s.jsx(H,{}):s.jsxs("form",{className:e.form,onSubmit:b(({password:r,confirmPassword:N})=>{t.mutate({new_password:r,re_new_password:N,uid:u,token:p})}),children:[s.jsx("h2",{className:e.title,children:"Reset Password"}),s.jsx("p",{className:e.descr,children:"Enter your new password"}),s.jsxs("label",{className:e.label,children:[s.jsx("span",{className:e.formTitle,children:"Password"}),s.jsxs("div",{className:`input max-w-72 ${a.password?"border-danger":""}`,"data-toggle-password":"true",children:[s.jsx("input",{autoComplete:"new-password",placeholder:"Enter Password",type:c?"text":"password",...i("password")}),s.jsx("div",{onClick:_,className:"btn btn-icon","data-toggle-password-trigger":"true",children:c?s.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):s.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),a&&s.jsx("span",{className:e.error,children:(d=a.password)==null?void 0:d.message})]}),s.jsxs("label",{className:e.label,children:[s.jsx("span",{className:e.formTitle,children:"Confirm Password"}),s.jsxs("div",{className:`input max-w-72 ${a.confirmPassword?"border-danger":""}`,"data-toggle-password":"true",children:[s.jsx("input",{autoComplete:"new-password",placeholder:"Re-enter Password",type:l?"text":"password",...i("confirmPassword")}),s.jsx("div",{onClick:j,className:"btn btn-icon","data-toggle-password-trigger":"true",children:l?s.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):s.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),a&&s.jsx("span",{className:e.error,children:(m=a.confirmPassword)==null?void 0:m.message})]}),t.error&&s.jsx("span",{className:e.error,children:t.error.message}),s.jsx(k,{isLoading:t.isPending,className:e.btn,children:"Submit"})]})}export{O as default};
