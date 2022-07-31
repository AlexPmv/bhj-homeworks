const signinBox = document.getElementById('signin');
const loginForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const logoutBtn = document.getElementById('logout_btn');

const xhr = new XMLHttpRequest;


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(loginForm);
    xhr.open('POST', loginForm.action);
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = xhr.response;
            if (!response.success) {
                alert('Не верный логин/пароль')
            } else if (response.success) {
                localStorage.userId = response.user_id;
                loginUser();
            };
        } else if (xhr.readyState === xhr.DONE && !xhr.status === 200) {
            alert(`Ошибка: ${xhr.status} ${xhr.statusText}`);
        };
    };
    
    xhr.send(form);
    Array.from(loginForm.querySelectorAll('.control')).forEach((item) => item.value = '');
});

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    loginUser();
});

function loginUser() {
    if (!localStorage.userId) {
        userId.textContent = '';
        welcome.classList.remove('welcome_active');
        signinBox.classList.add('signin_active');
    } else {
        welcome.classList.add('welcome_active');
        signinBox.classList.remove('signin_active');
        userId.textContent = localStorage.userId;
    };
};

loginUser();
