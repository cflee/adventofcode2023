import { getLines, getNonEmptyLines, sumNumbers } from "./utils";

export const parseInput = (lines: string[]): number[][] => {
  return lines.map((line) => line.split(" ").map((n) => parseInt(n, 10)));
};

export const calc = (nums: number[]): number => {
  let isAllZeroes = true;
  const diffs: number[] = [];
  for (let i = 1; i < nums.length; i++) {
    diffs[i - 1] = nums[i] - nums[i - 1];
    if (diffs[i - 1] != 0) {
      isAllZeroes = false;
    }
  }
  if (isAllZeroes) {
    return nums[nums.length - 1];
  }
  return calc(diffs) + nums[nums.length - 1];
};

export const calc2 = (nums: number[]): number => {
  let isAllZeroes = true;
  const diffs: number[] = [];
  for (let i = 1; i < nums.length; i++) {
    diffs[i - 1] = nums[i] - nums[i - 1];
    if (diffs[i - 1] != 0) {
      isAllZeroes = false;
    }
  }
  if (isAllZeroes) {
    return nums[0];
  }
  return nums[0] - calc2(diffs);
};

export const process1 = (input: string): number => {
  return parseInput(getNonEmptyLines(input))
    .map((line) => calc(line))
    .reduce(sumNumbers, 0);
};

export const process2 = (input: string): number => {
  return parseInput(getNonEmptyLines(input))
    .map((line) => calc2(line))
    .reduce(sumNumbers, 0);
};
