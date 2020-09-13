class Bubble {
  constructor(x, y, r, c) {
    this.pos = createVector(x, y);
    this.r = r;
    this.v = 1;
    this.c = c;
  }

  show() {
    ellipseMode(CENTER);
    fill(this.c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  applyGravity() {
    // F = m*g
    this.v += gravity * 0.005;
    constrain(this.pos.v, 0, 8);
    this.pos.y += this.v;
  }

  touches(h) {
    let angle = map(h.angle, 0, TWO_PI, 0, 360); // Rad -> Deg
    angle = (((angle + 45) % 90) - 45) / (180 * PI);
    const length = (-h.w * 0.5) / cos(angle);

    return (h.pos.y + length < this.pos.y);
  }
}
