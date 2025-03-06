function s(r,t){const e=document.createElement(r);return t&&typeof t=="string"&&t!==""&&(e.textContent=t),t&&typeof t=="object"&&Object.keys(t).forEach(i=>{e.setAttribute(i,t[i])}),e}function d(r,t,e){r.addEventListener(t,e)}function C(r){const t=r.match(/\w+$/)?.[0]??"";return t===""||t.length>1?"":t.toUpperCase()}const v=["Control","Shift","Alt","Meta"],g=["Control+T","Control+Shift+T","Control+W","Control+Shift+W","Control+N","Control+Shift+N","Control+Tab","Control+Shift+Tab","Meta+T","Meta+Shift+T","Meta+W","Meta+Shift+W","Meta+N","Meta+Shift+N","Meta+Tab","Meta+Shift+Tab"];function w(r){const t=r.match(/\w+/g)??[];if(t.length===0)return!1;const e=t.map(i=>i.toUpperCase()==="CTRL"?"Control":i.toUpperCase()==="CMD"?"Meta":i[0].toUpperCase()+i.slice(1).toLowerCase()).join("+");return!g.includes(e)&&e.split("+").slice(0,-1).every(i=>v.includes(i))}class E{instance;#o=null;#t=null;#i=[];currentIndex=0;#s="Escape";#r;#n="K";#e="Search command";#h="No commands found";#a="black";#u=new MutationObserver(this.#f.bind(this));constructor({closeKey:t,placeholder:e,emptyMessage:i,activationLetter:n}={}){if(document.getElementById("hotkeypad")==null)throw new Error("HotKeyPad instance not found in the DOM");return this.instance=document.getElementById("hotkeypad"),this.#r=navigator.userAgent.includes("Macintosh")?"Cmd":"Ctrl",t&&t!==""&&(this.#s=t),e&&e!==""&&(this.#e=e),i&&i!==""&&(this.#h=i),n&&n!==""&&(this.#n=n),this.#y(),this.#p(),this}#p(){d(document,"keydown",t=>{const e=`Key${this.#n.toUpperCase()}`;t.code===e&&(t.metaKey||t.ctrlKey)&&(t.preventDefault(),this.#C?this.close():this.open()),t.key.toLowerCase()===this.#s.toLowerCase()&&this.close()}),this.#u.observe(this.instance,{attributes:!0,attributeFilter:["class"],childList:!1,characterData:!1}),this.#E(),this.#A(),this.#L(),this.#I()}#y(){this.instance.hasAttribute("data-placeholder")&&this.instance.getAttribute("data-placeholder")!==""&&(this.#e=this.instance.getAttribute("data-placeholder")),this.instance.hasAttribute("data-activation-letter")&&this.instance.getAttribute("data-activation-letter")!==""&&(this.#n=this.instance.getAttribute("data-activation-letter").toUpperCase()),this.instance.hasAttribute("data-close-key")&&this.instance.getAttribute("data-close-key")!==""&&(this.#s=this.instance.getAttribute("data-close-key").toUpperCase())}#f(t){const{attributeName:e,target:i}=t[0];e==="class"&&(i.classList.contains("dark")?this.#a="white":this.#a="black",this.#d())}#m(){d(this.instance,"keydown",t=>{(t.metaKey||t.ctrlKey)&&this.#i.find(({hotkey:e,handler:i})=>{const o=`Key${C(e)}`;return t.code===o&&(t.preventDefault(),i!=null&&setTimeout(()=>i(this.instance),200),this.close()),!1})}),d(this.#t,"click",t=>{const e=t.target;e.tagName==="LI"&&this.#c(e),e.parentElement?.tagName==="LI"&&this.#c(e.parentElement)}),d(this.#t,"mouseover",t=>{const e=t.target;e.tagName==="LI"&&(this.#l.forEach(i=>i.removeAttribute("data-active")),e.setAttribute("data-active",""))}),d(this.#t,"keydown",t=>{const e=this.#l;this.currentIndex=Array.from(e).findIndex(n=>n.hasAttribute("data-active")),this.currentIndex=this.currentIndex===-1?0:this.currentIndex;let i=0;t.key==="Enter"&&(t.preventDefault(),this.#c(e[this.currentIndex]),e[this.currentIndex].removeAttribute("data-active"),this.currentIndex=0),t.key==="ArrowUp"&&(t.preventDefault(),i=this.currentIndex-1<0?e.length-1:this.currentIndex-1),t.key==="ArrowDown"&&(t.preventDefault(),i=this.currentIndex+1>e.length-1?0:this.currentIndex+1),t.key==="Tab"&&(t.preventDefault(),i=this.currentIndex+1>e.length-1?0:this.currentIndex+1),e[this.currentIndex].removeAttribute("data-active"),e[i].setAttribute("data-active","")}),d(this.#t,"input",t=>{const i=t.target.value.toLowerCase(),n=this.#t.querySelectorAll("[data-section]"),o=this.#t.querySelector("[data-empty]");n.forEach(a=>{const h=a.querySelector("ul");h.querySelectorAll("li").forEach(l=>{l.querySelector("p").innerText.toLowerCase().includes(i)?l.style.display="flex":l.style.display="none"}),h.querySelectorAll("li[style='display: flex;']").length===0?a.style.display="none":a.style.display="block"}),this.#t.querySelectorAll("[data-section][style='display: block;']").length===0?o.style.display="flex":o.style.display="none"})}#c(t){this.#i.find(({hotkey:e,handler:i})=>(t.getAttribute("data-hotkey")===e&&(i!=null&&setTimeout(()=>i(this.instance),200),this.close()),!1))}#b(t){if(t.length===0)throw new Error("The commands array cannot be empty");return t.forEach(e=>{if(e.id===""||e.title===""||e.hotkey===""||e.handler==null)throw new Error("The command object is not valid. It should contain an id, title, hotkey and handler");if(!w(e.hotkey))throw new Error("The hotkey is not valid. It should only contain CTRL, CMD, ALT, SHIFT and a letter. Also it cannot contain browser or system reserved hotkeys such as CTRL+T, CTRL+N, CTRL+W, etc.");if(e.icon!=null&&typeof e.icon!="string")throw new Error("The icon should be a string");if((e.hotkey.match(/\w+/g)??[]).length>2)throw new Error("The hotkey only supports 2 keys maximum")}),t}#k(t){const e=document.querySelector("#hotkeypad-footer");if(e==null)return!1;const i=e.content.cloneNode(!0);return Array.from(i.children).forEach(o=>t.appendChild(o)),!0}open(){window.dispatchEvent(new CustomEvent("hotkeypad:open")),this.instance.style.opacity="1",this.instance.style.visibility="visible",this.instance.style.pointerEvents="auto",setTimeout(()=>this.#t.querySelector("input").focus(),200)}close(){window.dispatchEvent(new CustomEvent("hotkeypad:close")),this.instance.style.opacity="0",this.instance.style.visibility="hidden",this.instance.style.pointerEvents="none",this.#t.querySelector("input").value="",this.#t.removeEventListener("keydown",()=>{}),this.#t.removeEventListener("mouseover",()=>{}),this.#t.removeEventListener("input",()=>{})}setCommands(t){this.#i=this.#b(t),this.#d(),this.#m()}get#C(){return this.instance.style.visibility==="visible"}get activationKey(){return this.#r}get#v(){const t=new Map;return this.#i.forEach(e=>{const i=typeof e.section!="string"||e.section===""?"Unlisted":e.section,{section:n,...o}=e,c=t.get(i);c?c.push(o):t.set(i,[o])}),Array.from(t)}get#l(){return this.#t.querySelectorAll("li")}get emptyMessage(){const t=s("div",this.#h);return t.setAttribute("data-empty",""),t}#g(t){return`https://cdn.simpleicons.org/${t}/${this.#a}`}#w(t){return/<svg/.test(t)||/<img/.test(t)||/<i/.test(t)||t===""}#E(){this.#o=s("div",{"data-backdrop":"","aria-hidden":"true"}),d(this.#o,"click",()=>this.close()),this.instance.appendChild(this.#o)}#A(){this.#t=s("div",{"data-container":""}),this.instance.appendChild(this.#t)}#L(){const t=s("header"),e=s("input",{type:"text",name:this.#e.toLocaleLowerCase(),placeholder:this.#e,"aria-label":this.#e,autocomplete:"off",spellcheck:"false"});t.appendChild(e),this.#t.appendChild(t)}#I(){const t=s("footer");if(!this.#k(t)){const e=s("kbd","↩"),i=s("kbd","↑"),n=s("kbd","↓"),o=s("kbd",this.#s),c=s("kbd",`${this.#r} + ${this.#n}`),a=s("p"," to select"),h=s("p"," to navigate"),p=s("p"," to close");a.prepend(e),h.prepend(i,n),p.prepend(c,o),t.append(a,h,p)}this.#t.appendChild(t)}#T(){const t=s("div");t.setAttribute("data-sections",""),this.#v.forEach(([e,i])=>{const n=s("div");if(n.setAttribute("data-section",e.toLowerCase()),e!=="Unlisted"){const c=s("h4",e);c.setAttribute("id",`section-${e.toLowerCase()}`),n.setAttribute("aria-labelledby",`section-${e.toLowerCase()}`),n.appendChild(c)}const o=s("ul");i.forEach(({title:c,icon:a,hotkey:h})=>{const p=h.split("+").map(u=>u.trim());a==null&&(a="");const y=this.#w(a)?a:`<img src="${this.#g(a)}" alt="${c}" />`,l=s("li");if(l.setAttribute("data-hotkey",h),y!==""){const u=s("span");u.innerHTML=y,l.appendChild(u)}const f=s("p");f.append(c);const m=s("div");p.forEach(u=>{const k=s("span",u);m.appendChild(k)}),l.appendChild(f),l.appendChild(m),o.appendChild(l)}),n.appendChild(o),t.appendChild(n)}),t.appendChild(this.emptyMessage),this.#t.insertBefore(t,this.#t.lastChild)}#d(){const t=this.#t.querySelector("[data-sections]");t&&t.remove(),this.#T(),this.#l[0].setAttribute("data-active","")}}const b=new E,A=b.instance.getAttribute("data-info")??"[]",L=JSON.parse(A),I=L.map(({url:r,hotkey:t,icon:e,id:i,section:n,title:o})=>({id:i,title:o,icon:e,hotkey:t,section:n,handler:()=>{window.open(r,"_blank")}}));b.setCommands([{id:"print",title:"Imprimir",icon:`<svg style="margin-right: 8px" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
</svg>`,hotkey:"ctrl+P",section:"Acciones",handler:()=>{window.print()}},...I]);const T=document.getElementById("footer-button");T?.addEventListener("click",()=>{var r=new KeyboardEvent("keydown",{key:"K",code:"KeyK",keyCode:75,which:75,ctrlKey:!0,altKey:!1,shiftKey:!1,metaKey:!1});document.dispatchEvent(r)});
