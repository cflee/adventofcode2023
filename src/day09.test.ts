import { expect, test } from "@jest/globals";
import { calc, calc2, parseInput, process1, process2 } from "./day09";
import { getLines, readFileToString } from "./utils";

const sampleInput1 = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const input = readFileToString("day09");

test("parseInput", () => {
  expect(parseInput(getLines(sampleInput1))).toEqual([
    [0, 3, 6, 9, 12, 15],
    [1, 3, 6, 10, 15, 21],
    [10, 13, 16, 21, 30, 45],
  ]);
});

test("calc", () => {
  expect(calc([2, 2, 2])).toBe(2);
  expect(calc([0, 2, 4, 6])).toBe(8);
  expect(calc([3, 3, 5, 9, 15])).toBe(23);
  expect(calc([10, 13, 16, 21, 30, 45])).toBe(68);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(114);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(2101499000);
});

test("calc2", () => {
  expect(calc2([2, 2, 2])).toBe(2);
  expect(calc2([0, 2, 4, 6])).toBe(-2);
  expect(calc2([3, 3, 5, 9, 15])).toBe(5);
  expect(calc2([10, 13, 16, 21, 30, 45])).toBe(5);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(2);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(1089);
});
