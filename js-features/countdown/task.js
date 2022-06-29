"use strict";

const timer = document.getElementById('timer');
const link = document.getElementById('hidden_link');
let currentDate = new Date();
currentDate.setHours(0, 0, +timer.textContent, 0);
let currentHours = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
let currentSeconds = currentDate.getSeconds();

function timerFormatted() {
    return `${(('' + currentHours).length === 1) ?  '0' + currentHours: currentHours}:` +
    `${(('' + currentMinutes).length === 1) ?  '0' + currentMinutes: currentMinutes}:` +
    `${(('' + currentSeconds).length === 1) ?  '0' + currentSeconds: currentSeconds}`;
};

timer.textContent = timerFormatted();

let timerInterval = setInterval(() => {
    if (currentSeconds === 0) {
        clearInterval(timerInterval);
        link.click();
        return alert('Вы победили в конкурсе!');
    };
    currentSeconds--;
    timer.textContent = timerFormatted();
}, 1000);