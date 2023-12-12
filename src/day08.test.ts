import { expect, test } from "@jest/globals";
import { parseInput, process1, process2 } from "./day08";
import { getNonEmptyLines, readFileToString } from "./utils";

const sampleInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const sampleInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const sampleInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const input = readFileToString("day08");

test("parseInput", () => {
  const documents = parseInput(getNonEmptyLines(sampleInput2));
  expect(documents.instructions).toEqual("LLR");
  expect(documents.nodes.get("AAA")).toEqual(["BBB", "BBB"]);
  expect(documents.nodes.get("BBB")).toEqual(["AAA", "ZZZ"]);
  expect(documents.nodes.get("ZZZ")).toEqual(["ZZZ", "ZZZ"]);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(2);
  expect(process1(sampleInput2)).toBe(6);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(12361);
});

test("part 2 example", () => {
  expect(process2(sampleInput3)).toBe(6);
});

test("part 2 regression", () => {
  expect(process2(input)).toEqual(-1);
});
