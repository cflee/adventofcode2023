import { expect, test } from "@jest/globals";
import {
  parseInput,
  process1,
  process2,
  spin,
  tiltEast,
  tiltNorth,
  tiltSouth,
  tiltWest,
} from "./day14";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

const input = readFileToString("day14");

const printFormat = (res: string[][]) =>
  res.map((line) => line.join("")).join("\n");

test("tiltNorth", () => {
  const res = tiltNorth(parseInput(getNonEmptyLines(sampleInput1)));
  // console.log(res.map((line) => line.join("")).join("\n"));
  expect(res).toEqual(
    parseInput(
      getNonEmptyLines(`OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`),
    ),
  );
});

test("tilts", () => {
  let res = tiltNorth(parseInput(getNonEmptyLines(sampleInput1)));
  expect(printFormat(res)).toEqual(`OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`);
  res = tiltWest(res);
  expect(printFormat(res)).toEqual(`OOOO.#O...
OO..#....#
OOO..##O..
O..#OO....
........#.
..#....#.#
O....#OO..
O.........
#....###..
#....#....`);
  res = tiltSouth(res);
  expect(printFormat(res)).toEqual(`.....#....
....#.O..#
O..O.##...
O.O#......
O.O....O#.
O.#..O.#.#
O....#....
OO....OO..
#O...###..
#O..O#....`);
  res = tiltEast(res);
  expect(printFormat(res)).toEqual(`.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`);
});

test("spin", () => {
  const res = spin(parseInput(getNonEmptyLines(sampleInput1)));
  expect(res).toEqual(
    parseInput(
      getNonEmptyLines(`.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`),
    ),
  );

  const res2 = spin(res);
  expect(res2).toEqual(
    parseInput(
      getNonEmptyLines(`.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`),
    ),
  );
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(136);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(109661);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(64);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(90176);
});
