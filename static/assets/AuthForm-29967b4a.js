import{j as e,r as t,a as R,g as B,b as $,c as G,t as I,L as D,d as M}from"./index-0b3af79d.js";import{B as C}from"./Button-afff04c6.js";import{u as T,l as H,a as A,t as z,q as L,L as V,r as U,R as Z,b as q}from"./queryClient-fd267908.js";import{u as O}from"./useTranslation-d5967d93.js";const J="_boxSwitch_1kdru_1",K="_btnSwitch_1kdru_4",Q="_stroke_1kdru_9",W="_lineBreack_1kdru_14",X="_and_1kdru_20",Y="_boxGoogle_1kdru_28",ee="_googleAuth_1kdru_28",se="_authDescr_1kdru_35",g={boxSwitch:J,btnSwitch:K,stroke:Q,lineBreack:W,and:X,boxGoogle:Y,googleAuth:ee,authDescr:se};function ae(){return e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M13.9168 7.64424C13.9168 7.22181 13.8785 6.82077 13.813 6.43042H7.6394V8.84202H11.1742C11.0157 9.63341 10.5514 10.3018 9.86297 10.7563V12.3605H11.9718C13.2065 11.2429 13.9168 9.59598 13.9168 7.64424Z",fill:"#4285F4"}),e.jsx("path",{d:"M7.63954 13.9165C9.40966 13.9165 10.8902 13.339 11.972 12.3605L9.86311 10.7563C9.27308 11.1413 8.5246 11.3766 7.63954 11.3766C5.92953 11.3766 4.48175 10.2483 3.96273 8.72437H1.78833V10.3767C2.8646 12.4728 5.07725 13.9165 7.63954 13.9165Z",fill:"#34A853"}),e.jsx("path",{d:"M3.96266 8.72436C3.82608 8.33936 3.75506 7.92763 3.75506 7.49985C3.75506 7.07207 3.83155 6.66034 3.96266 6.27534V4.62305H1.78826C1.34027 5.4893 1.0835 6.46249 1.0835 7.49985C1.0835 8.53721 1.34027 9.51041 1.78826 10.3767L3.96266 8.72436Z",fill:"#FBBC05"}),e.jsx("path",{d:"M7.63954 3.62318C8.60655 3.62318 9.46975 3.94936 10.1527 4.58568L12.0211 2.75693C10.8902 1.71957 9.40966 1.08325 7.63954 1.08325C5.07725 1.08325 2.8646 2.527 1.78833 4.62311L3.96273 6.27541C4.48175 4.75145 5.92953 3.62318 7.63954 3.62318Z",fill:"#EA4335"})]})}const oe="_form_z9p43_1",te="_formTitle_z9p43_15",re="_btnSub_z9p43_21",ne="_boxForgot_z9p43_29",le="_forgotPass_z9p43_36",ce="_error_z9p43_44",h={form:oe,formTitle:te,btnSub:re,boxForgot:ne,forgotPass:le,error:ce};function ie(){var o,y;const[r,n]=t.useState(!1),[l,m]=t.useState(!1),d=R(B),f=$(),w=G(),p=()=>{n(s=>!s)},u=T({mutationFn:s=>H(s.email,s.password),onSuccess:s=>{w(I.initAuthData(s)),S()}},L),{register:b,handleSubmit:_,formState:{errors:c},reset:S,setValue:x}=A({resolver:z(V)});t.useEffect(()=>{const s=localStorage.getItem("email"),k=localStorage.getItem("password");s&&k&&(x("email",s),x("password",k),m(!0))},[x]),t.useEffect(()=>{l||(localStorage.removeItem("email"),localStorage.removeItem("password"))},[l]);const j=()=>{m(s=>!s)},P=s=>{l?(localStorage.setItem("email",s.email),localStorage.setItem("password",s.password)):(localStorage.removeItem("email"),localStorage.removeItem("password")),u.mutate({email:s.email,password:s.password})};return t.useEffect(()=>{d&&f("/")},[d]),e.jsxs("form",{className:h.form,onSubmit:_(P),children:[e.jsxs("label",{children:[e.jsx("span",{className:h.formTitle,children:"Email"}),e.jsx("input",{className:`input ${c.email?"border-danger":""}`,placeholder:"email@email.com",type:"email",autoComplete:"username",...b("email")}),c&&e.jsx("span",{className:h.error,children:(o=c.email)==null?void 0:o.message})]}),e.jsxs("label",{children:[e.jsxs("div",{className:h.boxForgot,children:[e.jsx("span",{className:h.formTitle,children:"Password"}),e.jsx(D,{to:"forgot",className:h.forgotPass,children:"Forgot Password?"})]}),e.jsxs("div",{className:`input max-w-72 ${c.password?"border-danger":""}`,"data-toggle-password":"true",children:[e.jsx("input",{autoComplete:"current-password",placeholder:"Enter Password",type:r?"text":"password",...b("password")}),e.jsx("div",{onClick:p,className:"btn btn-icon","data-toggle-password-trigger":"true",children:r?e.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):e.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),c&&e.jsx("span",{className:h.error,children:(y=c.password)==null?void 0:y.message})]}),e.jsxs("label",{className:"form-label flex items-center gap-2.5",children:[e.jsx("input",{className:"checkbox",name:"check",type:"checkbox",value:"1",checked:l,onChange:j}),"Remember me"]}),u.error&&e.jsx("span",{className:h.error,children:u.error.message}),e.jsx(C,{isLoading:u.isPending,className:h.btnSub,children:"Sign in"})]})}const me="_form_z9p43_1",de="_formTitle_z9p43_15",ue="_btnSub_z9p43_21",ge="_boxForgot_z9p43_29",he="_forgotPass_z9p43_36",pe="_error_z9p43_44",i={form:me,formTitle:de,btnSub:ue,boxForgot:ge,forgotPass:he,error:pe};function xe(){var s,k,E,F;O();const[r,n]=t.useState(!1),[l,m]=t.useState(!1),[d,f]=t.useState(!1),[w,p]=t.useState(null),[u,b]=t.useState(""),_=$(),c=()=>{n(a=>!a)},S=()=>{f(a=>!a)},x=T({mutationFn:a=>U(a.email,a.password,a.re_password,a.username),onSuccess:()=>{m(!0),p(null)},onError:a=>{const N=Object.keys(a).map(v=>`${v}: ${a[v]}`).join(", ");console.log(N),p(N)}},L),{register:j,handleSubmit:P,formState:{errors:o},reset:y}=A({resolver:z(Z)});return t.useEffect(()=>{l&&!w&&(_("/auth/check",{state:{emailName:u}}),m(!1))},[l,w]),e.jsxs("form",{className:i.form,onSubmit:P(({email:a,password:N,confirmPassword:v})=>{x.mutate({email:a,password:N,re_password:v,username:a}),b(a)}),children:[e.jsxs("label",{children:[e.jsx("span",{className:i.formTitle,children:"Email"}),e.jsx("input",{autoComplete:"username",className:`input ${o.email?"border-danger":""}`,placeholder:"email@email.com",type:"email",...j("email")}),o&&e.jsx("span",{className:i.error,children:(s=o.email)==null?void 0:s.message})]}),e.jsxs("label",{children:[e.jsx("span",{className:i.formTitle,children:"Password"}),e.jsxs("div",{className:`input max-w-72 ${o.password?"border-danger":""}`,"data-toggle-password":"true",children:[e.jsx("input",{autoComplete:"new-password",placeholder:"Enter Password",type:r?"text":"password",...j("password")}),e.jsx("div",{onClick:c,className:"btn btn-icon","data-toggle-password-trigger":"true",children:r?e.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):e.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),o&&e.jsx("span",{className:i.error,children:(k=o.password)==null?void 0:k.message})]}),e.jsxs("label",{children:[e.jsx("span",{className:i.formTitle,children:"Confirm Password"}),e.jsxs("div",{className:`input max-w-72 ${o.confirmPassword?"border-danger":""}`,"data-toggle-password":"true",children:[e.jsx("input",{autoComplete:"new-password",placeholder:"Re-enter Password",type:d?"text":"password",...j("confirmPassword")}),e.jsx("div",{onClick:S,className:"btn btn-icon","data-toggle-password-trigger":"true",children:d?e.jsx("i",{className:"ki-outline ki-eye-slash toggle-password-active:block"}):e.jsx("i",{className:"ki-outline ki-eye toggle-password-active:hidden"})})]}),o&&e.jsx("span",{className:i.error,children:(E=o.confirmPassword)==null?void 0:E.message})]}),e.jsxs("label",{className:"form-label flex items-center gap-2.5",children:[e.jsx("input",{...j("consent"),className:"checkbox",type:"checkbox",defaultChecked:!0}),e.jsx("p",{children:"I accept Terms & Conditions"})]}),o&&e.jsx("span",{className:i.error,children:(F=o.consent)==null?void 0:F.message}),x.error&&e.jsx("span",{className:i.error,children:x.error.message}),e.jsx(C,{isLoading:x.isPending,type:"submit",className:i.btnSub,children:"Sign up"})]})}function fe(r){return q.get("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:`Bearer ${r.access_token}`}}).then(n=>{const l=n.data.email,m=n.data.given_name,d=n.data.family_name,f=n.data.sub;return{email:l,username:m,lastname:d,id:f}}).catch(n=>{if(n)throw new Error("Ошибка")})}function Se(){const[r,n]=t.useState("auth"),[l,m]=t.useState(),d=()=>{n(p=>p==="register"?"auth":"register")};t.useEffect(()=>{console.log(l)},[l]);const w=M({onSuccess:async p=>{const u=await fe(p);if(u){const{email:b,username:_,lastname:c,id:S}=u;m({email:b,username:_,lastname:c,id:S})}}});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:g.boxSwitch,children:[e.jsx("h1",{children:r==="auth"?"Sign in":"Sign up"}),e.jsxs("div",{className:"flex justify-center items-center",children:[e.jsx("p",{className:"mr-1",children:r==="auth"?"Need an account?":"Already have an Account?"}),e.jsx(C,{className:g.btnSwitch,onClick:d,children:r==="auth"?"Sign up":"Sign in"})]})]}),e.jsx("div",{className:g.boxGoogle,children:e.jsxs(C,{onClick:()=>w(),className:g.googleAuth,children:[e.jsx(ae,{}),e.jsx("p",{className:g.authDescr,children:"Use Google"})]})}),e.jsxs("div",{className:g.stroke,children:[e.jsx("div",{className:g.lineBreack}),e.jsx("p",{className:g.and,children:"OR"}),e.jsx("div",{className:g.lineBreack})]}),r==="auth"?e.jsx(ie,{}):e.jsx(xe,{})]})}export{Se as default};
