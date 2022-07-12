rotateRotators();

function rotateRotators() {
    const rotators = Array.from(document.getElementsByClassName('rotator'));
    const rotatorsArray = [];

    class RotatorObj {
        constructor(rotatorBlock) {
            this.rotatorBlock = Array.from(rotatorBlock.querySelectorAll('.rotator__case'));
            this.activeRotatorCaseIndex;
            this.interval;
            
            this.checkRotate();
        };

        checkRotate() {
            if (this.interval) {
                clearInterval(this.interval);
            };

            this.activeRotatorCaseIndex = this.rotatorBlock.findIndex((item) => item.classList.contains('rotator__case_active'));
            this.rotatorBlock[this.activeRotatorCaseIndex].style.color = this.rotatorBlock[this.activeRotatorCaseIndex].dataset.color;
            this.interval = setInterval(this.makeRotate.bind(this), this.rotatorBlock[this.activeRotatorCaseIndex].dataset.speed);

        };

        makeRotate() {
            this.rotatorBlock[this.activeRotatorCaseIndex].classList.toggle('rotator__case_active');

            if (this.activeRotatorCaseIndex === this.rotatorBlock.length - 1) {
                this.activeRotatorCaseIndex = -1;
            };
            
            this.rotatorBlock[++this.activeRotatorCaseIndex].classList.toggle('rotator__case_active');

            this.checkRotate();
        }; 

    };

    rotators.forEach((rotatorBlock) => {
        rotatorsArray.push(new RotatorObj(rotatorBlock));
    });
};