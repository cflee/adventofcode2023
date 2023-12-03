import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day03";
import { readFileToString } from "./utils";

const sampleInput1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const input = readFileToString("day03");

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(4361);
});

test("test input 1", () => {
  expect(
    process1(`467..114..
...*......`),
  ).toBe(467);
});

test("test input 2", () => {
  expect(
    process1(`467..114..
...*......
..35..633.`),
  ).toBe(467 + 35);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(539713);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(467835);
});

test("part 2 test input 1 - 3-way gear", () => {
  expect(
    process2(`
467..114..
...*......
..5.5.....`),
  ).toBe(0);
});

test("part 2 test input 2 - 4-way gear", () => {
  expect(
    process2(`
467.114...
...*......
..5.5.....`),
  ).toBe(0);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(84159075);
});
