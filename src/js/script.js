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

    //Product link

    const product = document.querySelectorAll('.product')
    product.forEach(e => {
        e.addEventListener('click', () => window.location.href = '#order')
    })

    //Slider

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

    //Load more btn

    //Variables
    const loadMore = document.querySelector('.menu__more')
    let menuItems = Array.from(document.querySelectorAll('.menu__item'))

    menuItems = menuItems.filter((el, index) => index > 2)

    //Button behavior
    loadMore.addEventListener('click', () => {
        for (let i = 0; i < 3; i++) {
            menuItems[i].style.display = 'flex'
        }
        menuItems = menuItems.filter((el, index) => index > 2)

        if (menuItems.length === 0) {
            loadMore.style.display = 'none'
        }
    })

    //Form

    //Variables
    const form = document.querySelector('.order__form')
    const phoneInput = document.getElementById('phone')
    const popUp = document.querySelector('.order__success')
    const closePopUp = document.querySelector('.order__success-button')

    //Setting up phone mask
    const iti = window.intlTelInput(phoneInput, {
        utilsScript: 'js/utils.min.js',
        separateDialCode: true,
        preferredCountries: [],
        initialCountry: 'auto',
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"))
        },
    })

    //Functions
    const formValidate = (form) => {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]
            formRemoveError(input)
            if (input.id === 'name') {
                if (input.value === '' || input.value.length < 2) {
                    formAddError(input)
                    error++
                }
            } else if (input.id === 'phone') {
                if (!iti.isValidNumber()) {
                    formAddError(input)
                    error++
                }
            } else if (input.id === 'email') {
                if (!validateEmail(input.value)) {
                    formAddError(input)
                    error++
                }
            } else if (input.id === 'checkbox' && input.checked === false) {
                formAddError(input)
                error++
            }
        }
        return error
    }

    const formAddError = (input) => {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }

    const formRemoveError = (input) => {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    //Submit form
    form.addEventListener('submit', async function (e) {
        e.preventDefault()
        const error = formValidate(form)

        if (error === 0) {
            form.classList.add('_sending')

            const formData = new FormData(form)
            formData.set('phone', iti.getNumber())

            const response = await fetch('../mailer/sendmail.php', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                form.reset()
                form.classList.remove('_sending')
                popUp.style.visibility = 'visible'
                popUp.style.opacity = 1
            } else {
                alert('Error')
                form.classList.remove('_sending')
            }
        } else {
            alert('Fill in the required fields!')
        }
    })

    //Close pop-up button
    closePopUp.addEventListener('click', () => {
        popUp.style.visibility = 'hidden'
        popUp.style.opacity = 0
    })

    //Pageup

    const pageUp = document.querySelector('.pageup')
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1600) {
            pageUp.style.visibility = 'visible'
            pageUp.style.opacity = 1
        } else {
            pageUp.style.visibility = 'hidden'
            pageUp.style.opacity = 0
        }
    })
})