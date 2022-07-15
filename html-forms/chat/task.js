const widget = document.querySelector('.chat-widget');
const chatWindow = document.querySelector('.chat-widget__messages-container')
const messages = document.querySelector('.chat-widget__messages');
const input = document.querySelector('.chat-widget__input');
const robotMessages = ['Мы Вас не ждали!', 'Да зачем оно Вам надо?', 'Не хочу, не буду', 'Ой, все', 'Я Вам ничего не скажу!'];
let currentDate = new Date();
let chatBotTimeout;

function currentDateforChat(currentDate) {
    function checkTimeLength(time) {
        if (time.toString().length === 1) {
            return '0' + time.toString();
        }

        return time;
    };
    return `${checkTimeLength(currentDate.getHours())}:${checkTimeLength(currentDate.getMinutes())}`;
};

function scrollChatWindow() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
};

function runChatBotTimeout() {
    if (chatBotTimeout) {clearTimeout(chatBotTimeout)};

    chatBotTimeout = setTimeout(() => {
        if (widget.classList.contains('chat-widget_active')) {
            currentDate = new Date();
            messages.innerHTML += 
            `<div class="message">
                <div class="message__time">${currentDateforChat(currentDate)}</div>
                <div class="message__text">Вам еще что-то нужно?</div>
            </div>`;

            scrollChatWindow();
        };
    }, 30000);
}

widget.addEventListener('click', (event) => {
    event.currentTarget.classList.add('chat-widget_active');
});

input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        if (event.currentTarget.checkValidity()) {
            currentDate = new Date();
            messages.innerHTML += 
            `<div class="message message_client">
                <div class="message__time">${currentDateforChat(currentDate)}</div>
                <div class="message__text">
                ${event.currentTarget.value}
                </div>
            </div>`;
            event.currentTarget.value = '';

            currentDate = new Date();
            messages.innerHTML += 
            `<div class="message">
                <div class="message__time">${currentDateforChat(currentDate)}</div>
                <div class="message__text">${robotMessages[Math.trunc(Math.random() * robotMessages.length)]}</div>
            </div>`;

            scrollChatWindow();

            runChatBotTimeout();
        } else {
            alert('Нельзя отправить пустое сообщение!');
        };
    };
});