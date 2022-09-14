import { Api } from "../class/Api.js";
import { Notify } from "../class/Notify.js";

const selectSector = document.querySelector('#sector')

const list = Api.listedSectors().then(res => {
    res.forEach(element => {
        selectSector.innerHTML += `<option value="${element.uuid}">${element.description}</option>`
    });
})

const allBtn = document.querySelectorAll('button')

allBtn[0].addEventListener('click', () => {
    const allInputs = document.querySelectorAll('input')
    if (allInputs[0].value.length == 0 || allInputs[1].value.length == 0 || allInputs[2].value.length == 0 || selectSector.value == 'null') {
        Notify.now(false, 5000, 'Certifique-se se todos os campos estão preenchidos corretamente!')
    } else {
        const data = {
            name: allInputs[0].value,
            opening_hours: allInputs[1].value,
            description: allInputs[2].value,
            sector_uuid: selectSector.value
        }
        Api.registerComps(data)
        Notify.now(true, 5000, 'Empresa cadastrada com sucesso')
        setTimeout(() => {
            allInputs.forEach(element => {
                element.value = '';
                window.location.reload()
            })
        }, 5000)
    }
})

const selecter = document.querySelector('#company')

Api.listedComp().then(res => {
    res.forEach(element => {
        selecter.innerHTML += `<option value="${element.uuid}">${element.name}</option>`
    });
});

allBtn[1].addEventListener('click', () => {
    const allInputs = document.querySelectorAll('input')
    if (allInputs[3].value.length == 0 || allInputs[4].value.length == 0) {
        Notify.now(false, 5000, 'Certifique-se se todos os campos estão preenchidos corretamente!')
    } else {
        const data = {
            name: allInputs[3].value,
            description: allInputs[4].value,
            sector_uuid: selectSector.value
        }
        Api.departmentCreate(data)
        Notify.now(true, 5000, 'Departamento cadastrado com sucesso')
        setTimeout(() => {
            allInputs.forEach(element => {
                element.value = '';
                window.location.reload()
            })
        }, 5000);
    }
})

allBtn[2].addEventListener('click', () => {
    const body = document.querySelector('body')
    const span = document.createElement('span')
    const div = document.createElement('div')
    const nav = document.createElement('nav')
    const h1 = document.createElement('h1')
    const i = document.createElement('i')

    span.id = 'modal'
    div.id = 'modal-content'

    i.className = 'bx bx-x'
    h1.innerText = 'Lista de setores'
    nav.append(h1, i)

    Api.listedSectors().then(res => {
        res.forEach(element => {
            div.innerHTML += `<p id=${element.uuid}>${element.description}</p>`
        })
    })
    div.append(nav)
    span.append(div)
    body.append(span)

    i.addEventListener('click', () => {
        span.remove()
    })
})