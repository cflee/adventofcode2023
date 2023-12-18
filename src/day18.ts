import { getLines, getNonEmptyLines, sumNumbers } from "./utils";

type Direction = "U" | "D" | "L" | "R";

interface Instruction {
  direction: Direction;
  length: number;
  colour: string;
}

interface Transform {
  x: number;
  y: number;
}

const transforms: { [d in Direction]: Transform } = {
  U: { x: -1, y: 0 },
  D: { x: 1, y: 0 },
  L: { x: 0, y: -1 },
  R: { x: 0, y: 1 },
};

type TrenchType = "hole" | "invalid";

interface Trench {
  type: TrenchType;
  colours: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
}

export const parseInput = (input: string): Instruction[] => {
  return input.split("\n").map((line): Instruction => {
    const parts = line.split(" ");
    return {
      direction: parts[0] as Direction,
      length: parseInt(parts[1], 10),
      colour: parts[2].substring(2, 8),
    };
  });
};

interface Coordinate {
  x: number;
  y: number;
}

/*
minX 0 minY 0 maxX 9 maxY 6
minX -239 minY -124 maxX 15 maxY 209
*/
export const process1 = (input: string): number => {
  const instructions = parseInput(input);

  // determine size of the initial trench
  let curX = 0;
  let curY = 0;
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;
  for (let a = 0; a < instructions.length; a++) {
    const instr = instructions[a];
    const tx = transforms[instr.direction];
    for (let c = 0; c < instr.length; c++) {
      curX = curX + tx.x;
      curY = curY + tx.y;
      minX = Math.min(curX, minX);
      minY = Math.min(curY, minY);
      maxX = Math.max(curX, maxX);
      maxY = Math.max(curY, maxY);
    }
  }

  // create a grid that always has an outer edge around the initial trench
  const xFactor = -1 * minX + 1;
  const yFactor = -1 * minY + 1;
  const xWidth = maxX - minX + 1 + 2;
  const yWidth = maxY - minY + 1 + 2;
  // console.log(`minX ${minX} minY ${minY} maxX ${maxX} maxY ${maxY}`);
  const grid: Trench[][] = [];
  for (let r = 0; r < xWidth; r++) {
    grid[r] = new Array(yWidth);
  }

  // draw the initial trench
  curX = xFactor;
  curY = yFactor;
  grid[curX][curY] = {
    type: "hole",
    colours: {
      north: "",
      south: "",
      east: "",
      west: "",
    },
  };
  const trenchCoordinates: Coordinate[] = [];
  for (let a = 0; a < instructions.length; a++) {
    const instr = instructions[a];
    const tx = transforms[instr.direction];
    for (let c = 0; c < instr.length; c++) {
      curX = curX + tx.x;
      curY = curY + tx.y;
      grid[curX][curY] = {
        type: "hole",
        colours: {
          north: instr.colour,
          south: instr.colour,
          east: instr.colour,
          west: instr.colour,
        },
      };
      trenchCoordinates.push({ x: curX, y: curY });
    }
  }
  // console.log(`trenchCount ${trenchCoordinates.length}`);

  // flood fill the outside from 0,0
  const outsideVisited = new Set<string>();
  const outsideQueue: Coordinate[] = [];
  outsideQueue.push({ x: 0, y: 0 });
  let outsideCount = 0;
  while (outsideQueue.length > 0) {
    const cur = outsideQueue.shift()!;
    if (outsideVisited.has(`${cur.x},${cur.y}`)) {
      continue;
    }
    outsideVisited.add(`${cur.x},${cur.y}`);
    grid[cur.x][cur.y] = {
      type: "invalid",
      colours: {
        north: "",
        south: "",
        east: "",
        west: "",
      },
    };
    // console.log(`outside ${cur.x} ${cur.y}`);
    outsideCount++;
    for (const t in transforms) {
      const nextX = cur.x + transforms[t as Direction].x;
      const nextY = cur.y + transforms[t as Direction].y;

      if (
        nextX >= 0 &&
        nextX < grid.length &&
        nextY >= 0 &&
        nextY < grid[0].length &&
        grid[nextX][nextY] == undefined
      ) {
        outsideQueue.push({ x: nextX, y: nextY });
      }
    }
  }
  // console.log(`outsideCount ${outsideCount}`);

  // flood fill the inside from the initial trench
  const insideVisited = new Set<string>();
  const insideQueue: Coordinate[] = [];
  trenchCoordinates.forEach((c) => insideQueue.push({ x: c.x, y: c.y }));
  let insideCount = 0;
  while (insideQueue.length > 0) {
    const cur = insideQueue.shift()!;
    if (insideVisited.has(`${cur.x},${cur.y}`)) {
      continue;
    }
    insideVisited.add(`${cur.x},${cur.y}`);
    if (grid[cur.x][cur.y] == undefined) {
      grid[cur.x][cur.y] = {
        type: "hole",
        colours: {
          north: "",
          south: "",
          east: "",
          west: "",
        },
      };
      // console.log(`inside ${cur.x} ${cur.y}`);
      insideCount++;
    }
    for (const t in transforms) {
      const nextX = cur.x + transforms[t as Direction].x;
      const nextY = cur.y + transforms[t as Direction].y;

      if (
        nextX >= 0 &&
        nextX < grid.length &&
        nextY >= 0 &&
        nextY < grid[0].length &&
        grid[nextX][nextY] == undefined
      ) {
        insideQueue.push({ x: nextX, y: nextY });
      }
    }
  }
  // console.log(`insideCount ${insideCount}`);

  return trenchCoordinates.length + insideCount;
};

export const process2 = (input: string): number => {
  return -1;
};
