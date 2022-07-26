const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest;

    xhr.open('POST', form.action);

    xhr.onprogress = (e) => {
        progress.value = (e.loaded / (10 ** 8));
    };

    xhr.onloadend = () => {
        progress.value = 1;
        setTimeout(() => {
            alert('Загрузка завершена');
        }, 500);
    }

    xhr.send(formData);
});

