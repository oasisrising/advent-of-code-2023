import { match } from "assert";
import { getData } from "./filereader";

interface Game {
  cardNumber: string;
  scoringNumbers: string[];
  gameNumbers: string[];
  score: number;
  matches: number;
  copies: number;
}

const getGame = (line: string): Game => {
  const parts = line.split(RegExp(/[:|]/));
  // console.log(parts);
  const cardNumber = parts[0].match(RegExp(/(\d+)/))?.[1] ?? "0";
  // console.log(cardNumber);
  const scoringNumbers = parts[1]
    .trim()
    .replaceAll(RegExp(/(\s+)/g), " ")
    .split(" ");
  // console.log(scoringNumbers);
  const gameNumbers = parts[2]
    .trim()
    .replaceAll(RegExp(/(\s+)/g), " ")
    .split(" ");

  let score = 0;
  let matches = 0;
  gameNumbers.forEach((gameNumber) => {
    if (scoringNumbers.includes(gameNumber)) {
      score = score === 0 ? 1 : score * 2;
      matches += 1;
    }
  });

  return {
    cardNumber,
    scoringNumbers,
    gameNumbers,
    score,
    matches,
    copies: 1,
  };
};

export const getDay04Part1 = () => {
  // const lines = getData("day04/input_test.txt");
  const lines = getData("day04/input.txt");

  let total = 0;

  lines.forEach((line, index) => {
    if (line.length > 0) {
      const game = getGame(line);
      total += game.score;
    }
  });

  console.log(total);
  return total;
};

export const getDay04Part2 = () => {
  // const lines = getData("day04/input_test.txt");
  const lines = getData("day04/input.txt");

  let total = 0;
  let games: Game[] = [];
  lines.forEach((line, index) => {
    if (line.length > 0) {
      games.push(getGame(line));
    }
  });

  games.forEach((game, index) => {
    //   console.log(game);
    if (game.matches > 0) {
      for (
        let i = index + 1;
        i < games.length && i <= index + game.matches;
        i++
      ) {
        games[i].copies += game.copies;
      }
    }
  });

  games.forEach((game) => (total += game.copies));

  console.log(total);
  return total;
};
