import{u as b,g as w,a as M,b as A,r,c as P,j as e,d as T,L as S,e as $,t as V,f as D,O as F}from"./index-27cacaf7.js";import{u as U}from"./useQuery-eab55123.js";import{p as q,l as Z}from"./authUser-ea138ca7.js";import{q as g,u as B,a as I}from"./queryClient-5637703c.js";import{s as h,c as R,a as d,b as j,d as m,e as C}from"./ScrollSpy.module-764760ca.js";import{c as Y,B as v}from"./Button-84c75981.js";import{s as p}from"./Modal.module-7cebd6cd.js";import{I as z}from"./index-5cabf26d.js";const K="_mainBlock_1rob9_1",G="_rightBlock_1rob9_5",L={mainBlock:K,rightBlock:G};function Q({children:s}){const a=b(w),n=M(),t=A(),l=U({queryKey:["user"],queryFn:()=>q(a),retry:1},g);return r.useEffect(()=>{l.data&&n(P.userData(l.data))},[l.data]),r.useEffect(()=>{l.error&&t("/auths")},[l.error]),e.jsx(e.Fragment,{children:s})}function H(s){const{children:a,isOpen:n,onClose:t,lazy:l,hiddenClose:u=!1}=s,[i,c]=r.useState(!1),[x,o]=r.useState(!1);r.useEffect(()=>{n&&o(!0)},[n]);const f=r.useRef(),N=r.useCallback(()=>{t&&(c(!0),f.current=setTimeout(()=>{c(!1),t()},300))},[t]),k=r.useCallback(y=>{y.key==="Escape"&&N()},[N]),O=y=>{y.stopPropagation()};if(r.useEffect(()=>(n&&(window.addEventListener("keydown",k),document.body.classList.add(p.bodyOpen)),()=>{clearTimeout(f.current),window.removeEventListener("keydown",k),document.body.classList.remove(p.bodyOpen)}),[n,k]),l&&!x)return null;const _={[p.open]:n,[p.close]:i};return e.jsx("div",{className:Y(p.modal,_),children:e.jsx("div",{className:p.overlay,onClick:N,children:e.jsxs("div",{className:p.content,onClick:O,children:[u,a]})})})}const J="/assets/PasswordChanged-beba0bf0.png",W=()=>{const[s,a]=r.useState(!0),n=()=>{a(!1)};return e.jsx(H,{isOpen:s,onClose:n,children:e.jsxs("div",{className:h.modalBlock,children:[e.jsx("h2",{className:h.modalTitle,children:"Step 2"}),e.jsxs("div",{className:h.modalDownBlock,children:[e.jsx("img",{className:h.modalImg,src:J,alt:"password"}),e.jsx("h3",{className:h.modalDownTitle,children:"Your password is changed"}),e.jsx("p",{className:h.modalText,children:"Your password has been successfully updated. Your account's security is our priority."})]}),e.jsx(v,{onClick:n,className:h.modalButton,children:"Done"})]})})},X=({isPromoCheck:s})=>{const[a,n]=r.useState(!1),[t,l]=r.useState(""),u=b(w),{t:i}=B(),c=I({mutationFn:o=>R(o.token,o.promocode),onSuccess:()=>{n(!1),g.invalidateQueries({queryKey:["user"]})}},g);r.useEffect(()=>{s===null&&n(!0)},[s]);const x=()=>{c.mutate({token:u,promocode:t})};return c.isSuccess?e.jsx(W,{}):e.jsx(H,{isOpen:a,children:e.jsxs("div",{className:d.modalBlock,children:[e.jsx("h2",{className:d.modalTitle,children:"Step 1"}),e.jsxs("p",{className:d.modalText,children:[i("Step_Text")," ",e.jsx("a",{target:"_blank",className:d.modalLink,href:"https://betwinneraffiliates.com",children:i("Platform")}),i("Step_TextTwo"),e.jsx("a",{target:"_blank",className:d.modalLink,href:"https://panel.betwinneraffiliates.com/#/dashboard/promo-codes",children:i("Promo")}),i("Step_TextThree")]}),e.jsxs("label",{className:d.modalInputBlock,htmlFor:"",children:[e.jsx("span",{children:"Your promocode"}),e.jsx("input",{maxLength:15,className:d.modalInput,value:t,onChange:o=>l(o.target.value)})]}),c.error&&e.jsx("span",{className:d.error,children:c.error.message}),e.jsx("button",{onClick:x,className:d.modalButton,children:"Save"})]})})},ee=()=>e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M15.6375 8.99993C15.6356 9.14851 15.5757 9.29046 15.4706 9.39553C15.3656 9.5006 15.2236 9.56049 15.075 9.56243H8.95505V11.9999C8.9609 12.0893 8.93852 12.1783 8.89108 12.2543C8.84364 12.3303 8.77352 12.3894 8.69064 12.4234C8.60775 12.4574 8.51629 12.4645 8.42915 12.4437C8.34202 12.4229 8.26363 12.3752 8.20505 12.3074L5.20505 9.30743C5.12627 9.22746 5.08211 9.1197 5.08211 9.00743C5.08211 8.89517 5.12627 8.78741 5.20505 8.70743L8.20505 5.70743C8.26286 5.64092 8.33981 5.59389 8.42538 5.57279C8.51095 5.5517 8.60094 5.55756 8.68305 5.58958C8.76515 5.6216 8.83536 5.67822 8.88405 5.75167C8.93274 5.82513 8.95754 5.91184 8.95505 5.99993V8.42243H15.075C15.1499 8.42341 15.2238 8.43913 15.2926 8.46868C15.3614 8.49823 15.4237 8.54105 15.4759 8.59467C15.5282 8.6483 15.5693 8.71169 15.597 8.78123C15.6248 8.85076 15.6385 8.92508 15.6375 8.99993ZM2.92505 3.62993C2.77586 3.62993 2.63279 3.6892 2.5273 3.79469C2.42181 3.90018 2.36255 4.04325 2.36255 4.19243V13.8074C2.36255 13.9566 2.42181 14.0997 2.5273 14.2052C2.63279 14.3107 2.77586 14.3699 2.92505 14.3699C3.07423 14.3699 3.21731 14.3107 3.3228 14.2052C3.42829 14.0997 3.48755 13.9566 3.48755 13.8074V4.19243C3.48856 4.11829 3.4747 4.04469 3.44679 3.97599C3.41888 3.90729 3.37748 3.84487 3.32504 3.79244C3.27261 3.74 3.2102 3.69861 3.1415 3.6707C3.07279 3.64279 2.9992 3.62893 2.92505 3.62993Z",fill:"#99A1B7"})}),se=()=>e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M15.9923 22.6299H8.01746C6.2579 22.6273 4.57116 21.9287 3.32696 20.6874C2.08276 19.4461 1.38262 17.7633 1.38 16.0078V8.05139C1.37478 7.17798 1.54254 6.31214 1.87364 5.50359C2.20475 4.69504 2.69267 3.9597 3.30941 3.3398C3.92614 2.7199 4.65954 2.22765 5.46748 1.89131C6.27542 1.55497 7.142 1.38117 8.01746 1.37988H16.0418C17.8014 1.39555 19.4829 2.10661 20.7179 3.35721C21.9528 4.6078 22.6403 6.29587 22.6298 8.05139V16.0572C22.6141 17.8041 21.9082 19.4743 20.6654 20.705C19.4226 21.9356 17.7433 22.6273 15.9923 22.6299ZM8.01746 2.86244C7.33261 2.85584 6.65332 2.98555 6.01932 3.24398C5.38532 3.50241 4.80933 3.88438 4.32505 4.36754C3.84077 4.8507 3.45792 5.42535 3.19889 6.05788C2.93986 6.69042 2.80985 7.36813 2.81647 8.05139V16.0572C2.82294 16.7322 2.9626 17.3992 3.22749 18.0203C3.49237 18.6414 3.87729 19.2043 4.36025 19.677C4.84321 20.1497 5.41476 20.5228 6.04227 20.7751C6.66978 21.0274 7.34095 21.1538 8.01746 21.1473H16.0418C17.4073 21.1447 18.7161 20.6024 19.6816 19.6391C20.6471 18.6758 21.1907 17.3701 21.1933 16.0078V8.05139C21.1907 6.68911 20.6471 5.38336 19.6816 4.42008C18.7161 3.4568 17.4073 2.91447 16.0418 2.91186L8.01746 2.86244ZM18.5878 7.97232C18.5878 7.77573 18.5096 7.58718 18.3702 7.44816C18.2309 7.30914 18.0419 7.23105 17.8449 7.23105H6.11538C5.91832 7.23105 5.72934 7.30914 5.59 7.44816C5.45066 7.58718 5.37238 7.77573 5.37238 7.97232C5.37238 8.16892 5.45066 8.35747 5.59 8.49649C5.72934 8.6355 5.91832 8.7136 6.11538 8.7136H17.8449C18.0411 8.71104 18.2286 8.63212 18.3674 8.49366C18.5062 8.35519 18.5853 8.16813 18.5878 7.97232ZM18.5878 11.9258C18.5878 11.7292 18.5096 11.5407 18.3702 11.4017C18.2309 11.2626 18.0419 11.1845 17.8449 11.1845H6.11538C5.91832 11.1845 5.72934 11.2626 5.59 11.4017C5.45066 11.5407 5.37238 11.7292 5.37238 11.9258C5.37238 12.1224 5.45066 12.311 5.59 12.45C5.72934 12.589 5.91832 12.6671 6.11538 12.6671H17.8449C18.0411 12.6645 18.2286 12.5856 18.3674 12.4471C18.5062 12.3087 18.5853 12.1216 18.5878 11.9258ZM18.5878 15.9287C18.5878 15.7321 18.5096 15.5436 18.3702 15.4046C18.2309 15.2655 18.0419 15.1874 17.8449 15.1874H6.11538C5.91832 15.1874 5.72934 15.2655 5.59 15.4046C5.45066 15.5436 5.37238 15.7321 5.37238 15.9287C5.37238 16.1253 5.45066 16.3139 5.59 16.4529C5.72934 16.5919 5.91832 16.67 6.11538 16.67H17.8449C18.0361 16.6678 18.2194 16.5929 18.3574 16.4608C18.4954 16.3286 18.5778 16.149 18.5878 15.9584V15.9287Z",fill:"#C4CADA"})}),ae=[{id:1,label:"Account Home",path:"/account-setting"},{id:2,label:"Billing",path:"/gif-banners"},{id:3,label:"Security",path:"#"},{id:4,label:"Members & Roles",path:"#"},{id:5,label:"Integrations",path:"#"},{id:6,label:"Notifications",path:"#"},{id:7,label:"API Settings",path:"#"}],ne=()=>{const s=T();return e.jsx("div",{className:"flex w-full",children:e.jsxs("div",{className:"flex flex-col grow relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:border-l before:border-gray-200 gap-1 shrink-0 w-[125px]","data-scrollspy":"true","data-scrollspy-offset":"30px|lg:50px","data-scrollspy-target":"#scrollable_1",children:[ae.map(a=>e.jsxs(S,{className:`${j.scrollLink} flex items-center relative rounded-lg pl-2.5 pr-2.5 py-2.5 gap-1.5 border border-transparent text-2sm font-medium text-gray-700`,"data-scrollspy-anchor":"true",to:a.path,children:[e.jsx("span",{className:s.pathname===a.path?`${j.scrollTextBefore} flex w-1.5 relative before:absolute before:top-0 before:left-px before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4`:"flex w-1.5 relative before:absolute before:top-0 before:left-px before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4"}),e.jsx("span",{className:s.pathname===a.path?`${j.scrollText}`:`${!j.scrollText}`,children:a.label})]},a.id)),e.jsxs("div",{className:"menu-item flex-col-reverse","data-menu-item-toggle":"accordion","data-menu-item-trigger":"click",children:[e.jsxs("a",{className:"menu-link !m-0 !pl-0",href:"#",children:[e.jsx("span",{className:"menu-icon w-4"}),e.jsxs("span",{className:"menu-title !text-gray-500",children:[e.jsx("span",{className:"hidden menu-item-show:block",children:"Show less"}),e.jsx("span",{className:"block menu-item-show:hidden",children:"Show 3 more"})]})]}),e.jsx("div",{className:"menu-accordion menu-no-indent",children:e.jsx("div",{className:"menu-item",children:e.jsxs("a",{className:"menu-link",href:"#",children:[e.jsx("span",{className:"menu-icon",children:e.jsx("i",{className:"ki-outline ki-bitcoin"})}),e.jsx("span",{className:"menu-title",children:"Menu item 4"})]})})})]})]})})},te=[{id:1,label:"Static banner",path:"/",icon:"ki-note"},{id:2,label:"Gif banner",path:"/gif-banners",icon:"ki-note-2"},{id:3,label:"Football/Sport",path:"#",icon:"ki-calculatoror",children:[{id:4,label:"Submenu item 1",path:"#",icon:"ki-user-square"}]},{id:5,label:"USER",icon:"ki-user",path:"#",children:[{id:6,label:"Setting",path:"#",icon:"ki-setting-2",children:[{id:7,component:ne}]}]},{id:8,type:"section",label:"MISCELLANEOUS"},{id:9,label:"My manager",path:"#",icon:"ki-some-files",adminOnly:!0,children:[{id:10,label:"StatickImg",path:"/admin-meneger"},{id:11,label:"DynamicGif",path:"/admin-meneger-gif"}]}];function E({item:s,isOpen:a,toggleOpen:n,isAdmin:t}){const{t:l}=B(),u=T(),i=()=>{n(s.id)};return s.adminOnly&&!t?null:s.type==="section"?e.jsx("span",{className:`${m.menuHead}`,children:e.jsx("span",{className:`${m.menuHeadTitle} menu-title`,children:l(s.label)})}):e.jsxs("div",{className:"menu-item","data-menu-item-toggle":"accordion","data-menu-item-trigger":"click",children:[s.path&&e.jsxs(S,{className:`${m.pageLink} ${m.scrollSpyElement} menu-link`,to:s.path,onClick:s.children?i:null,children:[e.jsx("span",{className:"menu-icon",children:e.jsx("i",{className:`ki-filled ${s.icon}`})}),e.jsx("span",{className:u.pathname===s.path?`${m.active} menu-title`:"menu-title",children:l(s.label)}),s.children&&e.jsx("span",{className:"menu-arrow",children:e.jsx("i",{className:`ki-outline ${a[s.id]?"ki-minus":"ki-plus"} `})})]}),e.jsx("div",{className:`${m.menuAccordion} ${a[s.id]?m.open:""}`,children:s.children&&a[s.id]&&e.jsx(e.Fragment,{children:s.children.map(c=>e.jsx(E,{item:c,isOpen:a,toggleOpen:n,isAdmin:t},c.id))})}),s.component&&e.jsx(s.component,{})]})}const le=()=>{const{t:s}=B(),a=b(w),n=M(),t=b($),[l,u]=r.useState({}),i=I({mutationFn:o=>Z(o.token),onSuccess:()=>{n(V.logout())}},g),c=()=>{i.mutate({token:a})},x=o=>{u(f=>({...f,[o]:!f[o]}))};return e.jsxs("nav",{children:[e.jsx("div",{className:"menu menu-default flex flex-col w-full","data-menu":"true",children:te.map(o=>e.jsx(E,{item:o,isOpen:l,toggleOpen:x,isAdmin:t!=null&&t.is_admin?t==null?void 0:t.is_admin:!1},o.id))}),e.jsx("button",{onClick:c,className:m.logout,children:s("Sing out")})]})},oe=()=>e.jsxs("aside",{className:C.aside,children:[e.jsxs("div",{className:C.asideUpper,children:[e.jsx(S,{className:C.logo,to:"/",children:e.jsx("img",{src:D,alt:"Logo"})}),e.jsx(v,{className:C.navbarMobileButton,children:e.jsx(se,{})})]}),e.jsx(v,{className:C.closeButton,children:e.jsx(ee,{})}),e.jsx(le,{})]});function xe(){const s=b($);return e.jsx(e.Fragment,{children:e.jsxs(Q,{children:[e.jsx(z,{position:"top-center",reverseOrder:!1}),e.jsxs("div",{className:L.mainBlock,children:[e.jsx(oe,{}),e.jsxs("div",{className:L.rightBlock,children:[e.jsx(F,{}),e.jsx(X,{isPromoCheck:s==null?void 0:s.promocode})]})]})]})})}export{xe as default};
