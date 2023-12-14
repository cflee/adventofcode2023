import { getLines } from "./utils";

interface Conversion {
  destinationStart: number;
  sourceStart: number;
  length: number;
}

interface Map {
  records: Conversion[];
}

interface Almanac {
  starts: number[];
  maps: Map[];
}

export const parseInput = (lines: string[]): Almanac => {
  const starts: number[] = lines[0]
    .substring(7)
    .split(" ")
    .map((v) => parseInt(v, 10));
  const maps: Map[] = [];
  let records: Conversion[] = [];
  for (let i = 3; i < lines.length; i++) {
    if (lines[i].length == 0) {
      maps.push({ records: records });
      records = [];
      i++;
      continue;
    }
    const p = lines[i].split(" ").map((v) => parseInt(v, 10));
    records.push({
      destinationStart: p[0],
      sourceStart: p[1],
      length: p[2],
    });
  }
  if (records.length > 0) {
    maps.push({ records: records });
  }
  return {
    starts,
    maps,
  };
};

export const processMap = (input: number, map: Map): number => {
  let result: number | undefined = undefined;
  map.records.forEach((record) => {
    if (
      input >= record.sourceStart &&
      input < record.sourceStart + record.length
    ) {
      result = input - record.sourceStart + record.destinationStart;
    }
  });
  if (result != undefined) {
    return result;
  }
  return input;
};

export const reverseMap = (input: number, map: Map): number => {
  let result: number | undefined = undefined;
  map.records.forEach((record) => {
    if (
      input >= record.destinationStart &&
      input < record.destinationStart + record.length
    ) {
      result = input - record.destinationStart + record.sourceStart;
    }
  });
  if (result != undefined) {
    return result;
  }
  return input;
};

export const process1 = (input: string): number => {
  const lines: string[] = getLines(input);
  const almanac: Almanac = parseInput(lines);
  const nums: number[] = almanac.starts.map((start) => {
    let num = start;
    almanac.maps.forEach((map) => (num = processMap(num, map)));
    return num;
  });
  return Math.min(...nums);
};

export const process2 = (input: string): number => {
  const lines: string[] = getLines(input);
  const almanac: Almanac = parseInput(lines);
  let end = 0;
  almanac.maps.reverse();
  while (true) {
    let num = end;
    almanac.maps.forEach((map) => {
      num = reverseMap(num, map);
    });
    for (let i = 0; i < almanac.starts.length; i += 2) {
      if (
        num >= almanac.starts[i] &&
        num < almanac.starts[i] + almanac.starts[i + 1]
      ) {
        return end;
      }
    }
    end++;
  }
};
