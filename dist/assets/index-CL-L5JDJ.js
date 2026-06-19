var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function n(){if(a)return a;try{return a=await(await fetch(`/data/translations.json`)).json(),a}catch(e){return console.error(`Error loading translation asset:`,e),null}}async function r(e){let t=await n();!t||!t[e]||(document.documentElement.lang=e,localStorage.setItem(`language`,e),document.querySelectorAll(`.lang-select`).forEach(t=>{t.value=e}),document.querySelectorAll(`.lang-switch-luxury`).forEach(t=>{t.querySelectorAll(`.lang-btn`).forEach(t=>{t.getAttribute(`data-lang`)===e?t.classList.add(`active`):t.classList.remove(`active`)})}),document.querySelectorAll(`[data-i18n]`).forEach(n=>{let r=n.getAttribute(`data-i18n`);t[e][r]&&(n.tagName===`INPUT`||n.tagName===`TEXTAREA`?n.setAttribute(`placeholder`,t[e][r]):n.textContent=t[e][r])}),document.dispatchEvent(new CustomEvent(`languageChanged`,{detail:{lang:e}})))}function i(e,t=`en`){let n=[`০`,`১`,`২`,`৩`,`৪`,`৫`,`৬`,`৭`,`৮`,`৯`];return t===`bn`?`৳${String(e).split(``).map(e=>n[e]||e).join(``)}`:`$${e}`}var a,o=e((()=>{a=null,document.addEventListener(`DOMContentLoaded`,async()=>{let e=document.querySelectorAll(`.lang-select`);await r(localStorage.getItem(`language`)||`en`),e.forEach(e=>{e.addEventListener(`change`,e=>{r(e.target.value)})}),document.addEventListener(`click`,e=>{let t=e.target.closest(`.lang-switch-luxury .lang-btn`);t&&r(t.getAttribute(`data-lang`))})})})),s=t((()=>{o(),document.addEventListener(`DOMContentLoaded`,async()=>{let e=[],t=[],n=`all`;try{e=await(await fetch(`/data/products.json`)).json()}catch(e){console.error(`Error fetching Products catalogue:`,e)}try{t=await(await fetch(`/data/testimonials.json`)).json()}catch(e){console.error(`Error fetching Testimonials registry:`,e)}r(),o(),document.addEventListener(`languageChanged`,()=>{a(),s()});function r(){let e=document.querySelectorAll(`.filter-btn`);e.length!==0&&(e.forEach(t=>{t.addEventListener(`click`,r=>{e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),n=t.getAttribute(`data-filter`),a()})}),a())}function a(){let t=document.querySelector(`.products-grid`);if(!t)return;t.innerHTML=``;let r=document.documentElement.lang||`en`,a=e.filter(e=>n===`all`?!0:n===`bestseller`?e.is_bestseller:e.category.toLowerCase().includes(n));if(a.length===0){t.innerHTML=`
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light); font-family: var(--font-display);">
          No items found in this section.
        </div>
      `;return}a.forEach((e,n)=>{let a=document.createElement(`div`);a.className=`prod-card reveal active`,a.style.animationDelay=`${n*100}ms`;let o=e[r]||e.en;a.innerHTML=`
        ${e.is_bestseller?`<span class="prod-badge">${r===`bn`?`বেস্ট সেলার`:`Best Seller`}</span>`:``}
        <div class="prod-img-box">
          <img src="${e.image}" alt="${o.title}" referrerpolicy="no-referrer">
        </div>
        <div class="prod-info">
          <div class="prod-meta">
            <span>${e.size}</span>
            <span class="prod-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${e.rating.toFixed(1)}
            </span>
          </div>
          <h3 class="prod-title">${o.title} <span class="prod-arabic">${e.arabic_name}</span></h3>
          <p class="prod-descr">${o.description}</p>
          <div class="prod-notes">
            <strong>${r===`bn`?`সুবাস প্রোফাইল:`:`Scent Journey:`}</strong> ${o.notes}
          </div>
          <div class="prod-footer">
            <span class="prod-price">${i(e.price,r)}</span>
            <button class="prod-btn" aria-label="Acquire bottle" onclick="event.stopPropagation(); alert('${r===`bn`?`রাজকীয় কার্ট সংহতকরণ কার্যক্রম সফল হয়েছে!`:`Royal cart acquisition success! Bottle curated.`}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
          </div>
        </div>
      `,a.addEventListener(`click`,t=>{t.target.closest(`.prod-btn`)||(window.location.href=`/product.html?id=${e.id}`)}),t.appendChild(a)})}function o(){s()}function s(){let e=document.querySelector(`.testi-grid`);if(!e)return;e.innerHTML=``;let n=document.documentElement.lang||`en`;t.forEach((t,r)=>{let i=document.createElement(`div`);i.className=`testi-card reveal active`,i.style.animationDelay=`${r*150}ms`;let a=t[n]||t.en,o=``;for(let e=0;e<t.rating;e++)o+=`<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;i.innerHTML=`
        <div class="testi-stars">${o}</div>
        <p class="testi-comment">"${a.testimonial}"</p>
        <div class="testi-author">
          <div class="testi-avatar">
            <img src="${t.image}" alt="${a.avatar_alt}" referrerpolicy="no-referrer">
          </div>
          <div class="testi-info">
            <span class="testi-name">${t.name}</span>
            <span class="testi-role">${t.role}, ${t.location}</span>
          </div>
        </div>
      `,e.appendChild(i)})}})}));o(),s();