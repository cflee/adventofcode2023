import { getLines, sumNumbers } from "./utils";

interface Pattern {
  data: string[];
}

export const parseInput = (lines: string[]): Pattern[] => {
  const results: Pattern[] = [];
  let start = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 0) {
      continue;
    }
    results.push({ data: lines.slice(start, i) });
    start = i + 1;
  }
  if (start != lines.length - 1) {
    results.push({ data: lines.slice(start, lines.length) });
  }
  return results;
};

interface Finding {
  // 1-indexed
  horizontal?: number;
  vertical?: number;
}

export const find = (pattern: Pattern): Finding => {
  const rowLength = pattern.data.length;
  const colLength = pattern.data[0].length;
  // try to find horizontals first
  // i as the 0th indexed row below the horizontal line of reflection is
  for (let i = 0; i < rowLength - 1; i++) {
    if (pattern.data[i] == pattern.data[i + 1]) {
      // candidate row, now verify the rest of the reflection
      let ok = true;
      for (let k = 1; k < Math.min(rowLength - 1 - i, i + 1); k++) {
        if (pattern.data[i - k] != pattern.data[i + 1 + k]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        return {
          horizontal: i + 1,
        };
      }
    }
  }
  // j as the 0th indexed column to the left of the vertical line of reflection
  for (let j = 0; j < colLength - 1; j++) {
    let identical = true;
    for (let i = 0; i < rowLength; i++) {
      if (pattern.data[i].charAt(j) != pattern.data[i].charAt(j + 1)) {
        identical = false;
        break;
      }
    }
    if (identical) {
      // candidate col, now verify the rest of the reflection
      let ok = true;
      for (let k = 1; k < Math.min(colLength - 1 - j, j + 1); k++) {
        for (let i = 0; i < rowLength; i++) {
          if (
            pattern.data[i].charAt(j - k) != pattern.data[i].charAt(j + 1 + k)
          ) {
            ok = false;
            break;
          }
        }
      }
      if (ok) {
        return {
          vertical: j + 1,
        };
      }
    }
  }
  throw new Error(`No finding found in ${pattern}`);
};

export const find2 = (pattern: Pattern): Finding => {
  const previousFinding = find(pattern);
  const rowLength = pattern.data.length;
  const colLength = pattern.data[0].length;
  // try to find horizontals first
  // i as the 0th indexed row below the horizontal line of reflection is
  for (let i = 0; i < rowLength - 1; i++) {
    let horImperfections: number = 0;
    for (let j = 0; j < colLength; j++) {
      if (pattern.data[i].charAt(j) != pattern.data[i + 1].charAt(j)) {
        horImperfections++;
      }
    }
    if (horImperfections <= 1) {
      for (let k = 1; k < Math.min(rowLength - 1 - i, i + 1); k++) {
        for (let j = 0; j < colLength; j++) {
          if (
            pattern.data[i - k].charAt(j) != pattern.data[i + 1 + k].charAt(j)
          ) {
            horImperfections++;
          }
        }
      }
      if (horImperfections == 1 && previousFinding.horizontal != i + 1) {
        return {
          horizontal: i + 1,
        };
      }
    }
  }
  // j as the 0th indexed column to the left of the vertical line of reflection
  for (let j = 0; j < colLength - 1; j++) {
    let verImperfections: number = 0;
    for (let i = 0; i < rowLength; i++) {
      if (pattern.data[i].charAt(j) != pattern.data[i].charAt(j + 1)) {
        verImperfections++;
      }
    }
    if (verImperfections <= 1) {
      for (let k = 1; k < Math.min(colLength - 1 - j, j + 1); k++) {
        for (let i = 0; i < rowLength; i++) {
          if (
            pattern.data[i].charAt(j - k) != pattern.data[i].charAt(j + 1 + k)
          ) {
            verImperfections++;
          }
        }
      }
      if (verImperfections == 1 && previousFinding.vertical != j + 1) {
        return {
          vertical: j + 1,
        };
      }
    }
  }
  throw new Error("this pattern has no lines");
};

export const process1 = (input: string): number => {
  return parseInput(getLines(input))
    .map((pattern) => find(pattern))
    .map((finding) => {
      if (finding.horizontal) {
        return finding.horizontal * 100;
      } else if (finding.vertical) {
        return finding.vertical;
      } else {
        throw new Error("found a finding with no data");
      }
    })
    .reduce(sumNumbers, 0);
};

export const process2 = (input: string): number => {
  return parseInput(getLines(input))
    .map((pattern) => find2(pattern))
    .map((finding) => {
      return (finding.horizontal ?? 0) * 100 + (finding.vertical ?? 0);
    })
    .reduce(sumNumbers, 0);
};
