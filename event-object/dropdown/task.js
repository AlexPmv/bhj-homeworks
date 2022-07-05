const dropdownBtn = Array.from(document.getElementsByClassName('dropdown__value'));
const dropdownList = Array.from(document.getElementsByClassName('dropdown__list'));

dropdownBtn.forEach((item, idx) => item.addEventListener('click', () => {
    activateList(idx);
}));


dropdownList.forEach((item, idx) => Array.from(item.querySelectorAll('.dropdown__link')).forEach((item) => {
    item.onclick = (event) => {
        dropdownBtn[idx].textContent = event.currentTarget.textContent;
        activateList(idx);
        event.preventDefault();
    };
}));

function checkList() {
    const listArray = [];

    class ListObj {
        constructor(idx) {
            this.idx = idx;
            this.flag = 0;
        };
    };

    function activateList(idx) {
        let currentList = listArray.find((el) => el.idx === idx);
        
        if (!currentList) {
            listArray.push(currentList = new ListObj(idx));
        };

        if (currentList.flag === 1) {
            dropdownList[idx].className = 'dropdown__list';
            currentList.flag = 0;
            return;
        };

        if (currentList.flag === 0) {
            dropdownList[idx].className += ' dropdown__list_active';
            currentList.flag++;
        };

    };

    return activateList;
};

const activateList = checkList();