const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest;

    xhr.open('POST', form.action);

    xhr.upload.onprogress = (e) => {
        progress.value = (e.loaded / (e.total / 1)).toFixed(3);
    };

    xhr.upload.onloadend = () => {
        progress.value = 1;
        setTimeout(() => {
            alert('Загрузка завершена');
        }, 500);
    }

    xhr.send(formData);
});

