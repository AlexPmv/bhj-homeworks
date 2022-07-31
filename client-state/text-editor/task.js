const textarea = document.getElementById('editor');
const clearButton = document.getElementById('btn-clear');

textarea.addEventListener('keyup', (e) => {
        checkStorage();
        localStorage.text = textarea.value;
});

clearButton.addEventListener('click', () => {
    textarea.value = '';
    localStorage.clear();
});

function getTextFromStorage() {
    checkStorage();
    textarea.value = localStorage.text;
};

function checkStorage() {
    if (!localStorage.text) {
        localStorage.text = '';
    };
};

getTextFromStorage();