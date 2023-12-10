import { expect, test } from "@jest/globals";
import {
  findMatches,
  parseLine,
  process1,
  process2,
  scoreMatches,
} from "./day04";
import { readFileToString } from "./utils";

const sampleInput1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const input = readFileToString("day04");

test("test input 1", () => {
  expect(process1(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`)).toBe(8);
});

test("test input 2", () => {
  expect(process1(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`)).toBe(8);
  expect(process1(`Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19`)).toBe(2);
  expect(process1(`Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`)).toBe(2);
  expect(process1(`Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83`)).toBe(1);
  expect(process1(`Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36`)).toBe(0);
  expect(process1(`Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)).toBe(0);
});

test("parseLine", () => {
  expect(parseLine(`Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`)).toEqual(
    {
      winningNumbers: [1, 21, 53, 59, 44],
      yourNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
    },
  );
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(13);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(17803);
});

test("findMatches", () => {
  const card = parseLine(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`);
  expect(findMatches(card.winningNumbers, card.yourNumbers)).toBe(4);
});

test("scoreMatches", () => {
  const card = parseLine(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`);
  expect(scoreMatches(card.winningNumbers, card.yourNumbers)).toBe(8);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(30);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(5554894);
});
