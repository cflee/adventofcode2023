import { day01 } from "./input";

const sample_input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sample_input_2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const test_input = `eightwo`;

function process1(input: string): number {
  const lines = input.split("\n");
  const sum = lines
    .map((line) => {
      if (line.length == 0) {
        return 0;
      }
      let first: string | undefined = undefined;
      let last: string | undefined = undefined;
      for (const char of line.split("")) {
        if (char >= "0" && char <= "9") {
          if (first == undefined) {
            first = char;
          }
          last = char;
        }
      }
      if (first == undefined || last == undefined) {
        return 0;
      }
      const result = parseInt(first, 10) * 10 + parseInt(last, 10);
      return result;
    })
    .reduce((prev, cur) => prev + cur, 0);
  return sum;
}

const extractDigit = (
  line: string,
): { value: number; length: number } | undefined => {
  if (line.charAt(0) <= "9" && line.charAt(0) >= "0") {
    return { value: parseInt(line.charAt(0), 10), length: 1 };
  }
  if (line.match("^one")) {
    return { value: 1, length: 3 };
  }
  if (line.match("^two")) {
    return { value: 2, length: 3 };
  }
  if (line.match("^three")) {
    return { value: 3, length: 5 };
  }
  if (line.match("^four")) {
    return { value: 4, length: 4 };
  }
  if (line.match("^five")) {
    return { value: 5, length: 4 };
  }
  if (line.match("^six")) {
    return { value: 6, length: 3 };
  }
  if (line.match("^seven")) {
    return { value: 7, length: 5 };
  }
  if (line.match("^eight")) {
    return { value: 8, length: 5 };
  }
  if (line.match("^nine")) {
    return { value: 9, length: 4 };
  }
  if (line.match("^zero")) {
    return { value: 0, length: 4 };
  }
};

function process2(input: string): number {
  const lines = input.split("\n");
  const sum = lines
    .map((line, lineIdx) => {
      if (line.length == 0) {
        console.log(`zero length line ${lineIdx}`);
        return 0;
      }
      let first: number | undefined = undefined;
      let last: number | undefined = undefined;
      for (let i = 0; i < line.length; i++) {
        const digitInfo = extractDigit(line.substring(i));
        if (digitInfo == undefined) {
          continue;
        }
        const { value, length } = digitInfo;
        i += length - 1;
        if (first == undefined) {
          first = value;
          break;
        }
      }
      for (let i = line.length; i >= 0; i--) {
        const digitInfo = extractDigit(line.substring(i));
        if (digitInfo == undefined) {
          continue;
        }
        const { value, length } = digitInfo;
        i -= length - 1;
        if (last == undefined) {
          last = value;
          break;
        }
      }
      if (first == undefined || last == undefined) {
        console.log(`no numbers on ${lineIdx}`);
        return 0;
      }
      const result = first * 10 + last;
      return result;
    })
    .reduce((prev, cur) => prev + cur, 0);
  return sum;
}

export function run(): void {
  console.log(`result: ${process1(sample_input)}`);
  console.log(`result: ${process1(test_input)}`);
  console.log(`result: ${process1(day01)}`);

  console.log(`result: ${process2(sample_input)}`);
  console.log(`result: ${process2(sample_input_2)}`);
  console.log(`result: ${process2(test_input)}`);
  console.log(`result: ${process2(day01)}`);
}
