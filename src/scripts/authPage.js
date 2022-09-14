const login = document.getElementById('login')
const register = document.getElementById('register')

login.style.display = 'none'
register.style.display = 'none'

const buttons = document.querySelectorAll('button')

buttons[2].addEventListener('click', function (e) {
    login.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], { duration: 200 })
    login.style.display = 'flex'
})

buttons[3].addEventListener('click', function (e) {

    register.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], { duration: 200 })
    register.style.display = 'flex'
})

const closeBtn = document.querySelectorAll('form span')

closeBtn[0].addEventListener('click', function (e) {

    login.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], { duration: 200 })
    setTimeout(() => {
        login.style.display = 'none'
    }, 202)
})


closeBtn[1].addEventListener('click', function (e) {

    register.animate([
        { opacity: 1 },
        { opacity: 0 }
    ], { duration: 200 })
    setTimeout(() => {
        register.style.display = 'none'
    }, 202)
})

document.querySelector('header i').addEventListener('click', (e) => {
    window.location.href = './'
})