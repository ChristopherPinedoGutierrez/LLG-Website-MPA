(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const i=[{title:"GLP Emvasado 5kg",image:"https://apis.grupollamagas.pe:5003/api/v1/ECOMMERCE/ICONOS%20WEB/279x163%20UNIDAD%20GRANEL.svg",href:"/Producto/?prd=PRD0001&cache=false"},{title:"GLP Emvasado 10kg",image:"https://apis.grupollamagas.pe:5003/api/v1/ECOMMERCE/ICONOS%20WEB/279x163%20UNIDAD%20GRANEL.svg",href:"/Producto/?prd=PRD0002&cache=false"},{title:"GLP Emvasado 15kg",image:"https://apis.grupollamagas.pe:5003/api/v1/ECOMMERCE/ICONOS%20WEB/279x163%20UNIDAD%20GRANEL.svg",href:"/Producto/?prd=PRD0003&cache=false"}];function d(){const e=document.querySelector("#dropdown-movil"),t=document.querySelector("#dropdown-desktop");e.innerHTML="",t.innerHTML="",i.forEach(o=>{const s=document.createElement("sl-menu-item");s.setAttribute("value",o.href),s.innerHTML=`
                <div style="display: flex; flex-direction: row; align-items: center; gap: 1rem;">
                    <img src="${o.image}" alt="${o.title}" class="dropdown-icon" style="width: 40px; height: auto;">
                    <span>${o.title}</span>
                </div>
            `,s.addEventListener("click",()=>{window.location.href=o.href});const r=s.cloneNode(!0);r.addEventListener("click",()=>{window.location.href=o.href}),e.appendChild(s),t.appendChild(r)})}function l(){const e=document.querySelector("#searchButton"),t=document.querySelector("input[type='search']");e.addEventListener("click",()=>{const o=t.value;window.location.href=`/buscar?query=${encodeURIComponent(o)}`})}document.addEventListener("DOMContentLoaded",()=>{d(),l()});document.addEventListener("DOMContentLoaded",()=>{u(),window.addEventListener("resize",()=>{c()})});async function u(){try{await p(0),c()}catch(e){console.error("Error al inicializar el carrusel:",e)}}async function p(e=0){const t=await m(e),o=document.getElementById("productCarousel");t&&t.length?f(t):o.innerHTML=`
            <div class="card product-slider__card">
                <div class="card-body">
                    <h5 class="card-title">No hay productos disponibles para esta categoría.</h5>
                </div>
            </card>
        `}async function m(e){const t=`https://apis.grupollamagas.pe:5014/api/v1/GetProductos?idCatego=${e}`,s=await(await fetch(t)).json();return s.isOk&&Array.isArray(s.content)?s.content:[]}function f(e){const t=document.getElementById("productCarousel"),o=document.createDocumentFragment();e.forEach(s=>{const r=g(s);o.appendChild(r)}),t.innerHTML="",t.appendChild(o)}function g(e){console.log(e);const t=document.createElement("sl-carousel-item");t.className="carousel__slide";let o="";return e.Archivos&&e.Archivos.length>0?e.Archivos.forEach(s=>{o+=`
                <sl-carousel-item style="height: 100%; width: 100%; padding: 1rem">
                    <img src="${s.UrlFileMedia}" 
                        style="object-fit: contain;" 
                        alt="Imagen de ${e.nomProductoEXT}">
                </sl-carousel-item>
            `}):o=`
            <sl-carousel-item style="height: 100%; width: 100%; padding: 1rem">
                <img src="${e.Archivos[0].UrlFileMedia}"
                    style="object-fit: contain; max-height: 100%; max-width: 100%;"
                    alt="${e.nomProductoEXT}">
            </sl-carousel-item>
        `,t.innerHTML=`
        <div class="card product-slider__card" onClick="redirectToProductPage(${e.idProducto})">
            <div class="product-slider__card-header">
                <sl-carousel autoplay loop class="product-slider__card-carousel" >
                    ${o}
                </sl-carousel>
                <div class="product-slider__card-price">
                    <p class="card-text">S/ ${(e.Precio||0).toFixed(2)}</p>
                </div>
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${e.nomProductoEXT}</h5>
                <p class="card-text">${e.nomProductoINT}</p>
            </div>
        </div>
    `,t}function c(){const e=document.getElementById("productCarousel"),t=window.innerWidth;t>=1200?(e.setAttribute("slides-per-page",4),e.setAttribute("slides-per-move",4)):t>=992?(e.setAttribute("slides-per-page",3),e.setAttribute("slides-per-move",3)):t>=768?(e.setAttribute("slides-per-page",2),e.setAttribute("slides-per-move",2)):(e.setAttribute("slides-per-page",1),e.setAttribute("slides-per-move",1))}document.addEventListener("DOMContentLoaded",()=>{h();const e=document.getElementById("productButtons");e.addEventListener("click",t=>{const o=t.target;o.classList.contains("product-slider__button")&&(e.querySelectorAll(".product-slider__button").forEach(r=>r.classList.remove("active")),o.classList.add("active"))})});async function h(){try{await v()}catch(e){console.error("Error al obtener categorias:",e)}}async function v(){const e=await y();e&&e.length&&E(e)}async function y(){const o=await(await fetch("https://apis.grupollamagas.pe:5014/api/v1/GetCategorias")).json();return o.isOk&&Array.isArray(o.content)?o.content:[]}function E(e){const t=document.getElementById("productButtons"),o=document.createDocumentFragment();e.forEach(s=>{const r=_(s);o.appendChild(r)}),t.innerHTML="",t.appendChild(o)}function _(e){const t=document.createElement("button");return t.className="btn product-slider__button",t.id=`psb-${e.idCategoria}`,t.textContent=e.nomCategoria,t.onclick=()=>carrousel_productos_load(e.idCategoria),t}
