const loader = document.querySelector('.loader');
const cardBox = document.getElementById('items');
const xhr = new XMLHttpRequest;

function addValuteToLayout(valute, value) {
    const itemBox = document.createElement('div');
    itemBox.className = 'item';

    const itemCode = document.createElement('div');
    itemCode.className = 'item__code';
    itemCode.textContent = valute;
    itemBox.appendChild(itemCode);

    const itemValue = document.createElement('div');
    itemValue.className = 'item__value';
    itemValue.textContent = value;
    itemBox.insertBefore(itemValue, itemBox.firstChild);

    const itemCurrency = document.createElement('div');
    itemCurrency.className = 'item__currency';
    itemCurrency.textContent = 'руб.';
    itemBox.insertBefore(itemCurrency, itemBox.firstChild);
 
    cardBox.appendChild(itemBox);
};

if (localStorage['valutes']) {
    const valutes = JSON.parse(localStorage['valutes']);

    for (const valute in valutes) {
        addValuteToLayout(valute, valutes[valute]);
    };
};

xhr.open('POST', 'https://netology-slow-rest.herokuapp.com');
xhr.responseType = 'json';
xhr.loa

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            loader.classList.remove('loader_active');

            const valutes = xhr.response.response.Valute;
            const valuteObj = {};

            for (const valute in valutes) {
                const value = valutes[valute].Value;
                valuteObj[valute] = value;

                addValuteToLayout(valute, value);
            };

            localStorage['valutes'] = JSON.stringify(valuteObj);
        } else {
            alert(`Что-то пошло не так, ошибка: ${xhr.status} "${xhr.statusText}"`);
        };
    }; 
});

xhr.send();