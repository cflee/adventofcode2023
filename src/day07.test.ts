import { expect, test } from "@jest/globals";
import { compareTypedHands, getTypedHand2, process1, process2 } from "./day07";
import { getNonEmptyLines, readFileToString } from "./utils";
import { parseInput, getTypedHand } from "./day07";

const sampleInput1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// https://www.reddit.com/r/adventofcode/comments/18cr4xr/2023_day_7_better_example_input_not_a_spoiler/
const sampleInput2 = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;

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

test("getTypedHand", () => {
  expect(getTypedHand({ cards: "AAAAA", bid: 1 })).toEqual({
    type: 7,
    cards: "AAAAA",
    bid: 1,
  });
  expect(getTypedHand({ cards: "AA8AA", bid: 1 })).toEqual({
    type: 6,
    cards: "AA8AA",
    bid: 1,
  });
  expect(getTypedHand({ cards: "23332", bid: 1 })).toEqual({
    type: 5,
    cards: "23332",
    bid: 1,
  });
  expect(getTypedHand({ cards: "TTT98", bid: 1 })).toEqual({
    type: 4,
    cards: "TTT98",
    bid: 1,
  });
  expect(getTypedHand({ cards: "23432", bid: 1 })).toEqual({
    type: 3,
    cards: "23432",
    bid: 1,
  });
  expect(getTypedHand({ cards: "A23A4", bid: 1 })).toEqual({
    type: 2,
    cards: "A23A4",
    bid: 1,
  });
  expect(getTypedHand({ cards: "23456", bid: 1 })).toEqual({
    type: 1,
    cards: "23456",
    bid: 1,
  });

  expect(getTypedHand({ cards: "8AAAA", bid: 1 })).toEqual({
    type: 6,
    cards: "8AAAA",
    bid: 1,
  });
  expect(getTypedHand({ cards: "89TTT", bid: 1 })).toEqual({
    type: 4,
    cards: "89TTT",
    bid: 1,
  });
  expect(getTypedHand({ cards: "43322", bid: 1 })).toEqual({
    type: 3,
    cards: "43322",
    bid: 1,
  });
  expect(getTypedHand({ cards: "234AA", bid: 1 })).toEqual({
    type: 2,
    cards: "234AA",
    bid: 1,
  });
});

test("compareTypedHands", () => {
  expect(
    compareTypedHands(
      getTypedHand({ cards: "33332", bid: 1 }),
      getTypedHand({ cards: "2AAAA", bid: 1 }),
      1,
    ),
  ).toBeGreaterThan(0);
  expect(
    compareTypedHands(
      getTypedHand({ cards: "77888", bid: 1 }),
      getTypedHand({ cards: "77788", bid: 1 }),
      1,
    ),
  ).toBeGreaterThan(0);

  const typedHands = parseInput(getNonEmptyLines(sampleInput1)).map((hand) =>
    getTypedHand(hand),
  );
  typedHands.sort((a, b) => compareTypedHands(a, b, 1));
  expect(typedHands[0].cards).toEqual("32T3K");
  expect(typedHands[1].cards).toEqual("KTJJT");
  expect(typedHands[2].cards).toEqual("KK677");
  expect(typedHands[3].cards).toEqual("T55J5");
  expect(typedHands[4].cards).toEqual("QQQJA");
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(6440);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(250254244);
});

test("getTypedHand2", () => {
  expect(getTypedHand2({ cards: "QJJQ2", bid: 1 })).toEqual({
    type: 6,
    cards: "QJJQ2",
    bid: 1,
  });

  expect(getTypedHand2({ cards: "32T3K", bid: 1 })).toEqual({
    type: 2,
    cards: "32T3K",
    bid: 1,
  });
  expect(getTypedHand2({ cards: "T55J5", bid: 1 })).toEqual({
    type: 6,
    cards: "T55J5",
    bid: 1,
  });
  expect(getTypedHand2({ cards: "KK677", bid: 1 })).toEqual({
    type: 3,
    cards: "KK677",
    bid: 1,
  });
  expect(getTypedHand2({ cards: "KTJJT", bid: 1 })).toEqual({
    type: 6,
    cards: "KTJJT",
    bid: 1,
  });
  expect(getTypedHand2({ cards: "QQQJA", bid: 1 })).toEqual({
    type: 6,
    cards: "QQQJA",
    bid: 1,
  });

  expect(getTypedHand2({ cards: "J33JJ", bid: 1 })).toEqual({
    type: 7,
    cards: "J33JJ",
    bid: 1,
  });
  expect(getTypedHand2({ cards: "1122J", bid: 1 })).toEqual({
    type: 5,
    cards: "1122J",
    bid: 1,
  });

  // bug: all jokers was not handled
  expect(getTypedHand2({ cards: "JJJJJ", bid: 1 })).toEqual({
    type: 7,
    cards: "JJJJJ",
    bid: 1,
  });
});

test("compareTypedHands2", () => {
  expect(
    compareTypedHands(
      getTypedHand2({ cards: "JKKK2", bid: 1 }),
      getTypedHand2({ cards: "QQQQ2", bid: 1 }),
      2,
    ),
  ).toBeLessThan(0);
  expect(
    compareTypedHands(
      getTypedHand2({ cards: "QQQQ2", bid: 1 }),
      getTypedHand2({ cards: "JKKK2", bid: 1 }),
      2,
    ),
  ).toBeGreaterThan(0);
  expect(
    compareTypedHands(
      getTypedHand2({ cards: "JJJJ1", bid: 1 }),
      getTypedHand2({ cards: "2JJJJ", bid: 1 }),
      2,
    ),
  ).toBeLessThan(0);
  expect(
    compareTypedHands(
      getTypedHand2({ cards: "JJ33K", bid: 1 }),
      getTypedHand2({ cards: "2222Q", bid: 1 }),
      2,
    ),
  ).toBeLessThan(0);
  expect(
    compareTypedHands(
      getTypedHand2({ cards: "98764", bid: 1 }),
      getTypedHand2({ cards: "98763", bid: 1 }),
      2,
    ),
  ).toBeGreaterThan(0);

  const typedHands = parseInput(getNonEmptyLines(sampleInput1)).map((hand) =>
    getTypedHand2(hand),
  );
  typedHands.sort((a, b) => compareTypedHands(a, b, 2));
  expect(typedHands[0].cards).toEqual("32T3K");
  expect(typedHands[1].cards).toEqual("KK677");
  expect(typedHands[2].cards).toEqual("T55J5");
  expect(typedHands[3].cards).toEqual("QQQJA");
  expect(typedHands[4].cards).toEqual("KTJJT");
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(5905);
});

test("part 2 regression", () => {
  // 249609189 is too low
  expect(process2(input)).toEqual(250087440);
});

test("part 1 ?", () => {
  expect(process1(sampleInput2)).toBe(6592);
});

test("part 2 ?", () => {
  expect(process2(sampleInput2)).toBe(6839);
});
