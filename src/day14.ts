import { getNonEmptyLines } from "./utils";

export const parseInput = (lines: string[]): string[][] => {
  return lines.map((line) => line.split(""));
};

const initGrid = (grid: string[][]): string[][] => {
  let result: string[][] = [];
  for (let i = 0; i < grid.length; i++) {
    result[i] = [];
  }
  return result;
};

export const tiltNorth = (grid: string[][]): string[][] => {
  const result = initGrid(grid);
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][j] == "#") {
        result[i][j] = "#";
        continue;
      }
      for (let k = i; k < grid.length; k++) {
        if (grid[k][j] == "#") {
          break;
        }
        if (grid[k][j] == "O") {
          result[i][j] = "O";
          grid[k][j] = ".";
          break;
        }
      }
      if (result[i][j] == undefined) {
        result[i][j] = ".";
      }
    }
  }
  return result;
};

export const tiltSouth = (grid: string[][]): string[][] => {
  const result = initGrid(grid);
  for (let j = 0; j < grid[0].length; j++) {
    for (let i = grid.length - 1; i >= 0; i--) {
      if (grid[i][j] == "#") {
        result[i][j] = "#";
        continue;
      }
      for (let k = i; k >= 0; k--) {
        if (grid[k][j] == "#") {
          break;
        }
        if (grid[k][j] == "O") {
          result[i][j] = "O";
          grid[k][j] = ".";
          break;
        }
      }
      if (result[i][j] == undefined) {
        result[i][j] = ".";
      }
    }
  }
  return result;
};

export const tiltWest = (grid: string[][]): string[][] => {
  const result = initGrid(grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "#") {
        result[i][j] = "#";
        continue;
      }
      for (let k = j; k < grid[0].length; k++) {
        if (grid[i][k] == "#") {
          break;
        }
        if (grid[i][k] == "O") {
          result[i][j] = "O";
          grid[i][k] = ".";
          break;
        }
      }
      if (result[i][j] == undefined) {
        result[i][j] = ".";
      }
    }
  }
  return result;
};

export const tiltEast = (grid: string[][]): string[][] => {
  const result = initGrid(grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
      if (grid[i][j] == "#") {
        result[i][j] = "#";
        continue;
      }
      for (let k = j; k >= 0; k--) {
        if (grid[i][k] == "#") {
          break;
        }
        if (grid[i][k] == "O") {
          result[i][j] = "O";
          grid[i][k] = ".";
          break;
        }
      }
      if (result[i][j] == undefined) {
        result[i][j] = ".";
      }
    }
  }
  return result;
};

const serialize = (res: string[][]): string =>
  res.map((line) => line.join("")).join("");

export const spin = (grid: string[][]): string[][] => {
  let result = tiltNorth(grid);
  result = tiltWest(result);
  result = tiltSouth(result);
  result = tiltEast(result);
  return result;
};

export const calcLoad = (grid: string[][]): number => {
  let sum: number = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == "O") {
        sum += grid.length - i;
      }
    }
  }
  return sum;
};

export const process1 = (input: string): number => {
  const inputGrid = parseInput(getNonEmptyLines(input));
  const resultGrid = tiltNorth(inputGrid);
  const load = calcLoad(resultGrid);
  return load;
};

export const process2 = (input: string): number => {
  const inputGrid = parseInput(getNonEmptyLines(input));
  let resultGrid = inputGrid;
  const seenGrids: Map<string, number> = new Map();
  const resultLog: number[] = [];
  for (let i = 0; i < 1000000000; i++) {
    resultGrid = spin(resultGrid);

    const serializedGrid = serialize(resultGrid);
    if (seenGrids.has(serializedGrid)) {
      const cycleLength = i - seenGrids.get(serializedGrid)!;
      const offset = seenGrids.get(serializedGrid)!;
      return resultLog[((1000000000 - 1 - offset) % cycleLength) + offset];
    }
    seenGrids.set(serializedGrid, i);
    resultLog[i] = calcLoad(resultGrid);
  }
  const load = calcLoad(resultGrid);
  return load;
};
