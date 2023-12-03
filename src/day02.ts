type Combo = {
  blue: number;
  green: number;
  red: number;
};

type Game = {
  id: number;
  rounds: Combo[];
};

type GameWithMaxCombo = {
  id: number;
  maxCombo: Combo;
};

const maxValuesAcrossCombos = (combos: Combo[]): Combo => {
  const max: Combo = {
    blue: 0,
    green: 0,
    red: 0,
  };
  combos.forEach((combo) => {
    max.blue = Math.max(max.blue, combo.blue);
    max.green = Math.max(max.green, combo.green);
    max.red = Math.max(max.red, combo.red);
  });
  return max;
};

// 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const parseHands = (hands: string): Combo[] => {
  return hands.split("; ").map((hand) => {
    const combo: Combo = {
      blue: 0,
      green: 0,
      red: 0,
    };
    // 3 blue, 4 red
    hand.split(", ").forEach((qtyColour) => {
      // 3 blue
      const parts = qtyColour.split(" ");
      const qty = parseInt(parts[0], 10);
      if (parts[1] == "blue") {
        combo.blue = qty;
      } else if (parts[1] == "green") {
        combo.green = qty;
      } else if (parts[1] == "red") {
        combo.red = qty;
      } else {
        console.log(`unexpected colour ${parts[1]}`);
      }
    });
    return combo;
  });
};

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const parseGame = (line: string): Game => {
  const parts = line.split(": ");
  return {
    id: parseInt(parts[0].substring(5), 10),
    rounds: parseHands(parts[1]),
  };
};

export const process1 = (input: string): number => {
  return input
    .split("\n")
    .filter((line): boolean => line.length > 0)
    .map((line): Game => parseGame(line))
    .map(
      (game): GameWithMaxCombo => ({
        id: game.id,
        maxCombo: maxValuesAcrossCombos(game.rounds),
      }),
    )
    .filter(
      (game): boolean =>
        game.maxCombo.blue <= 14 &&
        game.maxCombo.green <= 13 &&
        game.maxCombo.red <= 12,
    )
    .reduce((prev, cur): number => prev + cur.id, 0);
};

export const process2 = (input: string): number => {
  return input
    .split("\n")
    .filter((line): boolean => line.length > 0)
    .map((line): Game => parseGame(line))
    .map(
      (game): GameWithMaxCombo => ({
        id: game.id,
        maxCombo: maxValuesAcrossCombos(game.rounds),
      }),
    )
    .map(
      (game): number =>
        game.maxCombo.blue * game.maxCombo.green * game.maxCombo.red,
    )
    .reduce((prev, cur): number => prev + cur, 0);
};
