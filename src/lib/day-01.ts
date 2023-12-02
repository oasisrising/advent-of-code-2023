import { getData } from "./filereader";

const getIntFromLine = (line: string) => {
  const justDigits = line.replace(RegExp(/\D*/g), "");

  console.log(justDigits);
  if (justDigits.length === 0) {
    return 0;
  }
  return parseInt(
    [justDigits.charAt(0), justDigits.charAt(justDigits.length - 1)].join("")
  );
};

export const getDay01Part1 = () => {
  // const lines = getData("day01/input_test.txt");
  const lines = getData("day01/input.txt");

  let total = 0;

  lines.forEach((line) => {
    const number = getIntFromLine(line);
    console.log(number);
    total += number;
  });

  return total;
};

const replaceWordsWithDigits = (line: string) => {
  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let wordsToDigits: string[] = [];

  for (let i = 0; i < line.length; i++) {
    numbers.forEach((number, index) => {
      if (line.startsWith(number, i)) {
        wordsToDigits.push(index.toString());
      }
    });
    wordsToDigits.push(line.charAt(i));
  }
  return wordsToDigits.join("");
};

export const getDay01Part2 = () => {
  // const lines = getData("day01/input_test.txt");
  const lines = getData("day01/input.txt");
  // const lines = ["twoneight"];
  let total = 0;

  lines.forEach((line) => {
    console.log(line);
    const newLine = replaceWordsWithDigits(line);
    console.log(newLine);
    const number = getIntFromLine(newLine);
    console.log(number);
    total += number;
  });

  return total;
};
