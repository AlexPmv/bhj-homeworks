

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.countdownElement = container.querySelector('.status__countdown');
    
    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  startTimer() {
    this.countdownElement.textContent = this.timerCountdown;
    this.timeout = setTimeout(() => this.fail(), this.timerCountdown * 1000);
    this.interval = setInterval(() => --this.countdownElement.textContent, 1000);
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
     */
    document.addEventListener('keyup', (event) => {
      this.currentSymbol.textContent === event.key ? this.success() : this.fail();
    });
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }
  
  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }

    this.setNewWord();
  }

  setNewWord() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    };

    if (this.interval) {
      clearTimeout(this.interval)
    };

    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;
    
    this.timerCountdown = word.length;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    
    this.startTimer();
  }
}

new Game(document.getElementById('game'));

