let slideCounter = 0;
const sliderItems = Array.from(document.getElementsByClassName('slider__item'));
const sliderDots = Array.from(document.getElementsByClassName('slider__dot'));
sliderDots[slideCounter].className += ' slider__dot_active';

document.querySelector('.slider__arrow_next').onclick = () => {
    if (slideCounter + 1 === sliderItems.length) slideCounter = -1;
    turnActive(slideCounter += 1);
};

document.querySelector('.slider__arrow_prev').onclick = () => {
    if (slideCounter === 0) slideCounter = sliderItems.length;
    turnActive(slideCounter -= 1);
};

sliderDots.forEach((el, idx) => el.onclick = () => {
    slideCounter = idx;
    turnActive();
});

function turnActive(currentCounter = slideCounter) {
    sliderItems.forEach((el, idx) => {
        el.className = 'slider__item';
        sliderDots[idx].className = 'slider__dot';
    });
    sliderItems[currentCounter].className += ' slider__item_active';
    sliderDots[currentCounter].className += ' slider__dot_active';
};

