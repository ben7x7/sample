class Memory {
  constructor(totalTime, cards) {
    this.totalTime = totalTime;
    this.cardsArray = cards;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
  }

  startMemoryGame() {
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  hideCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove('appear');
      card.classList.remove('matched');
    });
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i+1));
      this.cardsArray[randomIndex].style.order = i;
      this.cardsArray[i].style.order = randomIndex;
    }
  }


  flipCard(card) {
    if(this.canFlipCard(card)) {
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add('appear');

      if(this.cardToCheck)
        this.checkForCardMatch(card);
      else
        this.cardToCheck = card;
    }
  }

  canFlipCard(card) {
    return !this.busy || !this.matchedCards.includes(card) || card !== cardToCheck;
  }

  checkForCardMatch(card) {
    if(this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else
      this.cardMisMatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    if(this.matchedCards.length === this.cardsArray.length)
      this.victory();
  }

  cardMisMatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('appear');
      card2.classList.remove('appear');
      this.busy = false;
    }, 1000);
  }

  getCardType(card) {
    return card.getElementsByClassName('card-value')[0].src;
  }

  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if(this.timeRemaining === 0)
        this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countDown);
    document.getElementById('game-over-text').classList.add('visible');
  }

  victory() {
    clearInterval(this.countDown);
    document.getElementById('victory-text').classList.add('visible');
  }
}



const playMemory = () => {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let cards = Array.from(document.getElementsByClassName('card'));
  let game = new Memory(100, cards);

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      game.startMemoryGame();
    });
  });


  cards.forEach(card => {
    card.addEventListener('click', () => {
      // card.classList.add('matched');
      // this.matchedCards.push('card');
      game.flipCard(card);
    });
  });
}

export { playMemory };

