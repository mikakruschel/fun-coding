let bubble;
let obstacles;

let gravity;
let colors = [];
const r = 30;

let pressed;

let score;
let scoreP;

function setup() {
  createCanvas(windowWidth, windowHeight * 0.8);
  background(51);

  gravity = 9.81;

  colors = shuffle([color('#2ecc71'), color('#3498db'), color('#f1c40f'), color('#e74c3c')]);

  bubble = new Bubble(width / 2, -r, r, random(colors));
  obstacles = new Obstacles(width / 2, height * (4 / 5), colors, 125);

  scoreP = createP();
  score = 0;
}

function draw() {
  background(51);

  bubble.applyGravity();
  bubble.show();

  if (pressed) obstacles.rotate(PI / 40);
  else obstacles.rotate(PI / 200);

  obstacles.show();

  if (bubble.touches(obstacles)) {
    if (bubble.c == obstacles.getColor()) {
      if (bubble.pos.y > obstacles.pos.y) {
        score += 1;
        gravity += 0.2;
        constrain(gravity, 12);
        bubble = new Bubble(width / 2, -r, r, random(colors));
      }
    } else if (bubble.pos.y > obstacles.pos.y) {
      scoreP.html('Restart');
      score = 0;
      gravity = 9.81;
      bubble = new Bubble(width / 2, -r, r, random(colors));
    }
  }

  if (scoreP.html() != 'Restart' || score > 0) {
    scoreP.html(score);
  }
}

function mousePressed() {
  pressed = true;
}

function mouseReleased() {
  pressed = false;
}

function keyPressed() {
  if (key == ' ') pressed = true;
}

function keyReleased() {
  if (key == ' ') pressed = false;
}
