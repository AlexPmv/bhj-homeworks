const products = document.querySelector('.products');
const cart = document.querySelector('.cart');
const cartBox = document.querySelector('.cart__products');

class cartObject {
    constructor (productId, imgSrc, quantityValue) {
        this.productId = productId;
        this.imgSrc = imgSrc;
        this.quantityValue = quantityValue;
    };
};

products.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('product__quantity-control')) {
        quantityControlCalc(target);
    };

    if (target.classList.contains('product__add')) {
        addToCart(target);
        checkCartforProduct();
    };
});

cart.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.classList.contains('cart__product-remove')) {
        const parentBox = target.closest('.cart__product');
        localStorage.removeItem(`id_${parentBox.dataset.id}`);
        parentBox.remove();
        checkCartforProduct();
    };
});
        

function quantityControlCalc(target) {
    let currentQuantityValue = +target.closest('.product__quantity-controls').querySelector('.product__quantity-value').innerText;

    if (target.className === 'product__quantity-control product__quantity-control_inc') {
        target.closest('.product__quantity-controls').querySelector('.product__quantity-value').innerText = ++currentQuantityValue;
    } else if (target.className === 'product__quantity-control product__quantity-control_dec') {
        if (currentQuantityValue === 1) {
            return;
        } else {
            target.closest('.product__quantity-controls').querySelector('.product__quantity-value').innerText = --currentQuantityValue;
        };
    };
};

function addToCart(target) {
    const currentProduct = target.closest('.product');
    const currentProductId = currentProduct.dataset.id;
    const imgSrc = currentProduct.querySelector('img').src;
    const quantityValue = currentProduct.querySelector('.product__quantity-value').innerText;

    if (!checkCartforProduct(currentProductId)) {
        cartBox.innerHTML +=
        ` <div class="cart__product" data-id="${currentProductId}">
            <img class="cart__product-image" src="${imgSrc}">
            <div class="cart__product-count">${quantityValue}</div>
            <a class="cart__product-remove" href="#0">&times;</a>
        </div>`;

        localStorage[`id_${currentProductId}`] = JSON.stringify(new cartObject(currentProductId, imgSrc, quantityValue));

    } else {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = parseFromStorage(`id_${currentProductId}`);

        const currentProductCount = +tempElement.querySelector('.cart__product-count').textContent + 
        +currentProduct.querySelector('.product__quantity-value').textContent;
        
        localStorage[`id_${currentProductId}`] = JSON.stringify(new cartObject(currentProductId, tempElement.querySelector('.cart__product-image').src, currentProductCount));

        Array.from(cartBox.querySelectorAll('.cart__product')).find((productInCard) => 
        productInCard.dataset.id === currentProductId).querySelector('.cart__product-count').innerText = currentProductCount;
        
        imageToCard(target);
    };
};

function checkCartforProduct(id) {
    const keyArray = Object.keys(localStorage).filter((key) => key.includes('id_'));
    
    if (!id) {
        const cartClass = cart.classList;
        if (keyArray.length === 0) {
            cartClass.add('hidden');
            return;
        } else {
            if (cartClass.contains('hidden')) {
                cartClass.remove('hidden');
            };
            return;
        };
    };

    return keyArray.includes(`id_${id}`);
};

function parseFromStorage(key) {
    const currentCardObject = JSON.parse(localStorage[`${key}`]);
    return ` <div class="cart__product" data-id="${currentCardObject.productId}">
                <img class="cart__product-image" src="${currentCardObject.imgSrc}">
                <div class="cart__product-count">${currentCardObject.quantityValue}</div>
                <a class="cart__product-remove" href="#0">&times;</a>
            </div>`;
};

function getCartFromStorage() {
    const keyArray = Object.keys(localStorage).filter((key) => key.includes('id_'));
    keyArray.forEach((key) => {
        cartBox.innerHTML += parseFromStorage(key);
    });
};

function imageToCard(target) {
    const productImg = target.closest('.product').querySelector('.product__image');
    const productImgCoords = productImg.getBoundingClientRect();
    const cartImgCoords = Array.from(cartBox.querySelectorAll('.cart__product')).find((productInCard) => 
    productInCard.dataset.id === target.closest('.product').dataset.id).querySelector('.cart__product-image').getBoundingClientRect();
    const scrollTop = document.querySelector('html').scrollTop;

    let startX = productImgCoords.x;
    let startY = productImgCoords.y + scrollTop;
    const endX = cartImgCoords.x;
    const endY = cartImgCoords.y + scrollTop;
    const intervalTIme = 60 / 1000;
    const duration = 500;
    const stepsCount = duration * intervalTIme;
    const stepForX = (endX - startX) / stepsCount;
    const stepForY = (endY - startY) / stepsCount;
    
    const animatedImg = document.createElement('img');
    animatedImg.className = 'animated-img';
    animatedImg.src = productImg.src;
    animatedImg.style.left = `${startX}px`;
    animatedImg.style.top = `${startY}px`;

    document.querySelector('body').appendChild(animatedImg);

    let requestId = window.requestAnimationFrame(animatedImage);

    function animatedImage() {
        const imgToAnimate = document.querySelector('.animated-img');
        const imgCoords = imgToAnimate.getBoundingClientRect();

        imgToAnimate.style.left = `${startX += stepForX}px`;
        imgToAnimate.style.top = `${startY += stepForY}px`;

        if (imgCoords.x >= endX) {
            cancelAnimationFrame(requestId);
            imgToAnimate.remove();
            return;
        } else {
            window.requestAnimationFrame(animatedImage);
        };

        
    };

    // return animatedImage;
};

getCartFromStorage();

checkCartforProduct();