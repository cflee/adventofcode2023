import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day10";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = String.raw`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const sampleInput2 = String.raw`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const input = readFileToString("day10");

test("part 1 example 1", () => {
  expect(process1(sampleInput1)).toBe(4);
});

test("part 1 example 2", () => {
  expect(process1(sampleInput2)).toBe(8);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(6875);
});

// test("part 2 example 1", () => {
//   expect(process2(sampleInput1)).toBe(-1);
// });

// test("part 2 example 2", () => {
//   expect(process2(sampleInput2)).toBe(-1);
// });

// test("part 2 regression", () => {
//   expect(process2(input)).toEqual(-1);
// });
