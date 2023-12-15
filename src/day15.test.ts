import { expect, test } from "@jest/globals";
import { hash, process1, process2 } from "./day15";
import { readFileToString } from "./utils";

const sampleInput1 = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const input = readFileToString("day15");

test("hash", () => {
  expect(hash("HASH")).toBe(52);
});

test("lenses", () => {
  expect(hash("rn")).toBe(0);
  expect(hash("qp")).toBe(1);
  expect(hash("cm")).toBe(0);
});

test("part 1 example", () => {
  expect(process1(sampleInput1)).toBe(1320);
});

test("part 1 regression", () => {
  expect(process1(input)).toBe(507769);
});

test("part 2 example", () => {
  expect(process2(sampleInput1)).toBe(145);
});

test("part 2 regression", () => {
  expect(process2(input)).toBe(269747);
});
