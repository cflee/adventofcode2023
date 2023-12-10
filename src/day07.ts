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
  for (let i = 0; i < 5; i++) {
    const matches = hand.cards.match(new RegExp(hand.cards.charAt(i), "g"));
    if (matches!.length == 5) {
      return {
        type: 7,
        ...hand,
      };
    } else if (matches!.length == 4) {
      return {
        type: 6,
        ...hand,
      };
    } else if (matches!.length == 3) {
      for (let j = 0; j < 5; j++) {
        if (hand.cards.charAt(j) == hand.cards.charAt(i)) {
          continue;
        }
        const matches2 = hand.cards.match(
          new RegExp(hand.cards.charAt(j), "g"),
        );
        if (matches2!.length == 2) {
          return {
            type: 5,
            ...hand,
          };
        } else {
          return {
            type: 4,
            ...hand,
          };
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
          return {
            type: 3,
            ...hand,
          };
        }
      }
      return {
        type: 2,
        ...hand,
      };
    }
    return {
      type: 1,
      ...hand,
    };
  }
};

export const process1 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  return 0;
};

export const process2 = (input: string): number => {
  const lines: string[] = getNonEmptyLines(input);
  return 0;
};
