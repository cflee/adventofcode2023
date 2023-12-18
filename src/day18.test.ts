import { expect, test } from "@jest/globals";
import { parseInput, process1, process2 } from "./day18";
import { getLines, readFileToString } from "./utils";

const sampleInput1 = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

const input = readFileToString("day18");

// test("parseInput", () => {});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(62);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(28911);
});

// test("part 2 example", () => {
//   expect(process2(sampleInput1)).toBe(-1);
// });

// test("part 2 regression", () => {
//   expect(process2(input)).toBe(-1);
// });
