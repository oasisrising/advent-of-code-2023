import { match } from "assert";
import { getData } from "./filereader";

interface Part {
  number: string;
  row: number;
  column: number;
  leftColumn: number;
  rightColumn: number;
  topRow: number;
  bottomRow: number;
}

const getParts = (line: string, row: number, maxRows: number) => {
  const partNumbers = line.match(RegExp(/(\d+)/g));
  if (!partNumbers) {
    return [];
  }
  // console.log(line);

  let parts: Part[] = [];
  let lastIndexSearched = 0;
  partNumbers.forEach((partNumber) => {
    const column = line.indexOf(partNumber, lastIndexSearched);
    const part: Part = {
      number: partNumber,
      row,
      column: line.indexOf(partNumber, lastIndexSearched),
      leftColumn: column > 0 ? column - 1 : column,
      rightColumn: column + partNumber.length,
      topRow: row > 0 ? row - 1 : row,
      bottomRow: row + 1 === maxRows - 1 ? row : row + 1,
    };
    parts.push(part);
    lastIndexSearched = part.column + part.number.length;
  });
  // console.log(parts);
  return parts;
};

const isValidPartNumber = (part: Part, lines: string[]) => {
  // * * * * *
  // * d d d *
  // * * * * *

  // console.log(part);
  // console.log(`${leftColumn} - ${rightColumn} & ${topRow} - ${bottomRow}`);

  let logLines: string[] = [];

  for (let row = part.topRow; row <= part.bottomRow; row++) {
    const trimmedLine = lines[row].substring(
      part.leftColumn,
      part.rightColumn + 1
    );
    logLines.push(trimmedLine);
    if (
      trimmedLine.search(RegExp(/[^\w\./]/)) !== -1 ||
      trimmedLine.search("/") !== -1
    ) {
      //  console.log("valid part");
      return true;
    }
  }
  logLines.forEach((line) => console.log(line));
  console.log("");
  return false;
};

export const getDay03Part1 = () => {
  // const lines = getData("day03/input_test.txt");
  const lines = getData("day03/input.txt");

  let total = 0;
  let parts: Part[] = [];

  lines.forEach((line, index) => {
    if (line.length > 0) {
      parts = parts.concat(getParts(line, index, lines.length));
    }
  });

  parts.forEach((part) => {
    if (isValidPartNumber(part, lines)) {
      total += parseInt(part.number);
    }
  });
  console.log(total);
  return total;
};

export const getDay03Part2 = () => {
  // const lines = getData("day03/input_test.txt");
  const lines = getData("day03/input.txt");

  let total = 0;
  let parts: Part[] = [];

  lines.forEach((line, index) => {
    if (line.length > 0) {
      parts = parts.concat(getParts(line, index, lines.length));
    }
  });

  lines.forEach((line, index) => {
    if (line.length > 0) {
      const gearSymbols = Array.from(line.matchAll(RegExp(/\*/g))).map(
        (match) => match.index ?? -1
      );
      // console.log(line);
      // console.log(gearSymbols);

      if (gearSymbols.length === 0) {
        return;
      }

      gearSymbols.forEach((gear) => {
        let adjacentParts: Part[] = [];
        parts.forEach((part) => {
          if (
            index >= part.topRow &&
            index <= part.bottomRow &&
            gear >= part.leftColumn &&
            gear <= part.rightColumn
          ) {
            adjacentParts.push(part);
            console.log(part);
          }
        });

        if (adjacentParts.length == 2) {
          total +=
            parseInt(adjacentParts[0].number) *
            parseInt(adjacentParts[1].number);
        }
      });
    }
  });
  console.log(total);
  return total;
};
