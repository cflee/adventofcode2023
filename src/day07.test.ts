import { expect, test } from "@jest/globals";
import { process1, process2 } from "./day06";
import { getNonEmptyLines, readFileToString } from "./utils";
import { parseInput, typeHand } from "./day07";

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

test("typeHand", () => {
  expect(typeHand({ cards: "AAAAA", bid: 1 })).toEqual({
    type: 7,
    cards: "AAAAA",
    bid: 1,
  });
  expect(typeHand({ cards: "AA8AA", bid: 1 })).toEqual({
    type: 6,
    cards: "AA8AA",
    bid: 1,
  });
  expect(typeHand({ cards: "23332", bid: 1 })).toEqual({
    type: 5,
    cards: "23332",
    bid: 1,
  });
  expect(typeHand({ cards: "TTT98", bid: 1 })).toEqual({
    type: 4,
    cards: "TTT98",
    bid: 1,
  });
  expect(typeHand({ cards: "23432", bid: 1 })).toEqual({
    type: 3,
    cards: "23432",
    bid: 1,
  });
  expect(typeHand({ cards: "A23A4", bid: 1 })).toEqual({
    type: 2,
    cards: "A23A4",
    bid: 1,
  });
  expect(typeHand({ cards: "23456", bid: 1 })).toEqual({
    type: 1,
    cards: "23456",
    bid: 1,
  });

  expect(typeHand({ cards: "8AAAA", bid: 1 })).toEqual({
    type: 6,
    cards: "8AAAA",
    bid: 1,
  });
  expect(typeHand({ cards: "89TTT", bid: 1 })).toEqual({
    type: 4,
    cards: "89TTT",
    bid: 1,
  });
  expect(typeHand({ cards: "43322", bid: 1 })).toEqual({
    type: 3,
    cards: "43322",
    bid: 1,
  });
  expect(typeHand({ cards: "234AA", bid: 1 })).toEqual({
    type: 2,
    cards: "234AA",
    bid: 1,
  });
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
