import { getNonEmptyLines } from "./utils";

interface Empties {
  cols: number[];
  rows: number[];
}

export const findEmpties = (grid: string[]): Empties => {
  const rows = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].indexOf("#") == -1) {
      rows.push(i);
    }
  }
  const cols = [];
  for (let j = 0; j < grid[0].length; j++) {
    let empty = true;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].charAt(j) == "#") {
        empty = false;
        break;
      }
    }
    if (empty) {
      cols.push(j);
    }
  }
  return {
    rows,
    cols,
  };
};

interface Coordinate {
  row: number;
  col: number;
}

export const findGalaxies = (grid: string[]): Coordinate[] => {
  const results: Coordinate[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i].charAt(j) == "#") {
        results.push({
          row: i,
          col: j,
        });
      }
    }
  }
  return results;
};

export const calcDist = (
  c1: Coordinate,
  c2: Coordinate,
  empties: Empties,
  expansionFactor: number,
): number => {
  const col1 = Math.min(c1.col, c2.col);
  const col2 = Math.max(c1.col, c2.col);
  const row1 = Math.min(c1.row, c2.row);
  const row2 = Math.max(c1.row, c2.row);
  let dist = col2 - col1 + row2 - row1;
  for (let x = col1; x <= col2; x++) {
    if (empties.cols.includes(x)) {
      dist += expansionFactor - 1;
    }
  }
  for (let y = row1; y <= row2; y++) {
    if (empties.rows.includes(y)) {
      dist += expansionFactor - 1;
    }
  }
  return dist;
};

export const process1 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const empties: Empties = findEmpties(lines);
  const galaxies: Coordinate[] = findGalaxies(lines);
  let sum: number = 0;
  for (let g1 = 0; g1 < galaxies.length - 1; g1++) {
    for (let g2 = g1 + 1; g2 < galaxies.length; g2++) {
      // pair
      let dist = calcDist(galaxies[g1], galaxies[g2], empties, 2);
      sum += dist;
    }
  }
  return sum;
};

export const process2 = (input: string, expansionFactor: number): number => {
  const lines: string[] = getNonEmptyLines(input);
  const empties: Empties = findEmpties(lines);
  const galaxies: Coordinate[] = findGalaxies(lines);
  let sum: number = 0;
  for (let g1 = 0; g1 < galaxies.length - 1; g1++) {
    for (let g2 = g1 + 1; g2 < galaxies.length; g2++) {
      // pair
      let dist = calcDist(galaxies[g1], galaxies[g2], empties, expansionFactor);
      sum += dist;
    }
  }
  return sum;
};
