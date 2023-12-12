import { getNonEmptyLines } from "./utils";

interface Hand {
  cards: string;
  bid: number;
}

interface TypedHand extends Hand {
  type: number;
}

export const parseInput = (lines: string[]): Hand[] => {
  return lines.map((line) => {
    const p = line.split(" ");
    return {
      cards: p[0],
      bid: parseInt(p[1], 10),
    };
  });
};

export const typeHand = (hand: Hand): TypedHand => {
  let bestType = 0;
  for (let i = 0; i < 5; i++) {
    const matches = hand.cards.match(new RegExp(hand.cards.charAt(i), "g"));
    if (matches!.length == 5) {
      if (bestType < 7) {
        bestType = 7;
      }
    } else if (matches!.length == 4) {
      if (bestType < 6) {
        bestType = 6;
      }
    } else if (matches!.length == 3) {
      for (let j = 0; j < 5; j++) {
        if (hand.cards.charAt(j) == hand.cards.charAt(i)) {
          continue;
        }
        const matches2 = hand.cards.match(
          new RegExp(hand.cards.charAt(j), "g"),
        );
        if (matches2!.length == 2) {
          if (bestType < 5) {
            bestType = 5;
          }
        } else {
          if (bestType < 4) {
            bestType = 4;
          }
        }
      }
    } else if (matches!.length == 2) {
      for (let j = 0; j < 5; j++) {
        if (hand.cards.charAt(j) == hand.cards.charAt(i)) {
          continue;
        }
        const matches2 = hand.cards.match(
          new RegExp(hand.cards.charAt(j), "g"),
        );
        if (matches2!.length == 2) {
          if (bestType < 3) {
            bestType = 3;
          }
        }
      }
      if (bestType < 2) {
        bestType = 2;
      }
    }
    if (bestType < 1) {
      bestType = 1;
    }
  }
  return {
    type: bestType,
    ...hand,
  };
};

export const process1 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  return 0;
};

export const process2 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  return 0;
};
