class Snowflake {
  constructor(sx, sy, sr, img) {
    this.pos = createVector(sx, sy);
    this.r = sr;
    this.v = 0;
    this.img = img;
  }

  show() {
    image(this.img, this.pos.x, this.pos.y, this.r, this.r);
  }

  applyGravity() {
    // F = m*g
    this.v += gravity * map(this.r, 2, 20, 0.16, 1) * 0.005;
    constrain(this.v, 0, 10);
    this.pos.y += this.v;
  }

  offScreen() {
    return (this.pos.y - this.r > height);
  }
}
