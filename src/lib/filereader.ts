import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");

export function getData(dataFileName: string): string[] {
  const filePath = path.join(dataDirectory, dataFileName);

  const fileContents = fs.readFileSync(filePath, "utf8");
  const lines = fileContents.split("\n");
  return lines;
}
