/* eslint-disable prettier/prettier */
const productosNavbar = [
    {
        title: 'GLP Emvasado 5kg',
        image: 'https://apis.grupollamagas.pe:5003/api/v1/ECOMMERCE/ICONOS%20WEB/279x163%20UNIDAD%20GRANEL.svg',
        href: '/Producto/?prd=PRD0001&cache=false',
    },
    {
        title: 'GLP Emvasado 10kg',
        image: 'https://apis.grupollamagas.pe:5003/api/v1/ECOMMERCE/ICONOS%20WEB/279x163%20UNIDAD%20GRANEL.svg',
        href: '/Producto/?prd=PRD0002&cache=false',
    },
    {
        title: 'GLP Emvasado 15kg',
        image: 'https://apis.grupollamagas.pe:5003/api/v1/ECOMMERCE/ICONOS%20WEB/279x163%20UNIDAD%20GRANEL.svg',
        href: '/Producto/?prd=PRD0003&cache=false',
    },
]

// Función para llenar los dropdowns
function llenarProductos() {
    // Seleccionar los contenedores para móvil y desktop
    const dropdownMovil = document.querySelector('#dropdown-movil')
    const dropdownDesktop = document.querySelector('#dropdown-desktop')

    // Limpiar los menús antes de llenarlos
    dropdownMovil.innerHTML = ''
    dropdownDesktop.innerHTML = ''

    // Llenar el contenido del menú
    productosNavbar.forEach((producto) => {
        // Crear un elemento <a> con la estructura requerida
        const itemMovil = document.createElement('sl-menu-item')
        itemMovil.setAttribute('value', producto.href) // Añadir el enlace
        // itemMovil.classtitle = "dropdown-item"; // Asignar clase para estilos si es necesario
        itemMovil.innerHTML = `
                <div style="display: flex; flex-direction: row; align-items: center; gap: 1rem;">
                    <img src="${producto.image}" alt="${producto.title}" class="dropdown-icon" style="width: 40px; height: auto;">
                    <span>${producto.title}</span>
                </div>
            `
        itemMovil.addEventListener('click', () => {
            window.location.href = producto.href
        })
        // Crear el elemento <sl-menu-item> para escritorio (clonando el de móvil)
        const itemDesktop = itemMovil.cloneNode(true)
        itemDesktop.addEventListener('click', () => {
            window.location.href = producto.href
        })

        // Añadir los elementos a los respectivos dropdowns
        dropdownMovil.appendChild(itemMovil)
        dropdownDesktop.appendChild(itemDesktop)
    })
}

// Función para capturar el valor del input y mostrarlo en un alert al hacer clic en la lupa
function configurarItems() {
    // Obtener el botón de búsqueda y el input de búsqueda
    const botonBusqueda = document.querySelector('#searchButton') // Seleccionar el botón de la lupa
    const inputBusqueda = document.querySelector("input[type='search']") // Seleccionar el input de búsqueda

    // Capturar el clic en el botón de búsqueda
    botonBusqueda.addEventListener('click', () => {
        const valorBusqueda = inputBusqueda.value // Obtener el valor del input
        window.location.href = `/buscar?query=${encodeURIComponent(valorBusqueda)}` // Redirigir a la página de búsqueda
    })
}

// Ejecutar las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    llenarProductos()
    configurarItems()
})
