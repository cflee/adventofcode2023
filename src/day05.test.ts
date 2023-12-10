import { expect, test } from "@jest/globals";
import {
  parseInput,
  process1,
  process2,
  processMap,
  reverseMap,
} from "./day05";
import { getLines, readFileToString } from "./utils";

const sampleInput1 = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const input = readFileToString("day05");

test("parseInput", () => {
  expect(
    parseInput(
      getLines(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48
`),
    ),
  ).toEqual({
    starts: [79, 14, 55, 13],
    maps: [
      {
        records: [
          {
            destinationStart: 50,
            sourceStart: 98,
            length: 2,
          },
          {
            destinationStart: 52,
            sourceStart: 50,
            length: 48,
          },
        ],
      },
    ],
  });
});

test("processMap", () => {
  const map = {
    records: [
      {
        destinationStart: 50,
        sourceStart: 98,
        length: 2,
      },
      {
        destinationStart: 52,
        sourceStart: 50,
        length: 48,
      },
    ],
  };
  expect(processMap(0, map)).toBe(0);
  expect(processMap(49, map)).toBe(49);
  expect(processMap(50, map)).toBe(52);
  expect(processMap(51, map)).toBe(53);
  expect(processMap(97, map)).toBe(99);
  expect(processMap(98, map)).toBe(50);
  expect(processMap(99, map)).toBe(51);
});

test("reverseMap", () => {
  const map = {
    records: [
      {
        destinationStart: 50,
        sourceStart: 98,
        length: 2,
      },
      {
        destinationStart: 52,
        sourceStart: 50,
        length: 48,
      },
    ],
  };
  expect(reverseMap(0, map)).toBe(0);
  expect(reverseMap(49, map)).toBe(49);
  expect(reverseMap(52, map)).toBe(50);
  expect(reverseMap(53, map)).toBe(51);
  expect(reverseMap(99, map)).toBe(97);
  expect(reverseMap(50, map)).toBe(98);
  expect(reverseMap(51, map)).toBe(99);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(35);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(662197086);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(46);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(52510809);
});
