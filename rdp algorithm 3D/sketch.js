// inspired by the CodingTrain/Daniel Shiffman
const f = [];
let ps;
let firaFont;

function preload() {
  firaFont = loadFont('FiraCode-Medium.ttf');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  textFont(firaFont);
  textAlign(LEFT, TOP);

  for (let x = 0; x < 400; x++) {
    f.push(createVector(
        sin((TWO_PI * x) / 100) * 100 + noise(x / 5, 0) * (x / 5),
        cos((TWO_PI * x) / 100) * 100 + noise(0, x / 5) * (x / 5),
        x
    ));
  }
}

function draw() {
  background(0);

  // rotate and translate space
  push();
  scale(0.7);
  rotateX(radians(45));
  rotateZ(radians(-45 / 2));
  rotateZ(radians(frameCount / 6));
  translate(0, 0, height / 3);
  translate(0, 0, -300);

  // draw axis and labels
  fill(255);
  textAlign(LEFT, TOP);
  textSize(40);
  stroke(255, 0, 0); line(0, 0, 0, 400, 0, 0); text('x', 120, 0);
  stroke(0, 255, 0); line(0, 0, 0, 0, 400, 0); text('y', 0, 120);
  stroke(0, 0, 255); line(0, 0, 0, 0, 0, 400); translate(0, 0, 400); text('z', 0, 0); translate(0, 0, -400);

  // draw original path in white
  strokeWeight(1);
  stroke(255, 255, 255);
  drawPoly(f);

  // draw approximation using the rgp-algorithm in pink
  strokeWeight(2);
  stroke(255, 0, 255);
  const epsilon = ((frameCount % 1000) / 75) ** 2;
  ps = rgp(f, epsilon);
  drawPoly(ps, true);

  // write text for epsilon and number of points
  pop();
  fill(255);
  text(`Epsilon: ${(epsilon).toFixed(2)};\tNumber of Points: ${ps.length}`, -width / 2, -height / 2);
}

function drawPoly(points = [], shouldDrawPoints = false) {
  noFill();
  beginShape();
  for (const p of points) {
    vertex(p.x, p.y, p.z);
  }
  endShape();

  if (shouldDrawPoints) {
    stroke(255, 0, 0);
    for (const p of points) {
      strokeWeight(10);
      point(p.x, p.y, p.z);
    }
  }
}

function rgp(points = [], epsilon = 0.1) {
  const p1 = points[0];
  const p2 = points[points.length - 1];
  const { index, dist } = furthestPoint(p1, p2, points);

  if (dist > epsilon) {
    return [...rgp(points.slice(0, index + 1), epsilon), ...rgp(points.slice(index).slice(1), epsilon)];
  } else {
    return p1 == p2 ? [p1] : [p1, p2];
  }
}

function furthestPoint(p1, p2, points) {
  let dmax = 0;
  let maxI = -1;
  for (let i = 0; i < points.length; i++) {
    const dtemp = perpendicularDist(points[i], p1, p2);

    if (dtemp > dmax) {
      dmax = dtemp;
      maxI = i;
    }
  }

  return { index: maxI, dist: dmax };
}

function perpendicularDist(p, p1, p2) {
  if (p1 == p || p == p2) return 0;
  const a = p.copy().sub(p1);
  const b = p.copy().sub(p2);
  const c = a.cross(b).mag();
  const d = p2.copy().sub(p1).mag();
  return c / d;
}
