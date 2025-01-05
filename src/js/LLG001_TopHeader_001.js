function toggleSubMenu() {
    var subMenu = document.getElementById('subMenu')
    if (subMenu.classList.contains('show-menu')) {
        subMenu.classList.remove('show-menu')
    } else {
        subMenu.classList.add('show-menu')
    }
}

function setActive(element) {
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active')
    })
    sessionStorage.setItem('activeNav', element.id)

    setTimeout(function () {
        setActiveElement()
    }, 250)
}

function setActiveElement() {
    const activeNav = sessionStorage.getItem('activeNav')
    console.log(activeNav)
    if (activeNav) {
        const activeElement = document.getElementById(activeNav)
        if (activeElement) {
            activeElement.classList.add('active')
        }
    }
}
