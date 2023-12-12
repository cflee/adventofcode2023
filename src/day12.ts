import { getNonEmptyLines, sumNumbers } from "./utils";

interface Line {
  condition: string;
  sizes: number[];
}

export const parseInput = (lines: string[]): Line[] => {
  return lines.map((str) => {
    const p: string[] = str.split(" ");
    const n: number[] = p[1].split(",").map((m) => parseInt(m, 10));
    return {
      condition: p[0],
      sizes: n,
    };
  });
};

const cache = new Map();

export const arrangements = (
  condition: string,
  start: number,
  sizes: number[],
): number => {
  const cacheKey = `${condition}#${start}#${sizes.toString()}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  if (sizes.length == 0) {
    if (condition.substring(start).indexOf("#") != -1) {
      cache.set(cacheKey, 0);
      return 0;
    }
    cache.set(cacheKey, 1);
    return 1;
  }
  if (start >= condition.length) {
    cache.set(cacheKey, 0);
    return 0;
  }
  let x = start;
  // look for next # or ?
  while (x < condition.length && condition.charAt(x) == ".") {
    x++;
  }
  if (x >= condition.length) {
    cache.set(cacheKey, 0);
    return 0;
  }
  // we are now at a # or ?
  const xCandidate = x;
  let result = 0;
  // find all contiguous # or ? to meet our next target
  let targetSize = sizes[0];
  while (x < condition.length && condition.charAt(x) != "." && targetSize > 0) {
    targetSize--;
    x++;
  }
  if (targetSize == 0) {
    // x is already pointing at the next element after the required number
    // but we need to leave one gap empty to be a standalone group
    // if x is a #, then we can't leave that gap, and this is invalid
    if (x >= condition.length || condition.charAt(x) != "#") {
      const newSizes = [...sizes];
      newSizes.shift();
      result += arrangements(condition, x + 1, newSizes);
    }
  }
  if (condition.charAt(xCandidate) == "?") {
    // xCandidate is pointing at the ?, but we want to try skipping it
    result += arrangements(condition, xCandidate + 1, sizes);
  }
  cache.set(cacheKey, result);
  return result;
};

export const unfoldLine = (line: Line): Line => {
  let condition = line.condition;
  let sizes = [...line.sizes];
  for (let i = 0; i < 4; i++) {
    condition = condition + "?" + line.condition;
    sizes.push(...line.sizes);
  }
  return {
    condition,
    sizes,
  };
};

export const process1 = (input: string): number => {
  return parseInput(getNonEmptyLines(input))
    .map((line) => arrangements(line.condition, 0, line.sizes))
    .reduce(sumNumbers, 0);
};

export const process2 = (input: string): number => {
  return parseInput(getNonEmptyLines(input))
    .map((line) => unfoldLine(line))
    .map((line) => arrangements(line.condition, 0, line.sizes))
    .reduce(sumNumbers, 0);
};
