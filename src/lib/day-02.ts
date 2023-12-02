import { getData } from "./filereader";

interface Cubes {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  gameId: number;
  pulls: Cubes[];
}

const getGameInfo = (line: string) => {
  const game: Game = {
    gameId: parseInt(line.match(RegExp(/Game (\d*):/))?.[1] ?? "0"),
    pulls: [],
  };

  // console.log(game.gameId);
  const pulls = line.split(RegExp(/[;]/g));
  // console.log(pulls);

  pulls.forEach((pull) => {
    const red = pull.match(RegExp(/(\d*) red/))?.[1] ?? "0";
    const green = pull.match(RegExp(/(\d*) green/))?.[1] ?? "0";
    const blue = pull.match(RegExp(/(\d*) blue/))?.[1] ?? "0";
    game.pulls.push({
      red: parseInt(red),
      green: parseInt(green),
      blue: parseInt(blue),
    });
  });
  // console.log(line);
  // console.log(game);
  return game;
};

const isGamePossible = (
  game: Game,
  totalRed: number,
  totalGreen: number,
  totalBlue: number
) => {
  let isPossible = true;
  game.pulls.forEach((pull) => {
    if (
      pull.red > totalRed ||
      pull.green > totalGreen ||
      pull.blue > totalBlue
    ) {
      isPossible = false;
    }
  });
  return isPossible;
};

export const getDay02Part1 = () => {
  // const lines = getData("day02/input_test.txt");
  const lines = getData("day02/input.txt");

  let total = 0;

  lines.forEach((line) => {
    if (line.length > 0) {
      const game = getGameInfo(line);
      if (isGamePossible(game, 12, 13, 14)) {
        total += game.gameId;
      }
    }
  });

  console.log(total);
  return total;
};

const getPowerOfCubes = (game: Game) => {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;

  game.pulls.forEach((pull) => {
    if (pull.red > maxRed) {
      maxRed = pull.red;
    }
    if (pull.green > maxGreen) {
      maxGreen = pull.green;
    }
    if (pull.blue > maxBlue) {
      maxBlue = pull.blue;
    }
  });

  return maxRed * maxGreen * maxBlue;
};

export const getDay02Part2 = () => {
  // const lines = getData("day02/input_test.txt");
  const lines = getData("day02/input.txt");

  let total = 0;

  lines.forEach((line) => {
    if (line.length > 0) {
      const game = getGameInfo(line);
      total += getPowerOfCubes(game);
    }
  });

  console.log(total);
  return total;
};
