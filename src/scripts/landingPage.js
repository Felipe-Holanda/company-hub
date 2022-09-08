document.getElementById('done').style.display = 'none'

const buttons = document.querySelectorAll('button');

buttons[0].addEventListener('click', function (e) {
    window.location.href = './src/pages/singPage.html'
})

buttons[1].addEventListener('click', function (e) {
    window.location.href = './src/pages/singPage.html'
})

buttons[2].addEventListener('click', function (e) {
    e.preventDefault()
    document.getElementById('notYet').animate([
        { opacity: 1 },
        { opacity: .5 },
        { opacity: 0 }
    ], { duration: 500 })
    setTimeout(() => {
        document.getElementById('notYet').style.display = 'none'
        document.getElementById('done').style.display = 'block'
        document.getElementById('done').animate([
            { scale: 1.5 },
            { scale: 1.3 },
            { scale: 1 }
        ], { duration: 200 })
    }, 500)
})

const fabBtn = document.getElementById('fabBtn')
fabBtn.addEventListener('click', function (e) {
    window.scrollTo({ top: 0, behavior: 'slow' });
})