import fs from "fs";

export const readFileToString = (filename: string): string => {
  return fs.readFileSync(`data/${filename}`, { encoding: "utf8" });
};

export const getNonEmptyLines = (input: string): string[] => {
  return input.split("\n").filter((line): boolean => line.length > 0);
};
