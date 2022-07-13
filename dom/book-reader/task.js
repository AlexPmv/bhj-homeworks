const sizeControlBlock = document.querySelector('.book__control_font-size');
const colorControlBlock = document.querySelector('.book__control_color');
const backgroundControlBlock = document.querySelector('.book__control_background');

const sizeControlButtons = Array.from(sizeControlBlock.querySelectorAll('a.font-size'));
const colorControlButtons = Array.from(colorControlBlock.querySelectorAll('a.color'));
const backgroundControlButtons = Array.from(backgroundControlBlock.querySelectorAll('a.color'));

const content = document.querySelector('.book__content');
const book = document.querySelector('.book');

sizeControlBlock.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.tagName === 'A') {
        sizeControlButtons.find((link) => link.classList.contains('font-size_active')).classList.toggle('font-size_active');
        event.target.classList.toggle('font-size_active');
    };  

    content.className = 'book__content';
    
    if (!event.target.dataset.size) {
        return;
    };

    content.classList.add(`book_fs-${event.target.dataset.size}`);
});

colorControlBlock.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.tagName === 'A') {
        colorControlButtons.find((link) => link.classList.contains('color_active')).classList.toggle('color_active');
        event.target.classList.toggle('color_active');
        content.style.color = event.target.dataset.textColor;
    };
});

backgroundControlBlock.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.tagName === 'A') {
        backgroundControlButtons.find((link) => link.classList.contains('color_active')).classList.toggle('color_active');
        event.target.classList.toggle('color_active');
        book.style.background = event.target.dataset.bgColor;
    };
});