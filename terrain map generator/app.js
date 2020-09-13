const grid = [];

const par = {
  resolution: 100,
  scale: 0.2,
  waterTresh: 0.1,
  grasTresh: 0.6,
  rockTresh: 0.8,
  snowTresh: 1,
  waterColor: [0, 204, 255],
  grasColor: [56, 202, 36],
  rockColor: [153, 102, 51],
  snowColor: [255, 255, 255],
};

function setup() {
  createCanvas(750, 750);

  generateGrid();
  createGui();
}

function generateGrid() {
  for (let x = 0; x < par.resolution; x++) grid[x] = [];

  for (let x = 0; x < par.resolution; x++) {
    for (let y = 0; y < par.resolution; y++) {
      grid[x][y] = noise(x / (par.scale * par.resolution), y / (par.scale * par.resolution));
    }
  }
}

function createGui() {
  const gui = new dat.GUI();
  // scale: 0.2,
  // waterTresh: 0.1,
  // grasTresh: 0.6,
  // rockTresh: 0.8,
  // snowTresh: 1,
  gui.add(par, 'resolution', 10, 500).step(5)
      .onChange(newValue => {
        console.log('Value changed to:  ', newValue);
        generateGrid();
      });
  gui.add(par, 'waterTresh', 0, 1).step(0.05).listen();
  gui.add(par, 'grasTresh', 0, 1).step(0.05).listen();
  gui.add(par, 'rockTresh', 0, 1).step(0.05).listen();
  gui.add(par, 'snowTresh', 0, 1).step(0.05).listen();
  gui.addColor(par, 'waterColor');
  gui.addColor(par, 'grasColor');
  gui.addColor(par, 'rockColor');
  gui.addColor(par, 'snowColor');
  // gui.add(par, 'resolution', 10, 500).name('resolution').step(1).listen();
  // gui.add(parDef, 'View');
  // gui.add(parDef, 'Rotating');
  // gui.add(parDef, 'level', 0.0, 30).name('Noise').step(0.01).listen();
  // gui.add(parDef, 'horn').name('Horn');
}

function draw() {
  background(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      noStroke();
      fill(terrainColor(grid[i][j]));
      rect((i * width) / par.resolution, (j * height) / par.resolution, 1 + width / par.resolution, 1 + height / par.resolution);
    }
  }
}

function terrainColor(height) {
  if (height < par.waterTresh) {
    return color(par.waterColor);
  } if (height < par.grasTresh) {
    return color(par.grasColor);
  } if (height < par.rockTresh) {
    return color(par.rockColor);
  } if (height < par.snowTresh) {
    return color(par.snowColor);
  }
  return color(255, 0, 255);
}
