import{r as d,j as t}from"./index-7ba3262b.js";import{B as _}from"./Button-f981453b.js";import{a as h,u as j,q as g}from"./queryClient-641e317e.js";import{u as f}from"./useTranslation-15f14729.js";const k="_accordion_19jtz_1",v="_accordionTitle_19jtz_8",u={accordion:k,accordionTitle:v},T="_accordion__content_aaf4a_1",N="_open_aaf4a_7",x={accordion__content:T,open:N};function B({id:e,title:o,text:l}){const[s,i]=d.useState(null),n=d.useRef(null),p=m=>{i(m===s?null:m)};return d.useEffect(()=>{s===e?n.current.style.maxHeight=`${n.current.scrollHeight}px`:n.current.style.maxHeight="0px"},[s,e]),t.jsxs("div",{className:"accordion-item [&:not(:last-child)]:border-b border-b-gray-200","data-accordion-item":"true",id:"accordion_1_item_1",children:[t.jsxs("button",{onClick:()=>p(e),className:"accordion-toggle py-4 group","data-accordion-toggle":"#accordion_1_content_1",children:[t.jsx("span",{className:"text-base text-gray-900 font-medium",children:o}),e===s?t.jsx("i",{className:"ki-outline ki-minus text-gray-600 text-2sm accordion-active:block block"}):t.jsx("i",{className:"ki-outline ki-plus text-gray-600 text-2sm accordion-active:hidden block"})]}),t.jsx("div",{ref:n,className:`${x.accordion__content} ${e===s?`${x.open}`:""}`,id:"accordion_1_content_1",children:t.jsx("div",{className:"text-gray-700 text-md pb-4",children:l})})]})}const K=({arrAccord:e})=>t.jsxs("div",{className:`${u.accordion} m-auto max-w-[1140px]`,"data-accordion":"true",children:[t.jsx("h2",{className:u.accordionTitle,children:"FAQ"}),t.jsx("ul",{children:e.map(o=>t.jsx("li",{children:t.jsx(B,{id:o.id,title:o.title,text:o.text})},o.id))})]}),b="_cards_12ki3_1",y="_cardsTitle_12ki3_6",$="_cardsText_12ki3_15",I="_cardLink_12ki3_22",a={cards:b,cardsTitle:y,cardsText:$,cardLink:I},w="/assets/staticCardOne-b3fc8a09.jpg",C="/assets/staticCardTwo-3787feda.jpg",W=()=>t.jsxs("div",{className:`${a.cards} max-w-[1140px] m-auto`,children:[t.jsxs("div",{className:"card",children:[t.jsxs("div",{className:"card-body flex gap-10 justify-center",children:[t.jsxs("div",{className:"flex flex-col justify-center",children:[t.jsx("h3",{className:a.cardsTitle,children:"Questions?"}),t.jsx("p",{className:a.cardsText,children:"Visit our Help Center for detailed assistance on billing, payments, and subscriptions."})]}),t.jsx("img",{src:w,alt:"Questions?"})]}),t.jsx("div",{className:"card-footer justify-center",children:t.jsx("a",{className:`${a.cardLink} btn btn-link`,href:"#",children:"Go to Help Center"})})]}),t.jsxs("div",{className:"card",children:[t.jsxs("div",{className:"card-body flex gap-10 justify-center",children:[t.jsxs("div",{className:"flex flex-col justify-center",children:[t.jsx("h3",{className:a.cardsTitle,children:"Contact Support"}),t.jsx("p",{className:a.cardsText,children:"Need assistance? Contact our support team for prompt, personalized help your queries & concerns."})]}),t.jsx("img",{src:C,alt:"Contact Support"})]}),t.jsx("div",{className:"card-footer justify-center",children:t.jsx("a",{className:`${a.cardLink} btn btn-link`,href:"#",children:"Contact Support"})})]})]}),E="_topBar_10dsc_1",L="_topBtn_10dsc_7",A="_select_10dsc_13",z="_selectone_10dsc_18",c={topBar:E,topBtn:L,select:A,selectone:z},D="https://bwcreatorhub.com";function O(){return h.post(`${D}/api/create_gif/`,{text:"234fgdfg",color:"white"},{responseType:"blob"}).then(e=>URL.createObjectURL(e.data)).catch(e=>{const o=Object.keys(e.response.data).map(l=>`${e.response.data[l]}`).join(", ");throw new Error(o)})}const X=()=>{const{t:e,i18n:o}=f(),l=n=>{o.changeLanguage(n)},s=j({mutationFn:()=>O(),onSuccess:n=>{console.log(n)}},g),i=()=>{s.mutate()};return t.jsxs("div",{className:`${c.topBar} flex items-center max-w-[1140px] m-auto`,children:[t.jsxs("select",{className:`${c.select} select`,children:[t.jsx("option",{defaultValue:"Страна",children:"Страна"}),t.jsx("option",{value:"en",children:"England"}),t.jsx("option",{value:"ru",children:"Россия"}),t.jsx("option",{value:"es",children:"España"}),t.jsx("option",{value:"fr",children:"France"}),t.jsx("option",{value:"de",children:"Deutschland"}),t.jsx("option",{value:"zh",children:"中文"}),t.jsx("option",{value:"ja",children:"日本語"}),t.jsx("option",{value:"ko",children:"한국어"}),t.jsx("option",{value:"ar",children:"العربية"}),t.jsx("option",{value:"pt",children:"Portugal"}),t.jsx("option",{value:"it",children:"Italia"})]}),t.jsxs("select",{className:`${c.select} select`,onChange:n=>l(n.target.value),children:[t.jsx("option",{defaultValue:"Язык",children:"Язык"}),t.jsx("option",{value:"en",children:"English"}),t.jsx("option",{value:"ru",children:"Русский"}),t.jsx("option",{value:"es",children:"Español"}),t.jsx("option",{value:"fr",children:"Français"}),t.jsx("option",{value:"de",children:"Deutsch"}),t.jsx("option",{value:"zh",children:"中文"}),t.jsx("option",{value:"ja",children:"日本語"}),t.jsx("option",{value:"ko",children:"한국어"}),t.jsx("option",{value:"ar",children:"العربية"}),t.jsx("option",{value:"pt",children:"Português"}),t.jsx("option",{value:"it",children:"Italiano"})]}),t.jsx("select",{className:`${c.select} select`,children:t.jsx("option",{defaultValue:"Валюта",children:"Валюта"})}),t.jsx("select",{className:`${c.select} select`,children:t.jsx("option",{defaultValue:"Формат",children:"Формат"})}),t.jsx("select",{className:`${c.select} select mr-auto`,children:t.jsx("option",{defaultValue:"Тематика",children:"Тематика"})}),t.jsx(_,{onClick:i,className:c.topBtn,children:"Generare Now"})]})},S="_gifBlock_130po_1",V="_gifImg_130po_8",F="_gifCard_130po_14",H="_gifButton_130po_21",Z={gifBlock:S,gifImg:V,gifCard:F,gifButton:H},R="_integrationBlock_j4xz2_1",G="_integrationImg_j4xz2_12",q="_integrationTitle_j4xz2_17",M="_integrationLabel_j4xz2_25",r={integrationBlock:R,integrationImg:G,integrationTitle:q,integrationLabel:M},P="/assets/addIntegrations-074b4164.png",tt=()=>t.jsxs("div",{className:`${r.integrationBlock} max-w-[1140px] m-auto`,children:[t.jsx("img",{className:r.integrationImg,src:P,alt:""}),t.jsx("h2",{className:r.integrationTitle,children:"Add New Integration"}),t.jsx("p",{className:r.integrationLabel,children:"Explore New Integration: Expand Your Toolkit with Cutting-Edge, User-Friendly Solutions Tailored for Efficient and Innovative Project Management."})]});export{tt as A,W as C,X as T,K as a,Z as s};
