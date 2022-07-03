const subMenuArray = Array.from(document.getElementsByClassName('menu_sub'));
const menuLink = Array.from(document.querySelectorAll('a[href=""]'));

menuLink.forEach((el) => el.onclick = function () {
    subMenuArray.forEach((el) => el.className = 'menu menu_sub');
    el.closest('.menu__item').querySelector('.menu_sub').className += ' menu_active';
    return false;
});