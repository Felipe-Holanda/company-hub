import { Notify } from "./class/Notify.js";
import { Api } from "./class/Api.js";

document.querySelector('button').addEventListener('click', function (e) {



    const body = document.querySelector('body');
    const span = document.createElement('span');
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    const i = document.createElement('i');
    const nav = document.createElement('nav');


    span.id = 'modal'

    i.className = 'bx bx-x'
    h1.innerText = 'Empresas que utilizam nossos serviços';


    const listar = Api.listedComp()
    if (listar.length > 0) {
        listar.forEach(element => {
            ul.innerHTML += `
        <li>
        <h3>Skina Lanches</h3>
        <p>Podrao de qualidade</p>
        <a>Abre às: <span>09:00</span></a>
        </li>`
        });
    } else {
        h1.innerText = 'Ninguém se cadastrou ainda, seja você o primeiro!'
    }
    nav.append(h1, i);
    div.append(nav, ul);
    span.append(div);
    body.append(span);

    i.addEventListener('click', function (e) {
        span.remove()
    })
})
