import run from "aocrunner";

type Input = {
  grid: string[][];
  rows: number;
  cols: number;
};

type Direction = {
  r: -1 | 0 | 1;
  c: -1 | 0 | 1;
};

type Coord = { r: number; c: number };

type Vector = {
  start: Coord;
  direction: Direction;
};

const SIDE_DIRECTIONS = [
  { r: -1, c: 0 },
  { r: 0, c: -1 },
  { r: 0, c: 1 },
  { r: 1, c: 0 },
] as const satisfies Direction[];

const DIAGONAL_DIRECTIONS = [
  { r: -1, c: -1 },
  { r: -1, c: 1 },
  { r: 1, c: -1 },
  { r: 1, c: 1 },
] as const satisfies Direction[];

const DIRECTIONS = [
  ...SIDE_DIRECTIONS,
  ...DIAGONAL_DIRECTIONS,
] as const satisfies Direction[];

const parseInput = (rawInput: string): Input => {
  const grid = rawInput.split("\n").map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0].length;
  return { grid, rows, cols };
};

const getOtherMASVector = (original: Vector): Vector => ({
  start: {
    r: original.start.r + 2 * original.direction.r,
    c: original.start.c,
  },
  direction: {
    r: (-1 * original.direction.r) as -1 | 0 | 1,
    c: original.direction.c as -1 | 0 | 1,
  },
});

const getWord = (
  input: Input,
  start: Coord,
  direction: Direction,
  length: number,
): string => {
  return Array.from({ length })
    .map((_, i) => ({
      r: start.r + i * direction.r,
      c: start.c + i * direction.c,
    }))
    .map((coord) => input.grid[coord.r]?.[coord.c])
    .join("");
};

const countXMAS = (input: Input): number => {
  let count = 0;
  for (let r = 0; r < input.rows; r++) {
    for (let c = 0; c < input.cols; c++) {
      if (input.grid[r][c] === "X") {
        DIRECTIONS.forEach((direction) => {
          const word = getWord(input, { r, c }, direction, 4);
          if (word === "XMAS") count++;
        });
      }
    }
  }
  return count;
};

const countMASInShapeOfX = (input: Input): number => {
  const centerCoords: Coord[] = [];

  for (let r = 0; r < input.rows; r++) {
    for (let c = 0; c < input.cols; c++) {
      if (input.grid[r][c] === "M") {
        DIAGONAL_DIRECTIONS.forEach((direction) => {
          const word = getWord(input, { r, c }, direction, 3);
          if (word === "MAS") {
            const otherVector = getOtherMASVector({
              start: { r, c },
              direction,
            });
            const otherWord = getWord(
              input,
              otherVector.start,
              otherVector.direction,
              3,
            );
            if (otherWord === "MAS" || otherWord === "SAM") {
              const center = {
                r: r + direction.r,
                c: c + direction.c,
              };
              if (
                !centerCoords.find(
                  (coord) => coord.r === center.r && coord.c === center.c,
                )
              ) {
                centerCoords.push(center);
              }
            }
          }
        });
      }
    }
  }
  return centerCoords.length;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const count = countXMAS(input);
  return count.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const count = countMASInShapeOfX(input);
  return count.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`,
        expected: "18",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`,
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
