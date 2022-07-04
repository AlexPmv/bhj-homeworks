const sliderItems = Array.from(document.getElementsByClassName('slider__item'));
const sliderDots = Array.from(document.getElementsByClassName('slider__dot'));

function checkActive() {
    let slideCounter = 0;

    function slideCounterSet(action, reset = 0) {
        if (reset === 1) {
            slideCounter = 0;
        }
        slideCounter += action;
    };

    function slideCounterGet() {
        return slideCounter;
    };

    function turnActive(currentCounter = slideCounter) {
        let activeSlide = sliderItems.findIndex((el) => el.className === 'slider__item slider__item_active');
        sliderItems[activeSlide].className = 'slider__item';
        sliderDots[activeSlide].className = 'slider__dot';
    
        sliderItems.findIndex((el) => el.className === 'slider__item slider__item_active')
        sliderItems[currentCounter].className += ' slider__item_active';
        sliderDots[currentCounter].className += ' slider__dot_active';
    };

    return [slideCounterSet, slideCounterGet, turnActive];
};

const [slideCounterSet, slideCounterGet, turnActive] = checkActive();

sliderDots[slideCounterGet()].className += ' slider__dot_active';

document.querySelector('.slider__arrow_next').onclick = () => {
    if (slideCounterGet() + 1 === sliderItems.length) {
        slideCounterSet(-1, 1);
    };
    turnActive(slideCounterSet(1));
};

document.querySelector('.slider__arrow_prev').onclick = () => {
    if (slideCounterGet() === 0) {
        slideCounterSet(sliderItems.length, 1);
    };
    slideCounterSet(-1);
    turnActive(slideCounterGet());
};

sliderDots.forEach((el, idx) => el.onclick = () => {
    slideCounterSet(idx, 1);
    turnActive();
});





