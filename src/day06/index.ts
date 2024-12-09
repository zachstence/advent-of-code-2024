import run from "aocrunner";
import { TupleSet } from "../utils/tuple-set/index.js";

const MAX_ITERS = 1_000_000_000;

type Direction = "up" | "right" | "down" | "left";

type Coord = [number, number];

type CoordWithDirection = [number, number, Direction];

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

const turn = (coord: CoordWithDirection): CoordWithDirection => {
  const direction = coord[2];
  switch (direction) {
    case "up":
      return [coord[0], coord[1], "right"];
    case "right":
      return [coord[0], coord[1], "down"];
    case "down":
      return [coord[0], coord[1], "left"];
    case "left":
      return [coord[0], coord[1], "up"];
  }
};

const move = (coord: CoordWithDirection): CoordWithDirection => {
  const [r, c, direction] = coord;
  switch (direction) {
    case "up":
      return [r - 1, c, direction];
    case "right":
      return [r, c + 1, direction];
    case "down":
      return [r + 1, c, direction];
    case "left":
      return [r, c - 1, direction];
  }
};

const isObstacle = (coord: Coord | CoordWithDirection, input: Input): boolean =>
  input.obstacles.has([coord[0], coord[1]]);

const isOutOfBounds = (
  coord: Coord | CoordWithDirection,
  input: Input,
): boolean => {
  const [r, c] = coord;
  return r < 0 || r >= input.numRows || c < 0 || c >= input.numCols;
};

const getGuardCoords = (
  input: Input,
): { coords: TupleSet<CoordWithDirection>; isLoop: boolean } => {
  let guardCoord: CoordWithDirection = [...input.start, "up"];

  const guardCoords = new TupleSet<CoordWithDirection>();
  guardCoords.add(guardCoord);

  for (let i = 0; i < MAX_ITERS; i++) {
    let nextCoord = move(guardCoord);

    if (isOutOfBounds(nextCoord, input)) break;

    if (isObstacle(nextCoord, input)) {
      nextCoord = turn(guardCoord);
    }

    guardCoord = nextCoord;

    // If we are somewhere we have already been, stop because we will loop
    if (guardCoords.has(guardCoord))
      return { coords: guardCoords, isLoop: true };

    guardCoords.add(guardCoord);
  }

  return { coords: guardCoords, isLoop: false };
};

const eq = <T extends unknown[]>(a: T, b: T): boolean =>
  a.length === b.length && a.every((_, i) => a[i] === b[i]);

const getObstacleLoopCoords = (input: Input): Coord[] => {
  // The new obstacle must be placed somewhere in the guards path otherwise it would have no effect
  const possibleCoords = getGuardCoords(input).coords.values({
    depth: 2,
  }) as unknown as Coord[];

  const obstacleLoopCoords = possibleCoords.filter((possibleCoord) => {
    if (eq(possibleCoord, input.start)) return false;

    input.obstacles.add(possibleCoord);
    const { isLoop } = getGuardCoords(input);
    input.obstacles.remove(possibleCoord);
    return isLoop;
  });

  return obstacleLoopCoords;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const guardCoords = getGuardCoords(input).coords.values({ depth: 2 });
  return guardCoords.length.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const coords = getObstacleLoopCoords(input);
  return coords.length.toString();
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
      {
        input: exampleInput,
        expected: "6",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
