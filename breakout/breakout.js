class Breakout {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.blocks = this.createBlocks();
    this.player = {
      w: 0.2 * w,
      h: 0.015 * h,
      pos: createVector(0.5 * w, 0.9 * h),
    };
    this.ball = {
      size: 16,
      pos: this.player.pos.copy().sub(0, 0.5 * this.player.h + 0.5 * 17), // createVector(0.5 * w, 0.8 * h - this.player.h),
      angle: random(PI * 0.35, PI * 0.65),
      velocity: 7,
    };

    this.score = 0;
    this.dead = false;
  }

  createBlocks() {
    const numRows = 6;
    const numCols = 8;
    const array = [];

    const wSum = width - 60;
    const hSum = height * 0.35;
    const space = 5;

    const w = (wSum - (numCols - 1) * space) / numCols;
    const h = (hSum - (numRows - 1) * space) / numRows;

    for (let x = (-wSum + width) * 0.5; x < wSum; x += w + space) {
      for (let y = 15; y < hSum; y += h + space) {
        array.push({
          x,
          y,
          w,
          h,
        });
      }
    }

    return array;
  }

  show() {
    fill(255);
    noStroke();

    rectMode(CENTER, CENTER);
    // ellipseMode(CENTER)
    // ellipse(this.ball.pos.x, this.ball.pos.y, this.ball.size, this.ball.size);
    rect(this.ball.pos.x, this.ball.pos.y, this.ball.size, this.ball.size);
    rect(this.player.pos.x, this.player.pos.y, this.player.w, this.player.h);

    rectMode(CORNER, CORNER);
    for (const block of this.blocks) {
      rect(block.x, block.y, block.w, block.h);
    }
  }

  update() {
    this.ball.pos.add(createVector(this.ball.velocity, 0).rotate(-this.ball.angle));
  }

  move(amount) {
    this.player.pos.add(createVector(1, 0).mult(amount * 20));
    if (this.player.pos.x < this.player.w * 0.5) this.player.pos.x = this.player.w * 0.5;
    if (this.player.pos.x > this.w - this.player.w * 0.5) this.player.pos.x = this.w - this.player.w * 0.5;
  }

  collisionDetect() {
    const halfSize = 0.5 * this.ball.size;
    const p1 = createVector(this.ball.pos.x - halfSize, this.ball.pos.y - 0.5 * halfSize);
    const p2 = createVector(this.ball.pos.x + halfSize, this.ball.pos.y - 0.5 * halfSize);
    const p3 = createVector(this.ball.pos.x + halfSize, this.ball.pos.y + 0.5 * halfSize);
    const p4 = createVector(this.ball.pos.x - halfSize, this.ball.pos.y + 0.5 * halfSize);

    // player
    const offSetPlayer = {
      w: this.player.w,
      h: this.player.h,
      x: this.player.pos.x - 0.5 * this.player.w,
      y: this.player.pos.y - 0.5 * this.player.h,
    };
    const p1InPlayer = this.pointInRect(p1, offSetPlayer);
    const p2InPlayer = this.pointInRect(p2, offSetPlayer);
    const p3InPlayer = this.pointInRect(p3, offSetPlayer);
    const p4InPlayer = this.pointInRect(p4, offSetPlayer);

    if (p1InPlayer || p2InPlayer || p3InPlayer || p4InPlayer) {
      const dirOld = p5.Vector.fromAngle(this.ball.angle);
      dirOld.y *= -1;
      this.ball.angle = dirOld.heading();
      const swing = (this.ball.pos.x - this.player.pos.x) / 3;
      const swingMapped = map(swing, -this.player.w / 6, this.player.w / 6, PI * 0.65, PI * 0.35);
      this.ball.angle = p5.Vector.fromAngle(swingMapped).add(p5.Vector.fromAngle(this.ball.angle)).heading();
    }

    // blocks
    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i];

      const p1InRect = this.pointInRect(p1, block);
      const p2InRect = this.pointInRect(p2, block);
      const p3InRect = this.pointInRect(p3, block);
      const p4InRect = this.pointInRect(p4, block);
      const dirOld = p5.Vector.fromAngle(this.ball.angle);
      let didtouch = false;

      if ((p1InRect && p2InRect && !p3InRect && !p4InRect)
        || (!p1InRect && !p2InRect && p3InRect && p4InRect)) {
        dirOld.y *= -1;
        didtouch = true;
      } else if ((p2InRect && p3InRect && !p1InRect && !p4InRect)
        || (p1InRect && p4InRect && !p2InRect && !p3InRect)) {
        dirOld.x *= -1;
        didtouch = true;
      } else if ((p1InRect && !p2InRect && !p3InRect && !p4InRect)
        || (!p1InRect && !p2InRect && !p3InRect && p4InRect)) {
        dirOld.y *= -1;
        dirOld.x = Math.abs(dirOld.x);
        didtouch = true;
      } else if ((p2InRect && !p1InRect && !p3InRect && !p4InRect)
        || (p3InRect && !p1InRect && !p2InRect && !p4InRect)) {
        dirOld.y *= -1;
        dirOld.x = -Math.abs(dirOld.x);
        didtouch = true;
      }

      if (didtouch) {
        this.ball.angle = dirOld.heading();
        this.blocks.splice(i, 1);
        this.score += 1;
        return;
      }
    }

    // wall
    if (p1.x <= 0 || p2.x >= this.w) {
      const dirOld = p5.Vector.fromAngle(this.ball.angle);
      dirOld.x *= -1;
      this.ball.angle = dirOld.heading();
    }

    if (p1.y <= 0) {
      const dirOld = p5.Vector.fromAngle(this.ball.angle);
      dirOld.y *= -1;
      this.ball.angle = dirOld.heading();
    }

    if (p3.y > this.h) {
      console.log(`Game Over! Score: ${this.score}`);
      this.dead = true;
    }
  }

  pointInRect(p, rect) {
    return (p.x > rect.x && p.x < rect.x + rect.w && p.y > rect.y && p.y < rect.y + rect.h);
  }
}
