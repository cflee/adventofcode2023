type TileSymbol = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

type Direction = "N" | "E" | "S" | "W";

const oppDirection: { [d in Direction]: Direction } = {
  E: "W",
  W: "E",
  N: "S",
  S: "N",
};

interface Tile {
  connections: Direction[];
}

const tiles: { [s in TileSymbol]: Tile } = {
  "|": { connections: ["N", "S"] },
  "-": { connections: ["E", "W"] },
  L: { connections: ["N", "E"] },
  J: { connections: ["N", "W"] },
  "7": { connections: ["S", "W"] },
  F: { connections: ["S", "E"] },
  ".": { connections: [] },
  S: { connections: ["N", "S", "E", "W"] },
};

export const parseInput = (input: string): Tile[][] => {
  return input
    .split("\n")
    .map((line) => line.split("").map((t) => tiles[t as TileSymbol]));
};

const isValidCoordinate = (grid: Tile[][], r: number, c: number): boolean =>
  r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;

const nextCoordinate = (
  r: number,
  c: number,
  side: Direction,
): { r: number; c: number } => {
  if (side == "N") {
    return { r: r - 1, c };
  } else if (side == "S") {
    return { r: r + 1, c };
  } else if (side == "E") {
    return { r, c: c + 1 };
  } else if (side == "W") {
    return { r, c: c - 1 };
  }
  throw new Error();
};

const isConnected = (
  grid: Tile[][],
  fromR: number,
  fromC: number,
  fromExitSide: Direction,
): boolean => {
  const to = nextCoordinate(fromR, fromC, fromExitSide);
  if (!isValidCoordinate(grid, to.r, to.c)) {
    return false;
  }
  return (
    grid[fromR][fromC].connections.includes(fromExitSide) &&
    grid[to.r][to.c].connections.includes(oppDirection[fromExitSide])
  );
};

interface State {
  r: number;
  c: number;
  len: number;
  enterSide: Direction;
}

const makeNextState = (
  grid: Tile[][],
  fromR: number,
  fromC: number,
  fromExitSide: Direction,
  curLen: number,
): State | undefined => {
  const to = nextCoordinate(fromR, fromC, fromExitSide);
  if (!isValidCoordinate(grid, to.r, to.c)) {
    return undefined;
  }
  return {
    r: to.r,
    c: to.c,
    len: curLen + 1,
    enterSide: oppDirection[fromExitSide],
  };
};

export const process1 = (input: string): number => {
  const grid = parseInput(input);
  const queue: State[] = [];
  // find the S
  outer: for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j].connections.length != 4) {
        continue;
      }
      if (isConnected(grid, i, j, "E")) {
        queue.push({
          r: i,
          c: j + 1,
          len: 1,
          enterSide: oppDirection["E"],
        });
      }
      if (isConnected(grid, i, j, "S")) {
        queue.push({
          r: i + 1,
          c: j,
          len: 1,
          enterSide: oppDirection["S"],
        });
      }
      if (isConnected(grid, i, j, "W")) {
        queue.push({
          r: i,
          c: j - 1,
          len: 1,
          enterSide: oppDirection["W"],
        });
      }
      if (isConnected(grid, i, j, "N")) {
        queue.push({
          r: i - 1,
          c: j,
          len: 1,
          enterSide: oppDirection["N"],
        });
      }
      break outer;
    }
  }
  // start the BFS from the two neighbours entering with a specific side
  let maxLen = 0;
  const visited = new Map<string, number>();
  while (queue.length > 0) {
    const cur = queue.shift()!;

    if (visited.has(`${cur.r}#${cur.c}`)) {
      continue;
    }
    visited.set(`${cur.r}#${cur.c}`, cur.len);
    if (cur.len > maxLen) {
      maxLen = cur.len;
    }

    const otherDirection = grid[cur.r][cur.c].connections.filter(
      (dir) => dir != cur.enterSide,
    );
    if (otherDirection.length != 1) {
      throw new Error();
    }
    const newState = makeNextState(
      grid,
      cur.r,
      cur.c,
      otherDirection[0],
      cur.len,
    );
    if (newState != undefined) {
      queue.push(newState);
    }
  }
  return maxLen;
};

export const process2 = (input: string): number => {
  const grid = parseInput(input);
  return -1;
};
