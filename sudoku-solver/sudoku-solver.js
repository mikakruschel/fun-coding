const prompts = require('prompts');

async function getSudoku(grid = []) {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message: `Row ${grid.length + 1}: `,
    validate: value => /^[0-9 ]{9}$/.test(value),
  });
  grid.push(response);
  if (grid.length == 9) return grid;
  else return getSudoku(grid);
}

(async () => {
  const response = await getSudoku();

  const board = response.map(resp => resp.value.split(''));
  console.log('Given sudoku:'); logGrid(board, true);
  if (main(board)) logGrid(board);
})();

function main(grid) {
  const boardValid = validBoard(grid);
  if (!boardValid) {
    console.log('invalid sudoku board');
    return false;
  }
  console.log('solutions: ');
  const solvable = solve(grid, true);
  // if (!solvable) console.log('unsolvable sudoku'); // TODO
  return solvable;
}

function solve(grid, allSolutions = false) {
  const { x, y } = findEmptyCell(grid);

  if (x == null) return true;

  for (let i = 1; i <= 9; i++) {
    grid[y][x] = i;

    if (validMove(grid, x, y) && solve(grid, allSolutions)) {
      if (allSolutions) {
        logGrid(grid);
        grid[y][x] = 0;
        return false; // keep searching other solutions
      } else {
        return true;
      }
    } else { // undo last move
      grid[y][x] = 0;
    }
  }

  return false;
}

function findEmptyCell(grid) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (grid[y][x] < 1 || grid[y][x] > 9) return { x, y };
    }
  }

  return { x: null, y: null };
}

function logGrid(grid) {
  let log = '';
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const num = Number(grid[i][j]);
      log += `${(!isNaN(num) && num >= 1 && num <= 9) ? num : '•'} `;
      if ((j + 1) % 3 == 0 && j != 8) log += '|';
    }
    if ((i + 1) % 3 == 0) log += '\n-------------------';
    log += '\n';
  }

  log = log.slice(0, -1);
  log += '-------------------\n';
  console.log(log);
}

function validMove(grid, x, y) {
// check rows
  if (!validUnit(grid[y])) return false;

  // check columns
  const column = [];
  for (let j = 0; j < 9; j++) {
    column.push(grid[j][x]);
  }
  if (!validUnit(column)) return false;

  // check blocks
  const xmod = x - (x % 3);
  const ymod = y - (y % 3);
  const block = [];
  for (let dx = 0; dx < 3; dx++) {
    for (let dy = 0; dy < 3; dy++) {
      block.push(grid[ymod + dy][xmod + dx]);
    }
  }
  if (!validUnit(block)) return false;
  return true;
}

function validBoard(grid) {
  if (!Array.isArray(grid) || !Array.isArray(grid[0])) return false;
  if (grid.length != 9) return false;
  for (let y = 0; y < grid.length; y++) if (grid[y].length != 9) return false;

  // check columns
  for (let x = 0; x < 9; x++) {
    const column = [];
    for (let y = 0; y < 9; y++) {
      column.push(grid[y][x]);
    }
    if (!validUnit(column)) return false;
  }

  // check rows
  for (let y = 0; y < 9; y++) {
    if (!validUnit(grid[y])) return false;
  }

  // check blocks
  for (let x = 0; x < 9; x += 3) {
    for (let y = 0; y < 9; y += 3) {
      const block = [];
      for (let dx = 0; dx < 3; dx++) {
        for (let dy = 0; dy < 3; dy++) {
          block.push(grid[y + dy][x + dx]);
        }
      }
      if (!validUnit(block)) return false;
    }
  }

  return true;
}

function validUnit(unit) {
  for (let i = 1; i <= 9; i++) {
    if (unit.filter(val => val == i).length > 1) return false;
  }
  return true;
}
