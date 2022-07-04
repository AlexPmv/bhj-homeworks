const menuList = Array.from(document.querySelectorAll('.menu.menu_main'));
menuList.forEach((menuItem, menuIdx) => {
    Array.from(menuItem.querySelectorAll('a[href=""]')).forEach((item, itemIdx) => item.onclick = () => {
        activateMenu(item, itemIdx, menuIdx);
        return false;
    })
})

function chechFlag() {
   
let flagArray = [];
class flagObj {
    constructor(item, itemIdx, menuIdx) {
        this.item = item;
        this.itemIdx = itemIdx;
        this.menuIdx = menuIdx;
        this.flag = 0;
    };
};

    function activateMenu(item, itemIdx, menuIdx) {
        let currentFlagObj = flagArray.find((el) => el.menuIdx === menuIdx);
        if (!currentFlagObj) {
            flagArray.push(new flagObj(item, itemIdx, menuIdx));
            currentFlagObj = flagArray.find((el) => el.menuIdx === menuIdx);
        };

        closeMenu(menuIdx);

        if (currentFlagObj.flag === 1) {
            currentFlagObj.flag = 0;

            if (currentFlagObj.itemIdx !== itemIdx) {
                activateMenu(item, itemIdx, menuIdx);
            };
            
            return;
        };

        if (currentFlagObj.flag === 0) {
            if (currentFlagObj.item !== item) {
                currentFlagObj.item = item;
            };

            if (currentFlagObj.itemIdx !== itemIdx) {
                currentFlagObj.itemIdx = itemIdx;
            };

            currentFlagObj.item.closest('.menu__item').querySelector('.menu_sub').className += ' menu_active';
            currentFlagObj.flag++;
        };
    };

    return activateMenu;
};

function closeMenu(menuIdx) {
    Array.from(menuList[menuIdx].querySelectorAll('.menu.menu_sub')).forEach((item) => item.className = 'menu menu_sub');
}

const activateMenu = chechFlag();
