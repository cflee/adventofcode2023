import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day16";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;

const input = readFileToString("day16");

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(46);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(7111);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(51);
});

test("part 2 regression", () => {
  expect(process2(input)).toEqual(7831);
});
