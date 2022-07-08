const tabs = Array.from(document.querySelector('.tab__navigation').getElementsByTagName('div'));
const tabsContent = Array.from(document.querySelector('.tab__contents').querySelectorAll('.tab__content'));

function deactivateTabs(tabIndex) {
    tabs[tabIndex].classList.toggle('tab_active');
    tabsContent[tabIndex].classList.toggle('tab__content_active');
};

tabs.forEach((item, idx) => {
    item.addEventListener('click', (event) => {
        let currentTabIndex = tabs.findIndex((item) => item.classList.contains('tab_active'));
        deactivateTabs(currentTabIndex);
        event.target.classList.toggle('tab_active');
        tabsContent[idx].classList.toggle('tab__content_active');
    });
});