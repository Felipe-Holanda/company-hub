import { Api } from '../class/Api.js';
import { Notify } from '../class/Notify.js';

const admin = localStorage.getItem('@KenzieEmpresas-M2:admin');


if (admin == 'true') {
    Notify.now(true, 2500, 'Cuidado com as alterações que você fizer, pois elas podem afetar o funcionamento do sistema.');
} else {
    Notify.now(false, 5000, 'Você não tem permissão para acessar essa página');
    setTimeout(() => {
        localStorage.clear();
        window.location.href = '../../../auth.html';
    }, 4000)
}

//const selected = document.querySelector('select')

const fetched = Api.listedUsers()
    .then(res => res);


fetched.then(res => {
    res.forEach(element => {
        const wDeps = document.querySelector('#wDeps');
        const noDeps = document.querySelector('#noDeps');

        if (element.department_id == null || element.department_id == 'null') {
            noDeps.innerHTML += `<option value="${element.uuid}">${element.email}</option>`;
        } else {
            wDeps.innerHTML += `<option value="${element.uuid}">${element.email}</option>`;
        }

    });
});

const btn = document.querySelectorAll('#menuSelect button')


btn[0].addEventListener('click', () => {
    const selected = document.querySelector('select').value;
    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input');
    const fetched = Api.listedUsers()
        .then(res => {
            res.forEach(element => {
                if (selected == 0) {
                    Notify.now(false, 2500, 'Selecione um usuário');
                } else if (element.uuid == selected) {
                    inputs[0].value = element.username;
                    inputs[1].value = element.email;
                    inputs[2].value = element.password;
                    selects[1].value = element.professional_level;
                    selects[2].value = element.kind_of_work;
                    inputs[3].value = element.is_admin;
                }
            });
        });
});

btn[1].addEventListener('click', () => {
    const body = document.querySelector('body');
    const span = document.createElement('span');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const ifr = document.createElement('i');
    const nav = document.createElement('nav');
    const selectArr = [document.createElement('select'), document.createElement('select')];
    const btnHire = document.createElement('button');



    const ps = [document.createElement('p'), document.createElement('p')];
    span.id = 'modal';
    div.id = 'modalContent';
    h2.innerText = 'Contratar usuário';
    ifr.className = 'bx bx-x';
    ifr.innerText = ''
    ps[0].innerText = 'Selecione o usuário que deseja contratar';
    selectArr[0].id = 'selectUser';
    selectArr[0].innerHTML = '<option value="null">Selecione um usuário</option>';

    fetched.then(res => {
        res.forEach(element => {
            if (element.department_id == null || element.department_id == 'null') {
                selectArr[0].innerHTML += `<option value="${element.uuid}">${element.email}</option>`;
            }
        });
    })
    ps[1].innerText = 'Selecione o departamento';
    selectArr[1].id = 'selectDep';
    Api.listedDepartament().then(res => {
        res.forEach(element => {
            selectArr[1].innerHTML += `<option value="${element.uuid}">${element.name}</option>`;
        });
    });
    btnHire.innerText = 'Contratar';

    nav.append(h2, ifr);
    div.append(nav, ps[0], selectArr[0], ps[1], selectArr[1], btnHire);
    span.append(div);
    body.append(span);

    ifr.addEventListener('click', () => {
        span.remove();
    });

    btnHire.addEventListener('click', () => {
        if (selectArr[0].value == 'null' || selectArr[1].value == 'null') {
            Notify.now(false, 2500, 'Selecione um usuário e um departamento');
        } else {
            const selectUser = document.querySelector('#selectUser').value;
            const selectDep = document.querySelector('#selectDep').value;
            const dataHire = {
                user_uuid: selectUser,
                department_uuid: selectDep
            }
            Api.hire(dataHire);
            Notify.now(true, 2500, 'Usuário contratado com sucesso');
            setTimeout(() => {
                window.location.reload();
            }, 3500);
        }
    });
});




btn[2].addEventListener('click', () => {
    const selected = document.querySelector('select').value;
    if (selected == 0 || selected == 'null') {
        Notify.now(false, 2500, 'Selecione um usuário');
    } else {

        Api.dismiss(selected)
        Notify.now(true, 2500, 'Usuário demitido com sucesso');
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }
});

btn[3].addEventListener('click', () => {
    const selected = document.querySelector('select').value;
    if (selected == 0 || selected == 'null') {
        Notify.now(false, 2500, 'Selecione um usuário');
    } else {

        Api.fired(selected).then(res => res)
        Notify.now(true, 2500, 'Usuário excluído com sucesso');
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

});


const patchBtn = document.querySelector('#contentMain button')
patchBtn.addEventListener('click', () => {
    const selected = document.querySelector('select').value;
    const selects = document.querySelectorAll('#contentMain select');

    if (selected == 0) {
        Notify.now(false, 2500, 'Selecione um usuário');
    } else {
        if (selects[0].value == 'null' || selects[1].value == 'null') {
            Notify.now(false, 2500, 'Selecione as opções');
        } else {
            const data = {
                kind_of_work: selects[1].value,
                professional_level: selects[0].value
            }
            Api.editedData(selected, data)
            Notify.now(true, 2500, 'Dados alterados com sucesso');
            setTimeout(() => {
                const inputs = document.querySelectorAll('#contentMain input');
                inputs.forEach(element => {
                    element.value = '';
                })
                selects.forEach(element => {
                    element.value = 'null';
                })
                window.location.reload();
            }, 3000);
        }
    }

});