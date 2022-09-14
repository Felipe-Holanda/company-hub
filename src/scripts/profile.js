const btn = document.querySelectorAll('section button')
let btn0Active = false;
const inputs = document.querySelectorAll('section input')

btn[0].addEventListener('click', () => {
    if (!btn0Active) {

    }
})
/*

btn[1].addEventListener('click', () => {
    if (btn0Active == false) {
        btn0Active = true;
        btn[0].disabled = false;
        inputs.forEach(input => {
            input.disabled = false;
        })
    } else {
        window.location.reload()
        btn[0].disabled = true;
        inputs.forEach(input => {
            input.disabled = true;
        })
    }
})

*/