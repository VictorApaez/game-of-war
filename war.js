class War {
  constructor() {
    this.stackOne = [];
    this.stackTwo = [];
    this.playingCards = [];
    this.currentCardsOne = [];
    this.currentCardsTwo = [];
    this.rounds = 1;
  }
  createCards() {
    for (let i = 2; i < 15; i++) {
      for (let j = 0; j < 4; j++) {
        this.playingCards.push(i);
      }
    }
  }
  shuffleCards() {
    //The Fisher-Yates algorithm to shuffle the playingCards array
    for (let i = this.playingCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playingCards[i], this.playingCards[j]] = [
        this.playingCards[j],
        this.playingCards[i],
      ];
    }
  }
  divideCards() {
    this.stackOne = this.playingCards.splice(0, 26);
    this.stackTwo = this.playingCards;
  }
  draw() {
    this.currentCardsOne.push(this.stackOne.pop());
    this.currentCardsTwo.push(this.stackTwo.pop());
  }
  compareCards(player1Card, player2Card) {
    if (player1Card === player2Card) {
      if (this.stackOne.length > 4 && this.stackTwo.length > 4) {
        // START WAR
        this.draw();
        this.draw();
        this.draw();
        this.draw();
        console.log("******** WAR!!! ********");
        console.log("player1: " + this.currentCardsOne.at(-1));
        console.log("player2: " + this.currentCardsTwo.at(-1));
        // COMPARE AGAIN - RECURSIVE CALL
        this.compareCards(
          this.currentCardsOne.at(-1),
          this.currentCardsTwo.at(-1)
        );
      } else if (this.stackOne.length <= 4) {
        // PLAYER 2 WINS
        this.stackTwo.unshift(...this.stackOne);
        this.stackOne = [];
        console.log("     ********** PLAYER 2 WINS **********");
      } else {
        // PLAYER 1 WINS
        this.stackOne.unshift(...this.stackTwo);
        this.stackTwo = [];
        console.log("     ********** PLAYER 1 WINS **********");
      }
    } else if (player1Card > player2Card) {
      this.rounds += 1;
      this.stackOne.unshift(...this.currentCardsOne);
      this.stackOne.unshift(...this.currentCardsTwo);
      this.currentCardsOne = [];
      this.currentCardsTwo = [];
    } else {
      this.rounds += 1;
      this.stackTwo.unshift(...this.currentCardsTwo);
      this.stackTwo.unshift(...this.currentCardsOne);
      this.currentCardsOne = [];
      this.currentCardsTwo = [];
    }
  }
  startRound() {
    this.draw();
    console.log(
      "=================== Round " + this.rounds + " ======================"
    );
    console.log("Player1 card: " + this.currentCardsOne.at(-1));
    console.log("Player2 card: " + this.currentCardsTwo.at(-1));
    this.compareCards(this.currentCardsOne.at(-1), this.currentCardsTwo.at(-1));
    console.log("Player1 stack: " + this.stackOne);
    console.log("Player2 stack: " + this.stackTwo);
    console.log(" ");
    console.log(" ");
  }
  setGame() {
    this.createCards();
    this.shuffleCards();
    this.divideCards();
    console.log("Player1 stack: " + this.stackOne);
    console.log("Player2 stack: " + this.stackTwo);
    while (this.stackOne.length > 0 && this.stackTwo.length > 0) {
      this.startRound();
    }
  }
}

let war = new War();
war.setGame();
