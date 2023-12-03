import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day02";
import { readFileToString } from "./utils";

const sampleInput1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const input = readFileToString("day02");

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(8);
});

test("part 1 test", () => {
  expect(
    process1(`Game 1: 15 blue
Game 2: 14 green
Game 3: 13 red
Game 7: 14 blue, 14 green
Game 11: 13 green, 13 red
Game 13: 12 red, 14 green
Game 17: 13 green, 12 red, 14 blue`),
  ).toBe(17);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(2486);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(2286);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(87984);
});
