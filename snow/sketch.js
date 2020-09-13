// Inspired by Daniel Shiffman

const snow = [];
const gravity = 9.81;

const flakeImages = [];
let allFlakes;
let flakeSize;

const colorPalette = [];

function preload() {
  allFlakes = loadImage('f32.png', () => {
    for (let x = 0; x < allFlakes.width; x += allFlakes.width / 16) {
      for (let y = 0; y < allFlakes.height; y += allFlakes.height / 16) {
        flakeImages.push(allFlakes.get(x, y, allFlakes.width / 16, allFlakes.width / 16));
      }
    }
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  if (snow.length < 110) {
    const r1 = random(8, 20);
    const r2 = random(8, 20);
    const r = r1 < r2 ? r1 : r2;

    const x = random(-r, width + r);
    const y = random(-r * 15, -r * 5);

    snow.push(new Snowflake(x, y, r * 3, random(flakeImages)));
  }
  for (let i = snow.length - 1; i >= 0; i--) {
    snow[i].show();
    snow[i].applyGravity();

    if (snow[i].offScreen()) {
      snow.splice(i, 1);
    }
  }
}
