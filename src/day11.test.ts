import { expect, test } from "@jest/globals";
import {
  calcDist,
  findGalaxies,
  findEmpties,
  process1,
  process2,
} from "./day11";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const input = readFileToString("day11");

test("identifyEmpties", () => {
  expect(findEmpties(getNonEmptyLines(sampleInput1))).toEqual({
    cols: [2, 5, 8],
    rows: [3, 7],
  });
});

test("findGalaxies", () => {
  expect(findGalaxies(getNonEmptyLines(sampleInput1))).toEqual([
    { row: 0, col: 3 },
    { row: 1, col: 7 },
    { row: 2, col: 0 },
    { row: 4, col: 6 },
    { row: 5, col: 1 },
    { row: 6, col: 9 },
    { row: 8, col: 7 },
    { row: 9, col: 0 },
    { row: 9, col: 4 },
  ]);
});

test("calcDist", () => {
  expect(
    calcDist(
      { row: 5, col: 1 },
      { row: 9, col: 4 },
      {
        cols: [2, 5, 8],
        rows: [3, 7],
      },
      2,
    ),
  ).toBe(9);
  expect(
    calcDist(
      { row: 5, col: 1 },
      { row: 8, col: 7 },
      {
        cols: [2, 5, 8],
        rows: [3, 7],
      },
      2,
    ),
  ).toBe(12);
  expect(
    calcDist(
      { row: 0, col: 3 },
      { row: 2, col: 0 },
      {
        cols: [2, 5, 8],
        rows: [3, 7],
      },
      2,
    ),
  ).toBe(6);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(374);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(9599070);
});

test("part 2 example", () => {
  expect(process2(sampleInput1, 10)).toBe(1030);
  expect(process2(sampleInput1, 100)).toBe(8410);
});

test("part 2 regression", () => {
  expect(process2(input, 1000000)).toBe(842645913794);
});
