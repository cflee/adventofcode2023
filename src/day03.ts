import { getNonEmptyLines } from "./utils";

const isDigit = (char: string): boolean => char >= "0" && char <= "9";

const isSymbol = (char: string): boolean => !isDigit(char) && char != ".";

export const process1 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const xs = lines.length;
  const ys = lines[0].length;

  const isValidPosition = (x: number, y: number): boolean =>
    x >= 0 && x < xs && y >= 0 && y < ys;

  let sum: number = 0;
  for (let x = 0; x < xs; x++) {
    for (let y = 0; y < ys; y++) {
      if (!isDigit(lines[x].charAt(y))) {
        continue;
      }
      let isEligible = false;
      let y2 = y;
      for (; y2 < ys; y2++) {
        if (!isDigit(lines[x].charAt(y2))) {
          break;
        }
        [
          { x: x, y: y2 + 1 },
          { x: x + 1, y: y2 + 1 },
          { x: x + 1, y: y2 },
          { x: x + 1, y: y2 - 1 },
          { x: x, y: y2 - 1 },
          { x: x - 1, y: y2 - 1 },
          { x: x - 1, y: y2 },
          { x: x - 1, y: y2 + 1 },
        ].forEach(({ x: xAdj, y: yAdj }) => {
          if (
            isValidPosition(xAdj, yAdj) &&
            isSymbol(lines[xAdj].charAt(yAdj))
          ) {
            isEligible = true;
          }
        });
      }
      if (isEligible) {
        sum += parseInt(lines[x].substring(y, y2), 10);
      }
      y = y2;
    }
  }
  return sum;
};

interface Coordinate {
  x: number;
  y: number;
}

const adjacents = (curX: number, curY: number): Coordinate[] => {
  return [
    { x: curX, y: curY + 1 },
    { x: curX + 1, y: curY + 1 },
    { x: curX + 1, y: curY },
    { x: curX + 1, y: curY - 1 },
    { x: curX, y: curY - 1 },
    { x: curX - 1, y: curY - 1 },
    { x: curX - 1, y: curY },
    { x: curX - 1, y: curY + 1 },
  ];
};

const getNumberFromStartPoint = (
  lines: string[],
  x: number,
  y: number,
  visited?: Set<string>,
): number => {
  let y1 = y,
    y2 = y;
  while (y1 >= 0) {
    if (!isDigit(lines[x].charAt(y1))) {
      break;
    }
    if (visited != undefined) {
      visited.add(`x=${x},y=${y1}`);
    }
    y1--;
  }
  y1++;
  while (y2 < lines[x].length) {
    if (!isDigit(lines[x].charAt(y2))) {
      break;
    }
    if (visited != undefined) {
      visited.add(`x=${x},y=${y2}`);
    }
    y2++;
  }
  return parseInt(lines[x].substring(y1, y2), 10);
};

export const process2 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const xs = lines.length;
  const ys = lines[0].length;

  const isValidPosition = (x: number, y: number): boolean =>
    x >= 0 && x < xs && y >= 0 && y < ys;

  let sum: number = 0;
  const visitedGears: Coordinate[] = [];
  for (let x = 0; x < xs; x++) {
    for (let y = 0; y < ys; y++) {
      if (lines[x].charAt(y) != "*") {
        continue;
      }
      // string since Set doesn't do deep comparisons on objects
      const adjVisited: Set<string> = new Set();
      const adjCandidates = adjacents(x, y).filter((c) => {
        if (!isValidPosition(c.x, c.y) || !isDigit(lines[c.x].charAt(c.y))) {
          return false;
        }
        if (adjVisited.has(`x=${c.x},y=${c.y}`)) {
          return false;
        }
        getNumberFromStartPoint(lines, c.x, c.y, adjVisited);
        return true;
      });
      if (adjCandidates.length != 2) {
        continue;
      }
      sum +=
        getNumberFromStartPoint(lines, adjCandidates[0].x, adjCandidates[0].y) *
        getNumberFromStartPoint(lines, adjCandidates[1].x, adjCandidates[1].y);
    }
  }
  return sum;
};
