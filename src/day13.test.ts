import { expect, test } from "@jest/globals";
import { find, find2, parseInput, process1, process2 } from "./day13";
import { getLines, readFileToString } from "./utils";

const sampleInput1 = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const input = readFileToString("day13");

test("parseInput", () => {
  expect(parseInput(getLines(sampleInput1))).toEqual([
    {
      data: [
        "#.##..##.",
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
        "..##..##.",
        "#.#.##.#.",
      ],
    },
    {
      data: [
        "#...##..#",
        "#....#..#",
        "..##..###",
        "#####.##.",
        "#####.##.",
        "..##..###",
        "#....#..#",
      ],
    },
  ]);
});

test("find", () => {
  const patterns = parseInput(getLines(sampleInput1));
  // horizontal
  expect(find(patterns[1])).toEqual({
    horizontal: 4,
  });
  // vertical
  expect(find(patterns[0])).toEqual({
    vertical: 5,
  });
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(405);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(33356);
});

test("find2", () => {
  const patterns = parseInput(getLines(sampleInput1));
  expect(find2(patterns[0])).toEqual({
    horizontal: 3,
  });
  expect(find2(patterns[1])).toEqual({
    horizontal: 1,
  });

  // bug: ensure existing lines of reflection are not used
  expect(
    find2(
      parseInput(
        getLines(`###.#.#...#.###
..##.#####.###.
..##.#####.###.
###.#.....#.###
###..#.#...####
###....##..##..
###..#.###..##.
...#.###.##..#.
#######...##.##
##.#..#.#..#.##
###..#.#..#....`),
      )[0],
    ),
  ).toEqual({
    horizontal: 2,
  });

  // bug: two types of lines of reflection after smudge fix
  expect(
    find2(
      parseInput([
        "........#",
        "..####...",
        "#.####.##",
        "#.#..#.##",
        "##.##.###",
        ".######..",
        ".#....#..",
        ".#....#..",
        "..####...",
      ])[0],
    ),
  ).toEqual({
    vertical: 8,
  });
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(400);
});

test("part 2 regression", () => {
  // 30248 is wrong
  // 30275 is too high
  expect(process2(input)).toBe(28475);
});
