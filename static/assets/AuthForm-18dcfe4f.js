import{j as e,r as c,u as L,g as G,m as R,b as B,t as D,L as I,n as Z}from"./index-a9b442b5.js";import{B as v}from"./Button-df9c9e72.js";import{u as M,t as H,L as O,R as q}from"./AuthType-1d0755e7.js";import{h as U,j as $,q as E,k as V}from"./queryClient-ddd1e2ac.js";import{c as J,r as K}from"./authUser-e3f35a71.js";import"./classNames-3b7f1560.js";const Q="_boxSwitch_1kdru_1",W="_btnSwitch_1kdru_4",X="_stroke_1kdru_9",Y="_lineBreack_1kdru_14",ee="_and_1kdru_20",se="_boxGoogle_1kdru_28",ae="_googleAuth_1kdru_28",te="_authDescr_1kdru_35",h={boxSwitch:Q,btnSwitch:W,stroke:X,lineBreack:Y,and:ee,boxGoogle:se,googleAuth:ae,authDescr:te};function oe(){return e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M13.9168 7.64424C13.9168 7.22181 13.8785 6.82077 13.813 6.43042H7.6394V8.84202H11.1742C11.0157 9.63341 10.5514 10.3018 9.86297 10.7563V12.3605H11.9718C13.2065 11.2429 13.9168 9.59598 13.9168 7.64424Z",fill:"#4285F4"}),e.jsx("path",{d:"M7.63954 13.9165C9.40966 13.9165 10.8902 13.339 11.972 12.3605L9.86311 10.7563C9.27308 11.1413 8.5246 11.3766 7.63954 11.3766C5.92953 11.3766 4.48175 10.2483 3.96273 8.72437H1.78833V10.3767C2.8646 12.4728 5.07725 13.9165 7.63954 13.9165Z",fill:"#34A853"}),e.jsx("path",{d:"M3.96266 8.72436C3.82608 8.33936 3.75506 7.92763 3.75506 7.49985C3.75506 7.07207 3.83155 6.66034 3.96266 6.27534V4.62305H1.78826C1.34027 5.4893 1.0835 6.46249 1.0835 7.49985C1.0835 8.53721 1.34027 9.51041 1.78826 10.3767L3.96266 8.72436Z",fill:"#FBBC05"}),e.jsx("path",{d:"M7.63954 3.62318C8.60655 3.62318 9.46975 3.94936 10.1527 4.58568L12.0211 2.75693C10.8902 1.71957 9.40966 1.08325 7.63954 1.08325C5.07725 1.08325 2.8646 2.527 1.78833 4.62311L3.96273 6.27541C4.48175 4.75145 5.92953 3.62318 7.63954 3.62318Z",fill:"#EA4335"})]})}const re="_form_z9p43_1",ne="_formTitle_z9p43_15",le="_btnSub_z9p43_21",ce="_boxForgot_z9p43_29",ie="_forgotPass_z9p43_36",me="_error_z9p43_44",g={form:re,formTitle:ne,btnSub:le,boxForgot:ce,forgotPass:ie,error:me};function de(){var C,l;const[a,o]=c.useState(!1),[t,i]=c.useState(!1),m=L(G),p=R(),k=B(),{t:f}=U(),b=()=>{o(s=>!s)},r=$({mutationFn:s=>J(s.email,s.password),onSuccess:s=>{k(D.initAuthData(s)),N()}},E),{register:x,handleSubmit:w,formState:{errors:d},reset:N,setValue:j}=M({resolver:H(O)});c.useEffect(()=>{const s=localStorage.getItem("email");s&&(j("email",s),i(!0))},[j]);const _=()=>{i(s=>!s)},S=s=>{t?localStorage.setItem("email",s.email):localStorage.removeItem("email"),r.mutate({email:s.email,password:s.password})};return c.useEffect(()=>{m&&p("/")},[m]),e.jsxs("form",{className:g.form,onSubmit:w(S),children:[e.jsxs("label",{children:[e.jsx("span",{className:g.formTitle,children:"Email"}),e.jsx("input",{className:`input ${d.email?"border-danger":""}`,placeholder:"email@email.com",type:"email",autoComplete:"username",...x("email")}),d&&e.jsx("span",{className:g.error,children:f((C=d.email)==null?void 0:C.message)})]}),e.jsxs("label",{children:[e.jsxs("div",{className:g.boxForgot,children:[e.jsx("span",{className:g.formTitle,children:"Password"}),e.jsx(I,{to:"forgot",className:g.forgotPass,children:"Forgot Password?"})]}),e.jsxs("div",{className:`input max-w-72 ${d.password?"border-danger":""}`,"data-toggle-password":"true",children:[e.jsx("input",{autoComplete:"current-password",placeholder:"Enter Password",type:a?"text":"password",...x("password")}),e.jsx("div",{onClick:b,className:"btn btn-icon","data-toggle-password-trigger":"true",children:a?e.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):e.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),d&&e.jsx("span",{className:g.error,children:f((l=d.password)==null?void 0:l.message)})]}),e.jsxs("label",{className:"form-label flex items-center gap-2.5",children:[e.jsx("input",{className:"checkbox",name:"check",type:"checkbox",value:"1",checked:t,onChange:_}),"Remember me"]}),r.error&&e.jsx("span",{className:g.error,children:r.error.message}),e.jsx(v,{isLoading:r.isPending,className:g.btnSub,children:"Sign in"})]})}const ue="_form_z9p43_1",he="_formTitle_z9p43_15",ge="_btnSub_z9p43_21",pe="_boxForgot_z9p43_29",xe="_forgotPass_z9p43_36",fe="_error_z9p43_44",u={form:ue,formTitle:he,btnSub:ge,boxForgot:pe,forgotPass:xe,error:fe};function be(){var F,A,T,z;const{t:a}=U(),[o,t]=c.useState(!1),[i,m]=c.useState(!1),[p,k]=c.useState(!1),[f,b]=c.useState(null),[r,x]=c.useState(""),w=L(G),d=R(),N=()=>{t(n=>!n)},j=()=>{k(n=>!n)},_=$({mutationFn:n=>K(n.email,n.password,n.re_password,n.username),onSuccess:()=>{m(!0),b(null),s()},onError:n=>{const P=Object.keys(n).map(y=>` ${n[y]}`).join(", ");b(P)}},E),{register:S,handleSubmit:C,formState:{errors:l},reset:s}=M({resolver:H(q)});return c.useEffect(()=>{i&&!f&&(d("/auths/check",{state:{emailName:r}}),m(!1))},[i,f]),c.useEffect(()=>{w&&d("/")},[w]),e.jsxs("form",{className:u.form,onSubmit:C(({email:n,password:P,confirmPassword:y})=>{_.mutate({email:n,password:P,re_password:y,username:n}),x(n)}),children:[e.jsxs("label",{children:[e.jsx("span",{className:u.formTitle,children:"Email"}),e.jsx("input",{autoComplete:"username",className:`input ${l.email?"border-danger":""}`,placeholder:"email@email.com",type:"email",...S("email")}),l&&e.jsx("span",{className:u.error,children:a((F=l.email)==null?void 0:F.message)})]}),e.jsxs("label",{children:[e.jsx("span",{className:u.formTitle,children:"Password"}),e.jsxs("div",{className:`input max-w-72 ${l.password?"border-danger":""}`,"data-toggle-password":"true",children:[e.jsx("input",{autoComplete:"new-password",placeholder:"Enter Password",type:o?"text":"password",...S("password")}),e.jsx("div",{onClick:N,className:"btn btn-icon","data-toggle-password-trigger":"true",children:o?e.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):e.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),l&&e.jsx("span",{className:u.error,children:a((A=l.password)==null?void 0:A.message)})]}),e.jsxs("label",{children:[e.jsx("span",{className:u.formTitle,children:"Confirm Password"}),e.jsxs("div",{className:`input max-w-72 ${l.confirmPassword?"border-danger":""}`,"data-toggle-password":"true",children:[e.jsx("input",{autoComplete:"new-password",placeholder:"Re-enter Password",type:p?"text":"password",...S("confirmPassword")}),e.jsx("div",{onClick:j,className:"btn btn-icon","data-toggle-password-trigger":"true",children:p?e.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):e.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),l&&e.jsx("span",{className:u.error,children:a((T=l.confirmPassword)==null?void 0:T.message)})]}),e.jsxs("label",{className:"form-label flex items-center gap-2.5",children:[e.jsx("input",{...S("consent"),className:"checkbox",type:"checkbox",defaultChecked:!0}),e.jsx("p",{children:"I accept Terms & Conditions"})]}),l&&e.jsx("span",{className:u.error,children:a((z=l.consent)==null?void 0:z.message)}),_.error&&e.jsx("span",{className:u.error,children:_.error.message}),e.jsx(v,{isLoading:_.isPending,type:"submit",className:u.btnSub,children:"Sign up"})]})}const we="https://bwcreatorhub.com";function je(a){return V.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${a.access_token}`}}).then(o=>{const t=o.data.email,i=o.data.given_name,m=o.data.family_name,p=o.data.sub;return{email:t,username:i,lastname:m,id:p}}).catch(o=>{if(o)throw new Error("Ошибка")})}function _e(a,o){return V.post(`${we}/api/google_auth/`,{email:a,username:o}).then(t=>t.data.token).catch(t=>{const i=Object.keys(t.response.data).map(m=>`${t.response.data[m]}`).join(", ");throw new Error(i)})}function ye(){const[a,o]=c.useState("auth"),[t,i]=c.useState(),m=B(),p=()=>{o(r=>r==="register"?"auth":"register")},k=$({mutationFn:r=>_e(r.email,r.username),onSuccess:r=>{m(D.initAuthData(r))}},E);c.useEffect(()=>{t&&k.mutate({email:t.email,username:t.email})},[t]);const b=Z({onSuccess:async r=>{const x=await je(r);if(x){const{email:w,username:d,lastname:N,id:j}=x;i({email:w,username:d,lastname:N,id:j})}}});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:h.boxSwitch,children:[e.jsx("h1",{children:a==="auth"?"Sign in":"Sign up"}),e.jsxs("div",{className:"flex justify-center items-center",children:[e.jsx("p",{className:"mr-1",children:a==="auth"?"Need an account?":"Already have an Account?"}),e.jsx(v,{className:h.btnSwitch,onClick:p,children:a==="auth"?"Sign up":"Sign in"})]})]}),e.jsx("div",{className:h.boxGoogle,children:e.jsxs(v,{onClick:()=>b(),className:h.googleAuth,children:[e.jsx(oe,{}),e.jsx("p",{className:h.authDescr,children:"Use Google"})]})}),e.jsxs("div",{className:h.stroke,children:[e.jsx("div",{className:h.lineBreack}),e.jsx("p",{className:h.and,children:"OR"}),e.jsx("div",{className:h.lineBreack})]}),a==="auth"?e.jsx(de,{}):e.jsx(be,{})]})}export{ye as default};
