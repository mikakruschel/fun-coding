class Hangman {
  constructor(word) {
    this.word = word.split('');
    this.corredGuesses = new Array(this.word.length).fill('_');
    this.guessesLeft = 15;
    this.wrongGuesses = [];
  }

  guess(buchstabe) {
    if (this.guessesLeft == 0) return false;
    let geändert = false;
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i].toLowerCase() == buchstabe.toLowerCase()) {
        this.corredGuesses[i] = this.word[i];
        geändert = true;
      }
    }

    if (!geändert && this.wrongGuesses.indexOf(buchstabe.toLowerCase()) == -1) {
      this.guessesLeft -= 1;
      this.wrongGuesses.push(buchstabe.toLowerCase());
    }

    if (this.corredGuesses.join('') == this.word.join('')) {
      console.log('Win!');
    } else if (this.guessesLeft == 0) {
      console.log('Game Over!');
      this.corredGuesses = this.word;
    }

    return geändert;
  }
}
