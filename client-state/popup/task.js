const modal = document.getElementById('subscribe-modal');
const modalCloseCross = document.querySelector('.modal__close_times');

modalCloseCross.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.cookie = 'modalActive=false';
});

function checkModal(name) {
    const cookieArray = document.cookie.split('; ');

    console.log(cookieArray.find((item) => {
        return item.startsWith(name + '=');
    }))

    if (cookieArray.find((item) => {
        return item.startsWith(name + '=');
    })) {
        modal.classList.remove('modal_active');
    };
};

checkModal('modalActive');
