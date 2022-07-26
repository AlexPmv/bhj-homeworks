const loader = document.querySelector('.loader');
const cardBox = document.getElementById('items');
const xhr = new XMLHttpRequest;

function addValuteToLayout(valute, value) {
    cardBox.innerHTML += 
            `<div class="item">
                <div class="item__code">
                    ${valute}
                    </div>
                    <div class="item__value">
                    ${value}
                    </div>
                    <div class="item__currency">
                        руб.
                    </div>
            </div>`
};

if (localStorage['valutes']) {
    const valutes = JSON.parse(localStorage['valutes']);

    for (const valute in valutes) {
        addValuteToLayout(valute, valutes[valute]);
    };
};

xhr.open('POST', 'https://netology-slow-rest.herokuapp.com');

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        loader.classList.remove('loader_active');

        const valutes = JSON.parse(xhr.responseText).response.Valute;
        const valuteObj = {};

        for (const valute in valutes) {
            const value = valutes[valute].Value;
            valuteObj[valute] = value;

            addValuteToLayout(valute, value);
        };

        localStorage['valutes'] = JSON.stringify(valuteObj);
    };
});

xhr.send();