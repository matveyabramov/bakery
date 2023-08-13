document.addEventListener('DOMContentLoaded', () => {

    //Hamburger

    //Variables
    const nav = document.querySelector('.nav_header')
    const navItems = document.querySelectorAll('.nav__item')
    const hamburger = document.querySelector('.hamburger')

    //Click on the hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active')
        nav.classList.toggle('nav_active')
    })

    //Click on the link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active')
            nav.classList.toggle('nav_active')
        })
    })

    //Swiper

    new Swiper('.swiper', {
        loop: true,
        speed: 800,

        navigation: {
            nextEl: '.reviews__button_next',
            prevEl: '.reviews__button_prev'
        },

        pagination: {
            el: '.reviews__dots',
            clickable: true
        },

        autoplay: {
            delay: 3000
        }
    })
})