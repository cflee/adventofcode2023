import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day06";
import { getNonEmptyLines, readFileToString } from "./utils";
import { parseInput } from "./day07";

const sampleInput1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const input = readFileToString("day07");

test("parseInput", () => {
  expect(parseInput(["32T3K 765", "T55J5 684"])).toEqual([
    {
      cards: "32T3K",
      bid: 765,
    },
    {
      cards: "T55J5",
      bid: 684,
    },
  ]);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(6440);
});

// test("part 1 regression", () => {
//   expect(process1(input)).toBe(32076);
// });

// test("part 2 example", () => {
//   expect(process2(sampleInput1)).toBe(71503);
// });

// test("part 2 regression", () => {
//   expect(process2(input)).toBe(34278221);
// });
