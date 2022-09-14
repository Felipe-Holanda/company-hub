import { Notify } from "./class/Notify.js";
import { Api } from "./class/Api.js";

function adminHome() {
    const place = document.querySelector('section');
    place.innerHTML = '';
    const divs = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
    const i = [document.createElement('i'), document.createElement('i')];
    const span = [document.createElement('span'), document.createElement('span')];
    const h3 = [document.createElement('h3'), document.createElement('h3')];
    const p = [document.createElement('p'), document.createElement('p')];

    divs[0].id = 'tiles';
    //Tile 1
    i[0].className = 'bx bx-list-ul'
    h3[0].innerText = 'Usuários'
    p[0].innerText = 'Ferramentas para gerenciar usuários.'
    span[0].append(h3[0], p[0]);
    //Tile 2
    i[1].className = 'bx bx-intersect';
    h3[1].innerText = 'Gerenciar Empresas/Departamentos';
    p[1].innerText = 'Ferramentas para gerenciar empresas/departamentos.'
    span[1].append(h3[1], p[1]);

    divs[1].append(i[0], span[0]);
    divs[2].append(i[1], span[1]);

    divs[0].append(divs[1], divs[2]);
    place.append(divs[0]);

    divs[1].addEventListener('click', () => {
        window.location.href = './src/pages/usersEdit.html';
    });

    divs[2].addEventListener('click', () => {
        window.location.href = './src/pages/companyEdit.html';
    });
}


function home() {
    const isAdmin = localStorage.getItem('@KenzieEmpresas-M2:admin');
    if (isAdmin == 'true') {
        adminHome()
    } else if (isAdmin == 'false') {

        const place = document.querySelector('section');
        place.innerHTML = '';
        const divs = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
        const i = [document.createElement('i'), document.createElement('i')];
        const span = [document.createElement('span'), document.createElement('span')];
        const h3 = [document.createElement('h3'), document.createElement('h3')];
        const p = [document.createElement('p'), document.createElement('p')];

        divs[0].id = 'tiles';
        //Tile 1
        i[0].className = 'bx bx-list-ul'
        h3[0].innerText = 'Listar colegas'
        p[0].innerText = 'Listar colaboradores do mesmo setor que o seu.'
        span[0].append(h3[0], p[0]);
        //Tile 2
        i[1].className = 'bx bx-intersect';
        h3[1].innerText = 'Listar departamentos';
        p[1].innerText = 'Listar departamentos da sua empresa.'
        span[1].append(h3[1], p[1]);

        divs[1].append(i[0], span[0]);
        divs[2].append(i[1], span[1]);

        divs[0].append(divs[1], divs[2]);
        place.append(divs[0]);

        //Separate

        const tiles = document.querySelectorAll('#tiles div');

        tiles[0].addEventListener('click', () => {
            const place = document.querySelector('section');
            const div = document.createElement('div');
            const ul = document.createElement('ul');
            const h1 = document.createElement('h1');

            const fetched = Api.userDepartamentWork();

            fetched.then((data) => {
                h1.innerText = `Colaboradores do setor ${data[0].description}`;
                if (data[0].users.length > 0) {
                    data[0].users.forEach((user) => {
                        ul.innerHTML += `
            <li>
                <p><b>Nome:</b> ${user.username}</p>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Experiência Profissional:</b> ${user.professional_level}</p>
            </li>
            `
                    });
                } else {
                    h1.innerText = `Não há outros colaboradores no setor ${data[0].description}`;
                }



            })


            div.id = 'list'
            div.append(ul);
            place.append(h1, div);

        })

        tiles[1].addEventListener('click', () => {
            const place = document.querySelector('section');
            const div = document.createElement('div');
            const ul = document.createElement('ul');
            const h1 = document.createElement('h1');

            h1.innerText = 'Colaboradores do mesmo setor que você';

            const fetched = Api.departamentCompany();

            if (fetched.length > 0) {
                fetched.users.forEach(element => {
                    ul.innerHTML += `
            <li>
                <p><b>Nome:</b> ${element.name}</p>
                <p><b>Email:</b> ${element.description}</p>
            </li>
            `
                })
            } else {
                h1.innerText = 'Não há departamentos cadastrados na sua empresa.';

            }

            div.id = 'list'
            div.append(ul);
            place.append(h1, div);


        })

    } else {
        Notify.now(NaN, 5000, 'Ocorreu um erro ao resgatar informações, você será redirecionado ao login novamente.');
        setTimeout(() => {
            localStorage.clear();
            window.location.href = './auth.html';
        }, 3000);
    }



}



home()