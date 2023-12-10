import { expect, test } from "@jest/globals";
import {
  countWays,
  countWays2,
  parseInput,
  parseInput2,
  process1,
  process2,
} from "./day06";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = `Time:      7  15   30
Distance:  9  40  200`;

const input = readFileToString("day06");

test("parseInput", () => {
  expect(parseInput(getNonEmptyLines(sampleInput1))).toEqual([
    { duration: 7, distance: 9 },
    { duration: 15, distance: 40 },
    { duration: 30, distance: 200 },
  ]);
});

test("countWays", () => {
  expect(countWays({ duration: 7, distance: 9 })).toBe(4);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(288);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(32076);
});

test("parseInput2", () => {
  expect(parseInput2(getNonEmptyLines(sampleInput1))).toEqual({
    duration: 71530,
    distance: 940200,
  });
});

test("countWays2 regression", () => {
  expect(countWays2({ duration: 7, distance: 9 })).toBe(4);
  expect(countWays2({ duration: 15, distance: 40 })).toBe(8);
  expect(countWays2({ duration: 30, distance: 200 })).toBe(9);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(71503);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(34278221);
});
