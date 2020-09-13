// Inspired by Daniel Shiffman

const cells = [];
const dimH = 17;
const dimW = 17;
const cellSize = 40;

let xPadding;
let yPadding;
let numOfMines;
let gameover = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < dimH * dimW; i += 1) {
    const x = i % dimW;
    const y = (i - x) / dimW;
    // i = y * dimW + x
    cells.push(new Cell(x, y, i));
  }

  for (let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];
    if (!cell.mine) {
      let counter = 0;
      const xoffS = i % dimW == 0 ? 0 : -1;
      const xoffE = i % dimW == dimW - 1 ? 0 : 1;
      const yoffS = i - dimW < 0 ? 0 : -1;
      const yoffE = cells.length - i <= dimW ? 0 : 1;

      for (let xoff = xoffS; xoff <= xoffE; xoff += 1) {
        for (let yoff = yoffS; yoff <= yoffE; yoff += 1) {
          const index = i + xoff + yoff * dimW;
          if (cells[index].mine) {
            counter += 1;
          }
        }
      }

      cell.surroundingFlags = counter;
    }
  }
}

function draw() {
  background(255);

  xPadding = (windowWidth - dimW * cellSize) / 2;
  yPadding = (windowHeight - dimH * cellSize) / 2;
  translate(xPadding, yPadding);

  for (let i = 0; i < dimH * dimW; i += 1) {
    const cell = cells[i];
    stroke(75);
    if (!cell.visible) fill(200);
    else fill(220);

    const x = map(cell.x, 0, dimW, 0, cellSize * dimW);
    const y = map(cell.y, 0, dimH, 0, cellSize * dimH);
    rect(x, y, cellSize, cellSize);
    if (cell.visible) {
      if (cell.mine) {
        fill(0);
        ellipseMode(CENTER);
        ellipse(x + cellSize / 2, y + cellSize / 2, cellSize * 0.8);
      } else if (cell.surroundingFlags != 0) {
        textSize(cellSize * 0.8);
        textAlign(CENTER);
        fill(0);
        text(cell.surroundingFlags, x + 0.5 * cellSize, y + cellSize - 0.2 * cellSize);
      }
    } else if (cell.flags) {
      stroke(255, 0, 0);
      strokeWeight(2);
      fill(255, 0, 0);
      line(x + cellSize * 0.2, y + cellSize * 0.2, x + cellSize * 0.2, y + cellSize);
      strokeWeight(1);
      noStroke();
      triangle(x + cellSize * 0.2, y + cellSize * 0.179, x + cellSize * 0.2, y + cellSize * 0.6, x + cellSize * 0.7, y + cellSize * 0.4);
    }
  }

  translate(-xPadding, -yPadding);
  noStroke();
  fill(0);
  textSize(30);
  textAlign(LEFT);

  numOfMines = 0;
  let numOfFlags = 0;
  let gezeigt = 0;
  let fertig = true;

  for (let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];

    if (cell.mine) numOfMines += 1;
    if (cell.flags) numOfFlags += 1;
    if (cell.visible) gezeigt += 1;

    if ((!cell.visible && !cell.flags)
      || (cell.flags && !cell.mine)
      || (cell.mine && cell.visible)) fertig = false;

    if (cell.visible && cell.mine) gameover = true;
  }

  text(`${numOfMines} Minen→ ${numOfFlags} Flaggen`, 3, 30);
  text(`${floor((gezeigt / cells.length) * 100)}% gezeigt`, 3, 2 * (30 + 2.5));

  if (fertig) {
    noLoop();
    fill(100, 202, 87);
    text('Fertig!', 3, 3 * (30 + 5));
  }

  if (gameover) {
    noLoop();
    fill(255, 0, 0);
    text('GAMEOVER!', 3, 3 * (30 + 5));
  }
}

function mousePressed() {
  if (mouseButton == RIGHT) {
    for (let i = 0; i < cells.length; i += 1) {
      const cell = cells[i];
      if ((mouseX - xPadding >= cell.x * cellSize && mouseX - xPadding < cell.x * cellSize + cellSize)
        && (mouseY - yPadding >= cell.y * cellSize && mouseY - yPadding < cell.y * cellSize + cellSize)
        && (!cell.visible)) {
        cell.flags = true;
      }
    }
  }
}

function doubleClicked() {
  console.log('doubleClicked');
}

function mouseClicked() {
  if (!gameover) {
    for (let i = 0; i < cells.length; i += 1) {
      const cell = cells[i];
      if ((mouseX - xPadding >= cell.x * cellSize && mouseX - xPadding < cell.x * cellSize + cellSize)
        && (mouseY - yPadding >= cell.y * cellSize && mouseY - yPadding < cell.y * cellSize + cellSize)) {
        if (cell.flags) {
          cell.flags = false;
        } else {
          cell.show();
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Cell {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.index = i;
    this.mine = random(1) < 0.15;
    this.visible = false;
    this.surroundingFlags = -1;
    this.flags = false;
  }

  show() {
    this.visible = true;
    if (this.mine) {
      console.log('GAMEOVER');
      gameover = true;
      for (let i = 0; i < cells.length; i += 1) {
        cells[i].visible = true;
      }
    } else if (this.surroundingFlags == 0) {
      const xoffS = this.index % dimW == 0 ? 0 : -1;
      const xoffE = this.index % dimW == dimW - 1 ? 0 : 1;
      const yoffS = this.index - dimW < 0 ? 0 : -1;
      const yoffE = cells.length - this.index <= dimW ? 0 : 1;

      for (let xoff = xoffS; xoff <= xoffE; xoff += 1) {
        for (let yoff = yoffS; yoff <= yoffE; yoff += 1) {
          const index = this.index + xoff + yoff * dimW;
          if (index != this.index && !cells[index].visible) cells[index].show();
        }
      }
    }
  }
}
