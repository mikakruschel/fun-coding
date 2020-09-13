let hangman;
const wornikUrl = 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=7&maxLength=7&api_key=ac7d2c9c88e803fa4c12930cd2b025479691544d38f170946';

function preload() {
  loadJSON(wornikUrl, gotData);
}

function gotData(data) {
  hangman = new Hangman(data.word);
}

function setup() {
  createCanvas(310, 480);
  ellipseMode(CORNER, CORNER);
  textFont('Courier');
  frameRate(12);
}

function draw() {
  background(255);

  for (let i = 0; i < (drawing.length - hangman.guessesLeft); i++) {
    for (const obj of drawing[i]) {
      if (obj.kreis) {
        ellipse(obj.x, obj.y, obj.b, obj.h);
      } else {
        line(obj.x, obj.y, obj.x + obj.b, obj.y + obj.h);
      }
    }
  }

  textSize(60);
  textAlign(RIGHT);
  text(hangman.guessesLeft, 247, 300);

  textAlign(CENTER);
  textSize(50);
  text(hangman.corredGuesses.join(''), width / 2, 375);

  textAlign(CENTER);
  textSize(20);
  text(hangman.wrongGuesses.join(',').replace(/(\S{22})/g, '$1 '), 20, 397, width - 40, 83);
}

function keyPressed() {
  hangman.guess(key);
}
