// +--->
// |   y
// v x
interface Coordinate {
  x: number;
  y: number;
}

interface Beam extends Coordinate {
  // direction that is entering this coordinate
  // --->x is left
  dir: "up" | "right" | "down" | "left";
}

const north = (queue: Beam[], beam: Beam): void => {
  queue.push({ x: beam.x - 1, y: beam.y, dir: "up" });
};

const east = (queue: Beam[], beam: Beam): void => {
  queue.push({ x: beam.x, y: beam.y + 1, dir: "left" });
};

const south = (queue: Beam[], beam: Beam): void => {
  queue.push({ x: beam.x + 1, y: beam.y, dir: "down" });
};

const west = (queue: Beam[], beam: Beam): void => {
  queue.push({ x: beam.x, y: beam.y - 1, dir: "right" });
};

export const calc = (data: string[][], start: Beam): number => {
  let visited = new Set();
  let energized = new Set();
  let queue: Beam[] = [];
  queue.push(start);
  while (queue.length > 0) {
    const beam: Beam = queue.shift()!;
    if (
      beam.x < 0 ||
      beam.x >= data.length ||
      beam.y < 0 ||
      beam.y >= data[0].length ||
      visited.has(`${beam.x},${beam.y},${beam.dir}`)
    ) {
      continue;
    }
    energized.add(`${beam.x},${beam.y}`);
    visited.add(`${beam.x},${beam.y},${beam.dir}`);
    if (data[beam.x][beam.y] == ".") {
      switch (beam.dir) {
        case "up":
          north(queue, beam);
          break;
        case "right":
          west(queue, beam);
          break;
        case "down":
          south(queue, beam);
          break;
        case "left":
          east(queue, beam);
          break;
      }
    } else if (data[beam.x][beam.y] == "/") {
      switch (beam.dir) {
        case "up":
          east(queue, beam);
          break;
        case "right":
          south(queue, beam);
          break;
        case "down":
          west(queue, beam);
          break;
        case "left":
          north(queue, beam);
          break;
      }
    } else if (data[beam.x][beam.y] == "\\") {
      switch (beam.dir) {
        case "up":
          west(queue, beam);
          break;
        case "right":
          north(queue, beam);
          break;
        case "down":
          east(queue, beam);
          break;
        case "left":
          south(queue, beam);
          break;
      }
    } else if (data[beam.x][beam.y] == "|") {
      switch (beam.dir) {
        case "up":
          north(queue, beam);
          break;
        case "down":
          south(queue, beam);
          break;
        case "left":
        case "right":
          north(queue, beam);
          south(queue, beam);
          break;
      }
    } else if (data[beam.x][beam.y] == "-") {
      switch (beam.dir) {
        case "right":
          west(queue, beam);
          break;
        case "left":
          east(queue, beam);
          break;
        case "up":
        case "down":
          west(queue, beam);
          east(queue, beam);
          break;
      }
    }
  }
  return energized.size;
};

export const process1 = (input: string): number => {
  const data: string[][] = input.split("\n").map((line) => line.split(""));
  return calc(data, { x: 0, y: 0, dir: "left" });
};

export const process2 = (input: string): number => {
  const data: string[][] = input.split("\n").map((line) => line.split(""));
  let bestVal: number | undefined = undefined;
  for (let j = 0; j < data[0].length; j++) {
    const val1 = calc(data, { x: 0, y: j, dir: "down" });
    if (bestVal == undefined || val1 > bestVal) {
      bestVal = val1;
    }
    const val2 = calc(data, { x: data.length - 1, y: j, dir: "up" });
    if (bestVal == undefined || val2 > bestVal) {
      bestVal = val2;
    }
  }
  for (let i = 0; i < data.length; i++) {
    const val1 = calc(data, { x: i, y: 0, dir: "right" });
    if (bestVal == undefined || val1 > bestVal) {
      bestVal = val1;
    }
    const val2 = calc(data, { x: i, y: data[0].length - 1, dir: "left" });
    if (bestVal == undefined || val2 > bestVal) {
      bestVal = val2;
    }
  }
  return bestVal!;
};
