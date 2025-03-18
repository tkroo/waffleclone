import { pickEightWords, pickSixWords } from "./pickWords_faster";
import { myArrays, mySettings } from "./utils.svelte";

export interface Tile {
  value: string;
  correctValue: string;
  status: 'c' | 'i' | 'x' | '';
  x: number;
  y: number;
  swapStatus: 'selected' | '';
  hidden: boolean;
}

export type Board = Tile[][];

export interface Game {
  words: string[];
  grid: Board;
  swapTile: (tile: Tile) => void;
  updateTileStatuses: (grid: Board) => Board;
  startingSwaps: number;
  currentTurn: number;
  getCurrentTurn: () => number;
  solveGrid: (grid: Board) => Board;
  decreaseTurns: (n: number) => void;
  increaseTurns: (n: number) => void;
  checkRowsAndColumns: (grid: Board) => string[] | undefined;
  resetTurns: () => void;
  shuffle2DArray: (myArray: Board) => Board;
}

export async function GameFactory(gridSize: number, wordsArray: string[] = []): Promise<Game> {
    const words = wordsArray.length ? wordsArray : gridSize === 5 ? await pickSixWords() : await pickEightWords();
    // const words = wordsArray.length ? gridSize === 5 ? await pickSixWords() : await pickEightWords() : wordsArray;
    let grid = generateGrid(gridSize);
    let startingSwaps:number = gridSize == 5 ? mySettings.current.startingSwaps5 || 16 : mySettings.current.startingSwaps7 || 32;
    let currentTurn: number = startingSwaps;
    let _selectedTile: Tile | null = null;
  
    function generateGrid(gridSize: number): Board {
      const grid: Board= [];
      for (let r = 0; r < gridSize; r++) {
        const row: Tile[] = [];
        for (let c = 0; c < gridSize; c++) {
          const hidden = (r % 2 == 1 && c % 2 == 1);
          const tile: Tile = { value: ``, correctValue: ``, status: '', x: r, y: c, swapStatus: '', hidden: hidden };
          row.push(tile);
        }
        grid.push(row);
      }
      return grid;
    }

  function fillWaffleGrid(grid: Board, words: string[]): Board {
    if (!grid) {
      throw new Error('grid is undefined');
    }
    const gridSize = grid.length;
    for (let i = 0; i < words.length; i++) {
      switch (i) {
        case 0:
          for (let x = 0; x < gridSize; x++) {
            grid[0][x].value = words[i][x];
            grid[0][x].correctValue = words[i][x];
          }
          break;
        case 1:
          for (let x = 0; x < gridSize; x++) {
            grid[x][gridSize - 1].value = words[i][x];
            grid[x][gridSize - 1].correctValue = words[i][x];
          }
          break;
        case 2:
          for (let x = 0; x < gridSize; x++) {
            grid[gridSize - 1][x].value = words[i][x];
            grid[gridSize - 1][x].correctValue = words[i][x];
          }
          break;
        case 3:
          for (let x = 0; x < gridSize; x++) {
            grid[x][0].value = words[i][x];
            grid[x][0].correctValue = words[i][x];
          }
          break;
        case 4:
          for (let x = 0; x < gridSize; x++) {
            grid[x][2].value = words[i][x];
            grid[x][2].correctValue = words[i][x];
          }
          break;
        case 5:
          for (let x = 0; x < gridSize; x++) {
            if (gridSize == 5) {
              grid[2][x].value = words[i][x];
              grid[2][x].correctValue = words[i][x];
            } else {
              grid[x][4].value = words[i][x];
              grid[x][4].correctValue = words[i][x];
            }
          }
          break;
        case 6:
          for (let x = 0; x < gridSize; x++) {
            grid[2][x].value = words[i][x];
            grid[2][x].correctValue = words[i][x];
          }
          break;
        case 7:
          for (let x = 0; x < gridSize; x++) {
            grid[4][x].value = words[i][x];
            grid[4][x].correctValue = words[i][x];
          }
          break;
        default:
          break;
      }
    }
    // updateTileStatuses(grid); // Call updateTileStatuses within the factory scope
    return grid;
  }

  function shuffle2DArray(myArray: Board): Board {
    if (!myArray) {
      throw new Error('myArray is undefined');
    }
    const gridSize = myArray?.length;
    const flatArr = myArray?.flat(); //.filter(a => a.value !== '');
    const excludedPositions = ["00", "22",];

    // Fisher-Yates shuffle algorithm
    for (let i = flatArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // don't swap if either of the two tiles are in excluded positions

      let a = flatArr[i].x + '' + flatArr[i].y;
      let b = flatArr[j].x + '' + flatArr[j].y;
      // if( excludedPositions.includes(a) || excludedPositions.includes(b) ) {
      if (flatArr[i].hidden || flatArr[j].hidden || excludedPositions.includes(a) || excludedPositions.includes(b)) {
        continue;
      } else {
        [flatArr[i].correctValue, flatArr[j].correctValue] = [flatArr[j].correctValue, flatArr[i].correctValue];
        [flatArr[i], flatArr[j]] = [flatArr[j], flatArr[i]];
      }
    }

    // Reconstruct the 2D array
    let shuffledArray = [];
    while (flatArr.length) {
      shuffledArray.push(flatArr.splice(0, myArray[0].length));
    }
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        shuffledArray[i][j].x = i;
        shuffledArray[i][j].y = j;
      }
    }
    // updateTileStatuses(shuffledArray); // Call updateTileStatuses within the factory scope
    return updateTileStatuses(shuffledArray);
    // return shuffledArray;
  }

  function swapTile(tile: Tile): void {
    if (!tile || tile.hidden) {
      return; // Do nothing if tile is null or hidden
    }

    if (!_selectedTile) {
      _selectedTile = tile;
      _selectedTile.swapStatus = 'selected';
    } else {
      if (_selectedTile === tile || _selectedTile.value == tile.value) {
        _selectedTile.swapStatus = '';
        _selectedTile = null;
      } else {
        [_selectedTile.value, tile.value] = [tile.value, _selectedTile.value];
        _selectedTile.swapStatus = '';
        currentTurn--;
        tile.swapStatus = '';
        _selectedTile = null;
        grid = updateTileStatuses(grid); // Update tile statuses after swap
      }
      _selectedTile = null;
    }
  }

  // function swapTile(tile: Tile): void {
  //   if (!tile || tile.hidden) {
  //     return; // Do nothing if tile is null or hidden
  //   }
    
  //   if (!_selectedTile) {
  //     // First click: select the tile
  //     _selectedTile = tile;
  //     _selectedTile.swapStatus = 'selected'; // Indicate selected state (for UI)
  //     // UI needs to update tile's appearance based on swapStatus
  //   } else {
  //     // Second click: swap tiles
  //     if (_selectedTile === tile || _selectedTile.value == tile.value) {
  //       // Deselect if the same tile is clicked again
  //       _selectedTile.swapStatus = ''; // Clear selected state
  //       _selectedTile = null;
  //       // UI needs to update tile's appearance
  //     } else {
  //       [_selectedTile.value, tile.value] = [tile.value, _selectedTile.value];
  //       _selectedTile.swapStatus = ''; // Clear selected state for both
  //       currentTurn--;
  //       tile.swapStatus = '';
  //       _selectedTile = null;
  //     }
  //     _selectedTile = null;
  //   }
  // }

  function checkRowsAndColumns(grid: Board): string[] {
    for (let i = 0; i < gridSize; i++) {
      let r = getRow(i, grid);
      let c = getCol(i, grid);
      if (r.every(tile => tile.value === tile.correctValue) && (i % 2 == 0)) {
        let word = r.map(tile => tile.correctValue).join('');
        if (!myArrays.completedWords.includes(word)) {
          myArrays.completedWords.push(word);
        }
      }
      if (c.every(tile => tile.value === tile.correctValue) && (i % 2 == 0)) {
        let word = c.map(tile => tile.correctValue).join('');
        if (!myArrays.completedWords.includes(word)) {
          myArrays.completedWords.push(word);
        }
      }
    }
    return myArrays.completedWords;
  }

  function updateTileStatuses(grid: Board): Board {
    if (!grid) {
      throw new Error('grid is undefined');
    }
    const gridSize = grid.length;
    for (let twice = 0; twice < 2; twice++) {
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          let rowLetters = getRow(r, grid).filter((l: Tile) => l.status != 'c').map((x: Tile) => x.correctValue);
          let colLetters = getCol(c, grid).filter((l: Tile) => l.status != 'c').map((x: Tile) => x.correctValue);
          let value = grid[r][c].value;

          let rowOnly = (r % 2 == 0 && c % 2 == 1);
          let columnOnly = (r % 2 == 1 && c % 2 == 0);

          let testAgainst = columnOnly ? colLetters : rowOnly ? rowLetters : [...rowLetters, ...colLetters];
          let counts = countAppearances(testAgainst);

          if (Object.keys(counts).includes(value)) {
            grid[r][c].status = 'i';
          } else {
            grid[r][c].status = 'x';
          }
          if (value == grid[r][c].correctValue) {
            grid[r][c].status = 'c';
          }
        }
      }
    }
    return grid;
  }

  function solveGrid(grid: Board): Board {
    if (!grid) {
      throw new Error('grid is undefined');
    }
    const gridSize = grid.length;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        grid[r][c].value = grid[r][c].correctValue;
      }
    }
    return grid;
  }

  function getRow(row: number, arr: Board): Tile[] {
    return arr![row];
  }

  function getCol(col: number, arr: Board): Tile[] {
    return arr!.map(x => x[col]);
  }

  function countAppearances(arr: string[]): { [key: string]: number } {
    let counts: { [key: string]: number } = {};
    for (let i = 0; i < arr.length; i++) {
      counts[arr[i]] = counts[arr[i]] ? counts[arr[i]] + 1 : 1;
    }
    return counts;
  }

  function getCurrentTurn(): number {
    return currentTurn ?? 0;
  }

  function decreaseTurns(n: number = 1) {
    if (currentTurn > 0) {
      currentTurn = currentTurn - n;
    }
  }

  function increaseTurns(n: number = 1) {
    currentTurn = currentTurn + n;
  }

  function resetTurns() {
    currentTurn = startingSwaps;
  }

  return {
    words,
    grid: shuffle2DArray(fillWaffleGrid(grid, words)),
    swapTile,
    updateTileStatuses,
    startingSwaps,
    currentTurn,
    getCurrentTurn,
    solveGrid,
    decreaseTurns,
    increaseTurns,
    checkRowsAndColumns,
    resetTurns,
    shuffle2DArray
  };
}