let breakout;

function setup() {
  createCanvas(450, 600);
  breakout = new Breakout(450, 600);
}

function draw() {
  background(0);
  breakout.show();
  if (!breakout.dead) {
    breakout.update();
    breakout.collisionDetect();
  }
  if (keyIsDown(37)) breakout.move(-0.3);
  if (keyIsDown(39)) breakout.move(0.3);
}
