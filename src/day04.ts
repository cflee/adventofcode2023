import { getNonEmptyLines, sumNumbers } from "./utils";

interface Card {
  winningNumbers: number[];
  yourNumbers: number[];
}

export const findMatches = (
  winningNumbers: number[],
  yourNumbers: number[],
): number => {
  const winning = new Set();
  winningNumbers.forEach((num) => winning.add(num));
  return yourNumbers
    .map((num) => winning.has(num))
    .map((v): number => (v ? 1 : 0))
    .reduce((prev, cur) => prev + cur, 0);
};

export const scoreMatches = (
  winningNumbers: number[],
  yourNumbers: number[],
): number => {
  const count = findMatches(winningNumbers, yourNumbers);
  if (count == 0) {
    return 0;
  }
  return Math.pow(2, count - 1);
};

export const parseLine = (line: string): Card => {
  const p1 = line.split(": ");
  const p2 = p1[1].split(" | ");
  const winningNumbers = p2[0]
    .split(" ")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));
  const yourNumbers = p2[1]
    .split(" ")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));
  return {
    winningNumbers,
    yourNumbers,
  };
};

export const process1 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const cards: Card[] = lines.map((line) => parseLine(line));
  return cards
    .map((card) => scoreMatches(card.winningNumbers, card.yourNumbers))
    .reduce(sumNumbers, 0);
};

export const process2 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  const cards: Card[] = lines.map((line) => parseLine(line));
  const cardQuantity: number[] = [];
  for (let i = 0; i < cards.length; i++) {
    cardQuantity[i] = 1;
  }
  for (let i = 0; i < cards.length; i++) {
    const card: Card = cards[i];
    const matches: number = findMatches(card.winningNumbers, card.yourNumbers);
    for (let j = 1; j <= matches; j++) {
      cardQuantity[i + j] += cardQuantity[i];
    }
  }
  return cardQuantity.reduce(sumNumbers, 0);
};
