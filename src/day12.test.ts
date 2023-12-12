import { expect, test } from "@jest/globals";
import {
  arrangements,
  parseInput,
  process1,
  process2,
  unfoldLine,
} from "./day12";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const input = readFileToString("day12");

test("parseInput", () => {
  expect(
    parseInput(
      getNonEmptyLines(`???.### 1,1,3
.??..??...?##. 1,1,3`),
    ),
  ).toEqual([
    { condition: "???.###", sizes: [1, 1, 3] },
    { condition: ".??..??...?##.", sizes: [1, 1, 3] },
  ]);
});

test("arrangements", () => {
  expect(arrangements("#.#.###", 0, [1, 1, 3])).toBe(1);
  expect(arrangements(".#...#....###.", 0, [1, 1, 3])).toBe(1);

  expect(arrangements("???.###", 0, [1, 1, 3])).toBe(1);
  expect(arrangements(".??..??...?##.", 0, [1, 1, 3])).toBe(4);
  expect(arrangements("?#?#?#?#?#?#?#?", 0, [1, 3, 1, 6])).toBe(1);
  expect(arrangements("????.#...#...", 0, [4, 1, 1])).toBe(1);
  expect(arrangements("????.######..#####.", 0, [1, 6, 5])).toBe(4);
  expect(arrangements("?###????????", 0, [3, 2, 1])).toBe(10);

  expect(arrangements(".??#?.", 0, [1, 2])).toBe(1);
  expect(arrangements(".??#?.", 0, [2])).toBe(2);
  expect(arrangements(".??#?.??.", 0, [1, 2])).toBe(2);
  expect(arrangements(".??#?.???.", 0, [1, 2])).toBe(3);

  // from full input
  //                   0123456789x
  expect(arrangements("??#.?#?#???", 0, [1, 3, 1])).toBe(2);
  // bug: sizes satisfied but still some # in the rest of the string
  expect(arrangements(".?.????#??#", 0, [1, 1, 2])).toBe(4);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(21);
});

test("part 1 regression", () => {
  // NOT 7365
  expect(process1(input)).toBe(6935);
});

test("unfoldLine", () => {
  expect(unfoldLine({ condition: ".#", sizes: [1] })).toEqual({
    condition: ".#?.#?.#?.#?.#",
    sizes: [1, 1, 1, 1, 1],
  });
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(525152);
});

// test("part 2 regression", () => {
//   expect(process2(input)).toBe(-1);
// });
