import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day17";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = String.raw`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

const sampleInput2 = String.raw`111111111111
999999999991
999999999991
999999999991
999999999991`;

const input = readFileToString("day17");

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(102);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(861);
});

test("part 2 example 1", () => {
  expect(process2(sampleInput1)).toBe(94);
});

test("part 2 example 2", () => {
  expect(process2(sampleInput2)).toBe(71);
});

test("part 2 regression", () => {
  expect(process2(input)).toEqual(1037);
});
