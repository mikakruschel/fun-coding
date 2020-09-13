class Obstacles {
  constructor(x, y, cs, w) {
    this.colors = cs;
    this.w = w;
    this.angle = 0;
    this.pos = createVector(x, y);
  }

  show() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(255, 0, 255);
    rectMode(CENTER);

    const len = this.w / 2;
    fill(this.colors[0]);
    triangle(0, 0, -len, len, -len, -len);
    fill(this.colors[1]);
    triangle(0, 0, -len, len, len, len);
    fill(this.colors[2]);
    triangle(0, 0, len, len, len, -len);
    fill(this.colors[3]);
    triangle(0, 0, len, -len, -len, -len);

    pop();
  }

  rotate(a = PI / 650) {
    this.angle += a;
    this.angle %= TWO_PI;
  }

  getColor() {
    const index = floor((((this.angle + PI * 1.75) % TWO_PI) / TWO_PI) * 4);
    return this.colors[index];
  }
}
