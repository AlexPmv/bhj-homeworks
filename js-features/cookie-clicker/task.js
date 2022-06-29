"use strict";

const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');
const clickSpeed = document.getElementById('click_speed');
let countdownDate = 0;

cookie.onclick = () => {
    clickerCounter.textContent++;
    clickSpeed.textContent = (countdownDate === 0) ? '1' : (1000 / (Date.now() - countdownDate)).toFixed(2);
    if (+clickerCounter.textContent % 2 !== 0) {
        cookie.width = 250;
    } else {
        cookie.width = 200;
    };
    countdownDate = Date.now();
};