import {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
  ICompare,
  IGetCompareValue,
} from "@datastructures-js/priority-queue";

export const parseInput = (input: string): number[][] => {
  return input
    .split("\n")
    .map((line) => line.split("").map((c) => parseInt(c, 10)));
};

type Direction = "N" | "E" | "S" | "W";

interface Position {
  x: number;
  y: number;
  facing: Direction;
  continuous: number;
  heatLost: number;
}

const faceLeft = (cur: Direction): Direction => {
  if (cur == "N") {
    return "W";
  }
  if (cur == "E") {
    return "N";
  }
  if (cur == "S") {
    return "E";
  }
  if (cur == "W") {
    return "S";
  }
  throw new Error("unexpected current direction");
};

const faceRight = (cur: Direction): Direction => {
  if (cur == "N") {
    return "E";
  }
  if (cur == "E") {
    return "S";
  }
  if (cur == "S") {
    return "W";
  }
  if (cur == "W") {
    return "N";
  }
  throw new Error("unexpected current direction");
};

const calcNextPosition = (
  grid: number[][],
  position: Position,
  facing: Direction,
): Position | undefined => {
  let nextX: number | undefined = undefined;
  let nextY: number | undefined = undefined;
  if (facing == "E") {
    nextX = position.x;
    nextY = position.y + 1;
  } else if (facing == "S") {
    nextX = position.x + 1;
    nextY = position.y;
  } else if (facing == "W") {
    nextX = position.x;
    nextY = position.y - 1;
  } else if (facing == "N") {
    nextX = position.x - 1;
    nextY = position.y;
  } else {
    throw new Error("unexpected facing");
  }
  if (
    nextX < 0 ||
    nextX >= grid.length ||
    nextY < 0 ||
    nextY >= grid[0].length
  ) {
    return undefined;
  }
  return {
    x: nextX,
    y: nextY,
    facing: facing,
    continuous: facing == position.facing ? position.continuous + 1 : 1,
    heatLost: position.heatLost + grid[nextX][nextY],
  };
};

export const process1 = (input: string): number => {
  const grid = parseInput(input);
  const visited = new Set<string>();
  const queue = new MinPriorityQueue<Position>((p) => p.heatLost);
  queue.enqueue({
    x: 0,
    y: 0,
    facing: "E",
    continuous: 0,
    heatLost: 0,
  });
  while (!queue.isEmpty()) {
    const cur = queue.dequeue();
    if (cur.x == grid.length - 1 && cur.y == grid[0].length - 1) {
      return cur.heatLost;
    }
    if (visited.has(`${cur.x}#${cur.y}#${cur.continuous}#${cur.facing}`)) {
      continue;
    }
    visited.add(`${cur.x}#${cur.y}#${cur.continuous}#${cur.facing}`);
    if (cur.continuous < 3) {
      const next = calcNextPosition(grid, cur, cur.facing);
      if (next != undefined) {
        queue.enqueue(next);
      }
    }
    const left = calcNextPosition(grid, cur, faceLeft(cur.facing));
    if (left != undefined) {
      queue.enqueue(left);
    }
    const right = calcNextPosition(grid, cur, faceRight(cur.facing));
    if (right != undefined) {
      queue.enqueue(right);
    }
  }
  return -1;
};

export const process2 = (input: string): number => {
  const grid = parseInput(input);
  const visited = new Set<string>();
  const queue = new MinPriorityQueue<Position>((p) => p.heatLost);
  queue.enqueue({
    x: 0,
    y: 0,
    facing: "E",
    continuous: 0,
    heatLost: 0,
  });
  while (!queue.isEmpty()) {
    const cur = queue.dequeue();
    if (
      cur.x == grid.length - 1 &&
      cur.y == grid[0].length - 1 &&
      cur.continuous >= 4 &&
      cur.continuous <= 10
    ) {
      return cur.heatLost;
    }
    if (visited.has(`${cur.x}#${cur.y}#${cur.continuous}#${cur.facing}`)) {
      continue;
    }
    visited.add(`${cur.x}#${cur.y}#${cur.continuous}#${cur.facing}`);
    if (cur.continuous > 0 && cur.continuous < 4) {
      const next = calcNextPosition(grid, cur, cur.facing);
      if (next != undefined) {
        queue.enqueue(next);
      }
    } else if (cur.continuous == 10) {
      const left = calcNextPosition(grid, cur, faceLeft(cur.facing));
      if (left != undefined) {
        queue.enqueue(left);
      }
      const right = calcNextPosition(grid, cur, faceRight(cur.facing));
      if (right != undefined) {
        queue.enqueue(right);
      }
    } else {
      const next = calcNextPosition(grid, cur, cur.facing);
      if (next != undefined) {
        queue.enqueue(next);
      }
      const left = calcNextPosition(grid, cur, faceLeft(cur.facing));
      if (left != undefined) {
        queue.enqueue(left);
      }
      const right = calcNextPosition(grid, cur, faceRight(cur.facing));
      if (right != undefined) {
        queue.enqueue(right);
      }
    }
  }
  return -1;
};
