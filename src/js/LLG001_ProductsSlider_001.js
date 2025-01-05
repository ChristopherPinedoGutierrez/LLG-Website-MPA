/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    carrousel_productos_init()
    // Redimensionamos el número de slides visibles cuando se cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        carrousel_productos_setResponsiveSlides()
    })
})

async function carrousel_productos_init() {
    try {
        await carrousel_productos_load(0) // Cargar productos
        carrousel_productos_setResponsiveSlides() // Configurar los slides iniciales
    } catch (error) {
        console.error('Error al inicializar el carrusel:', error)
    }
}

async function carrousel_productos_load(categ = 0) {
    const products = await carrousel_productos_fetch(categ)
    const carousel = document.getElementById('productCarousel')
    if (products && products.length) {
        carrousel_productos_render(products) // Renderizar los productos
    } else {
        // Limpiar el carrusel y mostrar un mensaje de "sin productos"
        carousel.innerHTML = `
            <div class="card product-slider__card">
                <div class="card-body">
                    <h5 class="card-title">No hay productos disponibles para esta categoría.</h5>
                </div>
            </card>
        `
    }
}

async function carrousel_productos_fetch(categ) {
    // Aquí puedes obtener los productos desde tu API.
    const urlService = `https://apis.grupollamagas.pe:5014/api/v1/GetProductos?idCatego=${categ}`
    const response = await fetch(urlService)
    const data = await response.json()
    return data.isOk && Array.isArray(data.content) ? data.content : []
}

function carrousel_productos_render(products) {
    const carousel = document.getElementById('productCarousel')
    const fragment = document.createDocumentFragment()
    products.forEach((product) => {
        const productCard = carrousel_productos_createCard(product)
        fragment.appendChild(productCard)
    })

    // Inyectamos los productos en el carrusel
    carousel.innerHTML = '' // Limpiar carrusel antes de añadir nuevos productos
    carousel.appendChild(fragment)
}

function redirectToProductPage(idProducto) {
    const url = `https://apps.grupollamagas.pe:8087/Producto/?prd=${idProducto}`
    window.location.href = url
}

function carrousel_productos_createCard(product) {
    console.log(product)
    const slide = document.createElement('sl-carousel-item')
    slide.className = 'carousel__slide'

    // Crear un carrusel dinámico con las imágenes de product.Archivos
    let carouselInnerHTML = ''
    if (product.Archivos && product.Archivos.length > 0) {
        product.Archivos.forEach((archivo) => {
            carouselInnerHTML += `
                <sl-carousel-item style="height: 100%; width: 100%; padding: 1rem">
                    <img src="${archivo.UrlFileMedia}" 
                        style="object-fit: contain;" 
                        alt="Imagen de ${product.nomProductoEXT}">
                </sl-carousel-item>
            `
        })
    } else {
        carouselInnerHTML = `
            <sl-carousel-item style="height: 100%; width: 100%; padding: 1rem">
                <img src="${product.Archivos[0].UrlFileMedia}"
                    style="object-fit: contain; max-height: 100%; max-width: 100%;"
                    alt="${product.nomProductoEXT}">
            </sl-carousel-item>
        `
    }

    slide.innerHTML = `
        <div class="card product-slider__card" onClick="redirectToProductPage(${product.idProducto})">
            <div class="product-slider__card-header">
                <sl-carousel autoplay loop class="product-slider__card-carousel" >
                    ${carouselInnerHTML}
                </sl-carousel>
                <div class="product-slider__card-price">
                    <p class="card-text">S/ ${(product.Precio || 0).toFixed(2)}</p>
                </div>
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${product.nomProductoEXT}</h5>
                <p class="card-text">${product.nomProductoINT}</p>
            </div>
        </div>
    `

    return slide
}

function carrousel_productos_setResponsiveSlides() {
    const carousel = document.getElementById('productCarousel')
    const width = window.innerWidth

    if (width >= 1200) {
        carousel.setAttribute('slides-per-page', 4) // XL
        carousel.setAttribute('slides-per-move', 4)
    } else if (width >= 992) {
        carousel.setAttribute('slides-per-page', 3) // LG
        carousel.setAttribute('slides-per-move', 3)
    } else if (width >= 768) {
        carousel.setAttribute('slides-per-page', 2) // MD
        carousel.setAttribute('slides-per-move', 2)
    } else {
        carousel.setAttribute('slides-per-page', 1) // SM & XS
        carousel.setAttribute('slides-per-move', 1)
    }
}
