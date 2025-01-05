/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */

document.addEventListener('DOMContentLoaded', () => {
    categorias_productos_init()

    const buttonsContainer = document.getElementById('productButtons')

    // Delegación de eventos para los botones
    buttonsContainer.addEventListener('click', (event) => {
        const button = event.target

        // Verifica si el elemento clickeado tiene la clase de los botones
        if (button.classList.contains('product-slider__button')) {
            // Eliminar la clase 'active' de todos los botones
            const buttons = buttonsContainer.querySelectorAll('.product-slider__button')
            buttons.forEach((btn) => btn.classList.remove('active'))

            // Agregar la clase 'active' al botón clickeado
            button.classList.add('active')
        }
    })
})

async function categorias_productos_init() {
    try {
        await categorias_loadData()
    } catch (error) {
        console.error('Error al obtener categorias:', error)
    }
}

async function categorias_loadData() {
    const categos = await categoarias_fetchData()
    if (categos && categos.length) {
        categorias_buttons_render(categos) // Renderizar los productos
    }
}

async function categoarias_fetchData() {
    // Aquí puedes obtener los productos desde tu API.
    const urlService = 'https://apis.grupollamagas.pe:5014/api/v1/GetCategorias'
    const response = await fetch(urlService)
    const data = await response.json()
    return data.isOk && Array.isArray(data.content) ? data.content : []
}

function categorias_buttons_render(categos) {
    const buttonsContainer = document.getElementById('productButtons')
    const fragment = document.createDocumentFragment()
    categos.forEach((catego) => {
        const categoButton = category_create_button(catego)
        fragment.appendChild(categoButton)
    })

    // Inyectamos los productos en el carrusel
    buttonsContainer.innerHTML = '' // Limpiar carrusel antes de añadir nuevos productos
    buttonsContainer.appendChild(fragment)
}

function category_create_button(catego) {
    const button = document.createElement('button')
    button.className = 'btn product-slider__button'
    button.id = `psb-${catego.idCategoria}`
    button.textContent = catego.nomCategoria // Establece el texto del botón
    button.onclick = () => carrousel_productos_load(catego.idCategoria) // Agrega el evento onClick

    return button
}
