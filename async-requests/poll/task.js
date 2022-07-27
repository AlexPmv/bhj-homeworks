const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const xhr = new XMLHttpRequest;
xhr.responseType = 'json';

function setXhrSettings(metod, url, requestHeader = 'Content-type', contentType = '') {
    xhr.open(metod, url);
    xhr.setRequestHeader(requestHeader, contentType);
};

pollAnswers.addEventListener('click', (e) => {
    if (e.target.className === 'poll__answer') {
        alert('Спасибо, ваш голос засчитан!');

        setXhrSettings('POST', 'https://netology-slow-rest.herokuapp.com/poll.php', 'Content-type', 'application/x-www-form-urlencoded');
  
        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    const votesArray = xhr.response.stat;
                    pollAnswers.innerHTML = '';

                    const totalVotesInOnePercent = votesArray.reduce((acc, item) => {
                        acc += item.votes;
                        return acc;
                    }, 0) / 100;

                    votesArray.forEach((item) => {
                        const itemVotes = document.createElement('p');
                        itemVotes.className = 'item_votes';
                        itemVotes.textContent = item.answer;

                        const percentBold = document.createElement('b');
                        percentBold.textContent = `: ${(item.votes / totalVotesInOnePercent).toFixed(2)}%`;
                        itemVotes.appendChild(percentBold);

                        pollAnswers.appendChild(itemVotes);
                    });
                } else {
                    alert(`Что-то пошло не так, ошибка: ${xhr.status} "${xhr.statusText}"`);
                };
            };
        };  

        xhr.send(`vote=${e.target.dataset.id}&answer=${e.target.dataset.answer}`);

        setTimeout(getNewQuestion, 5000);
    };
});   

function getNewQuestion() {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                const response = xhr.response;
                const answers = response.data.answers;
    
                pollAnswers.innerHTML = '';
    
                pollTitle.innerText = response.data.title;
                answers.forEach((answer) => {
                        const pollAnswer = document.createElement('button');
                        pollAnswer.className = 'poll__answer';
                        pollAnswer.dataset.id = response.id;
                        pollAnswer.dataset.answer = answers.indexOf(answer);
                        pollAnswer.textContent = answer;
    
                        pollAnswers.appendChild(pollAnswer);
                });
            } else {
                alert(`Что-то пошло не так, ошибка: ${xhr.status} "${xhr.statusText}"`);
            };
        };
    }; 

    setXhrSettings('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
    
    xhr.send();
};

getNewQuestion();