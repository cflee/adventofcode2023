import { getNonEmptyLines } from "./utils";

interface Race {
  duration: number;
  distance: number;
}

export const parseInput = (lines: string[]): Race[] => {
  const races: Race[] = [];
  const times = [...lines[0].matchAll(/(\d+)\w*/g)].map((match) =>
    parseInt(match[0], 10),
  );
  const dists = [...lines[1].matchAll(/(\d+)\w*/g)].map((match) =>
    parseInt(match[0], 10),
  );
  times.forEach((time, idx) => {
    races.push({
      duration: time,
      distance: dists[idx],
    });
  });
  return races;
};

export const parseInput2 = (lines: string[]): Race => {
  const time = parseInt(
    [...lines[0].matchAll(/(\d+)/g)]
      .map((match) => match[0])
      .reduce((prev, cur) => prev + cur, ""),
    10,
  );
  const dist = parseInt(
    [...lines[1].matchAll(/(\d+)/g)]
      .map((match) => match[0])
      .reduce((prev, cur) => prev + cur, ""),
    10,
  );
  return {
    duration: time,
    distance: dist,
  };
};

export const countWays = (race: Race): number => {
  let count = 0;
  for (let dur = 0; dur < race.duration; dur++) {
    if (dur * (race.duration - dur) > race.distance) {
      count++;
    }
  }
  return count;
};

export const countWays2 = (race: Race): number => {
  let l = 0;
  let r = race.duration;
  while (l < r) {
    const c = Math.floor((l + r) / 2);
    const dist = c * (race.duration - c);
    if (dist > race.distance) {
      r = c;
    } else if (dist <= race.distance) {
      l = c + 1;
    }
  }
  return race.duration - 2 * l + 1;
};

export const process1 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const races: Race[] = parseInput(lines);
  return races
    .map((race) => countWays(race))
    .reduce((prev, cur) => prev * cur, 1);
};

export const process2 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const race: Race = parseInput2(lines);
  return countWays2(race);
};
