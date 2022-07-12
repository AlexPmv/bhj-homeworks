const revealArray = Array.from(document.querySelectorAll('.reveal'));

function checkVisibility(element) {
    let {top, bottom} = element.getBoundingClientRect();
    
    console.log('top: ' + top, 'bottom: ' + bottom, window.innerHeight);
    if (top > 0 && bottom < window.innerHeight) {
        if (element.classList.contains('reveal_active')) {
            return;
        };

        element.classList.add('reveal_active');
        return;
    };
    
    if (element.classList.contains('reveal_active')) {
        element.classList.remove('reveal_active');
    };
};

document.addEventListener('scroll', () => {
    for (let reveal of revealArray) {
        checkVisibility(reveal);
    };
});
