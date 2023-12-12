import { getNonEmptyLines, sumNumbers } from "./utils";

interface Documents {
  instructions: string;
  nodes: Map<string, string[]>;
}

export const parseInput = (lines: string[]): Documents => {
  const instructions: string = lines[0];
  const nodes: Map<string, string[]> = new Map();
  lines.forEach((line, idx) => {
    if (idx == 0) {
      return;
    }
    nodes.set(line.substring(0, 3), [
      line.substring(7, 10),
      line.substring(12, 15),
    ]);
  });
  return {
    instructions,
    nodes,
  };
};

export const process1 = (input: string): number => {
  const data = parseInput(getNonEmptyLines(input));
  let cur = "AAA";
  let count = 0;
  while (cur != "ZZZ") {
    const instr = data.instructions.charAt(count % data.instructions.length);
    switch (instr) {
      case "L":
        cur = data.nodes.get(cur)![0];
        break;
      case "R":
        cur = data.nodes.get(cur)![1];
        break;
    }
    count++;
  }
  return count;
};

export const process2 = (input: string): number => {
  const data = parseInput(getNonEmptyLines(input));
  const curs = [...data.nodes.keys()].filter((n) => n.charAt(2) == "A");
  let count = 0;
  while (curs.filter((n) => n.charAt(2) == "Z").length != curs.length) {
    const instr = data.instructions.charAt(count % data.instructions.length);
    for (let i = 0; i < curs.length; i++) {
      switch (instr) {
        case "L":
          curs[i] = data.nodes.get(curs[i])![0];
          break;
        case "R":
          curs[i] = data.nodes.get(curs[i])![1];
          break;
      }
    }
    count++;
  }
  return count;
};
