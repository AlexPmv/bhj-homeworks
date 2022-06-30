"use strict";

let scoreCount = document.getElementById('dead');
let faultCount = document.getElementById('lost');
let idIndex = 1;
const idName = 'hole';

function resetGame() {
    scoreCount.textContent = 0;
    faultCount.textContent = 0;
};

while (document.getElementById(idName + idIndex) !== null) {
    document.getElementById(idName + idIndex).onclick = function() {
        this.className === 'hole hole_has-mole' ? scoreCount.textContent++ : faultCount.textContent++;
        if (+scoreCount.textContent === 10) {
            alert('Вы победили!');
            resetGame();
        } else if (+faultCount.textContent === 5) {
            alert('Вы проиграли!');
            resetGame();
        };

    };
    idIndex++;
};