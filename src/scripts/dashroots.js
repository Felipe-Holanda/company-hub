const nav = document.querySelector('#navbar');
const sidebar = document.querySelector('header i');
const span = document.querySelectorAll('#navbar span');
let isAdmin = localStorage.getItem('isAdmin');
let isNavbarOpen = false;

const li = document.querySelectorAll('#navbar li')

const username = localStorage.getItem('@KenzieEmpresas-M2:username')
const uuid = localStorage.getItem('@KenzieEmpresas-M2:uiid')

if (username == null || username == undefined || username == 'null' || username == 'undefined') {

} else {
    document.querySelector('#navbar span').innerText = `, ${username}`
}


if (uuid == null || uuid == undefined) {
    alert('Você não está logado')
    window.location.href = './auth.html';
}

li[0].addEventListener('click', (e) => {
    if (window.location.pathname == '/dashboard') {
        home()
    } else {
        window.location.href = './dashboard.html'
    }
});

li[1].addEventListener('click', (e) => {
    if (window.location.pathname == '/dashboard' || window.location.pathname == '/dashboard.html') {
        window.location.href = './profile.html';
    } else {
        alert('Você já está aqui...')
    }
})

li[2].addEventListener('click', (e) => {
    document.querySelector('section').innerHTML = '<center><h1>Você foi desconectado!<br>Redirecionando...</h1></center>';
    localStorage.clear();
    setTimeout(() => {
        window.location.href = './auth.html'
    }, 2000);
})

sidebar.addEventListener('click', () => {
    if (isNavbarOpen) {
        isNavbarOpen = false;
        nav.animate([
            { width: '120px' },
            { width: '42px' }
        ], { duration: 500 });
        setTimeout(() => {
            nav.style.width = '42px';
            span.forEach(element => {
                element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 190 });
                element.style.display = 'none';
            });
        }, 200);
    } else {
        isNavbarOpen = true;
        nav.animate([
            { width: '42px' },
            { width: '120px' }
        ], { duration: 500 });
        setTimeout(() => {
            nav.style.width = '120px';
            span.forEach(element => {
                element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
                element.style.display = 'block';
            });
        }, 400);
    }

})