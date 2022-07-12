const fontControlBlock = document.querySelector('.book__control_font-size');
const fontControlLinks = Array.from(document.querySelector('.book__control_font-size').querySelectorAll('.font-size'));
const content = document.querySelector('.book__content');

fontControlBlock.addEventListener('click', function(event) {
    fontControlLinks.find((link) => link.classList.contains('font-size_active')).classList.toggle('font-size_active');
    event.target.classList.toggle('font-size_active');
    content.className = 'book__content';
    
    if (!event.target.dataset.size) {
        return;
    };

    content.classList.add(`book_fs-${event.target.dataset.size}`);

    event.preventDefault();
});