import { sumNumbers } from "./utils";

export const hash = (input: string) => {
  let val: number = 0;
  for (let i = 0; i < input.length; i++) {
    val = ((val + input.charCodeAt(i)) * 17) % 256;
  }
  return val;
};

export const process1 = (input: string): number => {
  const parts = input.split(",");
  return parts.map((part) => hash(part)).reduce(sumNumbers, 0);
};

interface Lens {
  label: string;
  length: number;
}

export const process2 = (input: string): number => {
  const boxes: Lens[][] = [];
  for (let i = 0; i < 256; i++) {
    boxes[i] = [];
  }

  const instrs = input.split(",");
  instrs.forEach((instr, instrIdx) => {
    if (instr.charAt(instr.length - 2) == "=") {
      const parts = instr.split("=");
      const boxId = hash(parts[0]);
      const box = boxes[boxId];
      let found = false;
      box.forEach((lens) => {
        if (lens.label == parts[0]) {
          lens.length = parseInt(parts[1], 10);
          found = true;
        }
      });
      if (!found) {
        box.push({ label: parts[0], length: parseInt(parts[1]) });
      }
    } else {
      const parts = instr.split("-");
      const boxId = hash(parts[0]);
      const box = boxes[boxId];
      let found: number | undefined = undefined;
      box.forEach((lens, idx) => {
        if (lens.label == parts[0]) {
          found = idx;
        }
      });
      if (found != undefined) {
        box.splice(found, 1);
      }
    }
  });

  return boxes
    .map((box, boxIdx) =>
      box
        .map((lens, lensIdx) => (boxIdx + 1) * (lensIdx + 1) * lens.length)
        .reduce(sumNumbers, 0),
    )
    .reduce(sumNumbers, 0);
};
