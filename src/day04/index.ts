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

const DIRECTIONS = [
  { r: -1, c: -1 },
  { r: -1, c: 0 },
  { r: -1, c: 1 },
  { r: 0, c: -1 },
  { r: 0, c: 1 },
  { r: 1, c: -1 },
  { r: 1, c: 0 },
  { r: 1, c: 1 },
] as const satisfies Direction[];

const parseInput = (rawInput: string): Input => {
  const grid = rawInput.split("\n").map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0].length;
  return { grid, rows, cols };
};

const getWord = (
  input: Input,
  start: { r: number; c: number },
  direction: Direction,
): string => {
  return Array.from({ length: 4 })
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
          const word = getWord(input, { r, c }, direction);
          if (word === "XMAS") count++;
        });
      }
    }
  }
  return count;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const count = countXMAS(input);
  return count.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
