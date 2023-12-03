import fs from "fs";

export const readFileToString = (filename: string): string => {
  return fs.readFileSync(`data/${filename}`, { encoding: "utf8" });
};
