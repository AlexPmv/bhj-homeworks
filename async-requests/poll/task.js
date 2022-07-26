const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const xhr = new XMLHttpRequest;
const xhrResults = new XMLHttpRequest;

pollAnswers.addEventListener('click', (e) => {
    if (e.target.className === 'poll__answer') {
        alert('Спасибо, ваш голос засчитан!');

        xhrResults.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
        xhrResults.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhrResults.addEventListener('readystatechange', () => {

            if (xhrResults.readyState === xhrResults.DONE) {
                const votesArray = JSON.parse(xhrResults.responseText).stat;
                pollAnswers.innerHTML = '';

                const totalVotesInOnePercent = votesArray.reduce((acc, item) => {
                    acc += item.votes;
                    return acc;
                }, 0) / 100;

                votesArray.forEach((item) => {
                    pollAnswers.innerHTML += 
                    `<p class="item_votes">
                        ${item.answer}: <b>${(item.votes / totalVotesInOnePercent).toFixed(2)}%</b>
                    </p>`
                });
            };
        });  

        xhrResults.send(`vote=${e.target.dataset.id}&answer=${e.target.dataset.answer}`);

        setTimeout(getNewQuestion, 5000);
    };
});

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
       const response = JSON.parse(xhr.responseText);
       const answers = response.data.answers;

       pollAnswers.innerHTML = '';

       pollTitle.innerText = response.data.title;
       answers.forEach((answer) => {
            pollAnswers.innerHTML += `
            <button class="poll__answer" data-id=${response.id} data-answer=${answers.indexOf(answer)}>
                ${answer}
            </button>`
       });
    };
});

function getNewQuestion() {
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    xhr.send();
};

getNewQuestion();