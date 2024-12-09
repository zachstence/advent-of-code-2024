import run from "aocrunner";
import { TupleSet } from "../utils/tuple-set/index.js";

const MAX_ITERS = 1_000_000_000;

type Direction = "up" | "right" | "down" | "left";

type Coord = [number, number];

type Input = {
  start: Coord;
  direction: Direction;
  obstacles: TupleSet<Coord>;
  numRows: number;
  numCols: number;
};

const parseInput = (rawInput: string): Input => {
  let start: Coord;
  const obstacles = new TupleSet<Coord>();
  let numRows = 0;
  let numCols = 0;

  rawInput.split("\n").forEach((row, r) =>
    row.split("").forEach((char, c) => {
      if (char === "^") start = [r, c];
      if (char === "#") obstacles.add([r, c]);
      numRows = Math.max(numRows, r + 1);
      numCols = Math.max(numCols, c + 1);
    }),
  );

  return {
    start: start!,
    direction: "up",
    obstacles,
    numRows,
    numCols,
  };
};

const getNextDirection = (direction: Direction): Direction => {
  switch (direction) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
  }
};

const getNextCoord = (coord: Coord, direction: Direction): Coord => {
  const [r, c] = coord;
  switch (direction) {
    case "up":
      return [r - 1, c];
    case "right":
      return [r, c + 1];
    case "down":
      return [r + 1, c];
    case "left":
      return [r, c - 1];
  }
};

const isOutOfBounds = (
  coord: Coord,
  numRows: number,
  numCols: number,
): boolean => {
  const [r, c] = coord;
  return r < 0 || r >= numRows || c < 0 || c >= numCols;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let guardCoord = input.start;
  let direction = input.direction;
  const obstacles = input.obstacles;

  const guardCoords = new TupleSet();

  for (let i = 0; i < MAX_ITERS; i++) {
    const nextCoord = getNextCoord(guardCoord, direction);
    if (isOutOfBounds(nextCoord, input.numRows, input.numCols)) break;

    if (obstacles.has(nextCoord)) {
      direction = getNextDirection(direction);
      continue;
    }

    guardCoord = nextCoord;
    guardCoords.add(guardCoord);
  }

  return guardCoords.size.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const exampleInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "41",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
