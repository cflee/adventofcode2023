import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day01";
import { readFileToString } from "./utils";

const sampleInput1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sampleInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const input: string = readFileToString("day01");

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(142);
});

test("part 2 example", () => {
  expect(process2(sampleInput2)).toBe(281);
});

test("process2 backwards compatible with part 1 example", () => {
  expect(process2(sampleInput1)).toBe(142);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(55108);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(56324);
});
