import { getNonEmptyLines, sumNumbers } from "./utils";

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

export const getTypedHand = (hand: Hand): TypedHand => {
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

export const getTypedHand2 = (hand: Hand): TypedHand => {
  const cardCounts = new Map();
  for (let i = 0; i < 5; i++) {
    const card = hand.cards.charAt(i);
    if (!cardCounts.has(card)) {
      cardCounts.set(card, 1);
    } else {
      cardCounts.set(card, cardCounts.get(card) + 1);
    }
  }

  let jokerCount = cardCounts.get("J") ?? 0;
  cardCounts.delete("J");
  const cardCountValues = [...cardCounts.values()];
  cardCountValues.sort().reverse();
  cardCountValues[0] += jokerCount;

  let bestType = 0;
  if (cardCountValues[0] == 5) {
    bestType = 7;
  } else if (cardCountValues[0] == 4) {
    bestType = 6;
  } else if (cardCountValues[0] == 3) {
    if (cardCountValues[1] == 2) {
      bestType = 5;
    } else {
      bestType = 4;
    }
  } else if (cardCountValues[0] == 2) {
    if (cardCountValues[1] == 2) {
      bestType = 3;
    } else {
      bestType = 2;
    }
  } else {
    bestType = 1;
  }
  return {
    type: bestType,
    ...hand,
  };
};

export const makeNumeric = (label: string, part: number): number => {
  switch (label) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      if (part == 1) {
        return 11;
      } else {
        return 1;
      }
    case "T":
      return 10;
    default:
      return parseInt(label, 10);
  }
};

export const compareCards = (a: string, b: string, part: number): number => {
  const an = makeNumeric(a, part);
  const bn = makeNumeric(b, part);
  return an - bn;
};

export const compareTypedHands = (
  a: TypedHand,
  b: TypedHand,
  part: number,
): number => {
  if (a.type != b.type) {
    // weaker types (lower value) come first
    return a.type - b.type;
  }
  for (let i = 0; i < 5; i++) {
    const c = compareCards(a.cards.charAt(i), b.cards.charAt(i), part);
    if (c != 0) {
      return c;
    }
  }
  return 0;
};

export const process1 = (input: string): number => {
  const typedHands = parseInput(getNonEmptyLines(input)).map((hand) =>
    getTypedHand(hand),
  );
  typedHands.sort((a, b) => compareTypedHands(a, b, 1));
  return typedHands.map((hand, idx) => hand.bid * (idx + 1)).reduce(sumNumbers);
};

export const process2 = (input: string): number => {
  const typedHands = parseInput(getNonEmptyLines(input)).map((hand) =>
    getTypedHand2(hand),
  );
  typedHands.sort((a, b) => compareTypedHands(a, b, 2));
  return typedHands.map((hand, idx) => hand.bid * (idx + 1)).reduce(sumNumbers);
};
