import { Notify } from "./class/Notify.js";
import { Api } from "./class/Api.js";

if (window.location.pathname === "/auth.html" || window.location.pathname === "/auth") {

    const authBtn = document.querySelectorAll('form button');

    authBtn[0].addEventListener('click', (e) => {
        e.preventDefault();
        const data = document.querySelectorAll('#login input')
        if (data[0].value === "" || data[1].value === "") {
            Notify.now(false, 5000, "Preencha todos os campos");
            data[0].style.border = "1px solid red";
            data[1].style.border = "1px solid red";
        } else {
            const dice = {
                email: data[0].value,
                password: data[1].value
            }
            try {
                Api.loginPages(dice);
            } catch (err) {
                Notify.now(false, 5000, err);
            }
        }

    })

    authBtn[1].addEventListener('click', (e) => {
        e.preventDefault();
        const data = document.querySelectorAll('#register input');
        data.forEach(element => {
            if (element.value === "") {
                Notify.now(false, 5000, "Preencha todos os campos");
                element.style.border = "1px solid red";
            } else {
                const username = data[0].value;
                const email = data[1].value;
                if (data[2].value !== data[3].value) {
                    Notify.now(false, 5000, "As senhas não coincidem");
                    data[2].style.border = "1px solid red";
                    data[3].style.border = "1px solid red";
                } else {
                    const password = data[2].value;
                    const profession = data[4].value;
                    const dice = {
                        'password': password,
                        'email': email,
                        'professional_level': profession,
                        'username': username
                    };
                    try {
                        Api.newRegister(dice);
                    } catch (err) {
                        Notify.now(false, 5000, err);
                    }
                }
            }
        });
    })
} else if (window.location.pathname === "/dashboard.html" || window.location.pathname === "/dashboard") {

    try {
        const response = Api.profile()
        response.then((data) => { localStorage.setItem("@KenzieEmpresas-M2:username", data.username) });
    } catch (err) {
        Notify.now(false, 5000, err)
    }

} else if (window.location.pathname === "/profile.html" || window.location.pathname === "/profile") {

    try {
        const response = Api.profile()
        console.log(response)
        response.then((data) => {
            const profile = document.querySelectorAll('input');
            profile[0].value = data.username;
            profile[1].value = data.email;
            localStorage.setItem("@KenzieEmpresas-M2:username", data.username)
        })
    } catch (err) {
        Notify.now(false, 5000, err)
    }

    document.querySelectorAll('button')[0].addEventListener('click', (e) => {
        e.preventDefault();
        const data = document.querySelectorAll('input');
        if (data[2].length == 0 || data[3].length == 0) {
            Notify.now(false, 5000, "Preencha todos os campos");
        } else {
            const dice = {
                username: data[0].value,
                email: data[1].value,
                password: data[2].value
            }
            try {
                Api.editData(dice);
            } catch (err) {
                Notify.now(false, 5000, err)
            }
        }
    });

    document.querySelectorAll('button')[1].addEventListener('click', (e) => {
        const adm = localStorage.getItem("@KenzieEmpresas-M2:admin");
        if (adm == "true") {
            Notify.now(NaN, 5000, "Esta página não está disponível para administradores");
        } else {
            const inputs = document.querySelectorAll('section input');
            inputs.forEach(input => {
                input.disabled = false;
            })
            document.querySelectorAll('button')[0].disabled = false;
        }
    });

}