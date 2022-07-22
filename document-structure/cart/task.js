const products = document.querySelector('.products');
const cart = document.querySelector('.cart');
const cartBox = document.querySelector('.cart__products');

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

    if (!checkCartforProduct(currentProductId)) {
        const productToCart = 
        ` <div class="cart__product" data-id="${currentProductId}">
            <img class="cart__product-image" src="${currentProduct.querySelector('img').src}">
            <div class="cart__product-count">${currentProduct.querySelector('.product__quantity-value').innerText}</div>
            <a class="cart__product-remove" href="#0">&times;</a>
        </div>`;

        cartBox.innerHTML += productToCart;
        localStorage[`id_${currentProductId}`] = productToCart;
    } else {

        const tempElement = document.createElement('div');
        tempElement.innerHTML = localStorage[`id_${currentProductId}`];

        const currentProductCount = +tempElement.querySelector('.cart__product-count').textContent + 
        +currentProduct.querySelector('.product__quantity-value').textContent;
        
        tempElement.querySelector('.cart__product-count').textContent = currentProductCount;
        localStorage[`id_${currentProductId}`] = tempElement.innerHTML;

        Array.from(cartBox.querySelectorAll('.cart__product')).find((productInCard) => 
        productInCard.dataset.id === currentProductId).querySelector('.cart__product-count').innerText = currentProductCount;
        
        imageToCard(target);
    };
};

function checkCartforProduct(id) {
    const keyArray = Object.keys(localStorage);
    
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

function getCartFromStorage() {
    const keyArray = Object.keys(localStorage);
    keyArray.forEach((item) => {
        cartBox.innerHTML += localStorage[`${item}`];
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

    let interval = setInterval(animatedImage, intervalTIme);

    function animatedImage() {
        const imgToAnimate = document.querySelector('.animated-img');
        const imgCoords = imgToAnimate.getBoundingClientRect();

        if (imgCoords.x >= endX) {
            clearInterval(interval);
            imgToAnimate.remove();
            return;
        };

        imgToAnimate.style.left = `${startX += stepForX}px`;
        imgToAnimate.style.top = `${startY += stepForY}px`;
    };

    return animatedImage;
};

getCartFromStorage();

checkCartforProduct();