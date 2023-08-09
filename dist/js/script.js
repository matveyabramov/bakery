document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav_header'),
        navItems = document.querySelectorAll('.nav__item'),
        hamburger = document.querySelector('.hamburger')

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active')
        nav.classList.toggle('nav_active')
    })

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active')
            nav.classList.toggle('nav_active')
        })
    })
})