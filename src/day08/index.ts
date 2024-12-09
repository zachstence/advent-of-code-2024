import run from "aocrunner";
import { filterTruthy } from "../utils/filter-truthy.js";

type Antenna = {
  type: "antenna";
  coord: [number, number];
  frequency: string;
};

type Antinode = {
  type: "antinode";
  coord: [number, number];
};

type Object = Antenna | Antinode;

type Input = {
  antennas: Antenna[];
  numRows: number;
  numCols: number;
};

const parseInput = (rawInput: string): Input => {
  let numRows = rawInput.split("\n").length;
  let numCols = rawInput.split("\n")[0].split("").length;

  const antennas = filterTruthy(
    rawInput
      .split("\n")
      .flatMap((line, r) =>
        line
          .split("")
          .map<Antenna | undefined>((char, c) =>
            char !== "."
              ? { type: "antenna", coord: [r, c], frequency: char }
              : undefined,
          ),
      ),
  );
  return { antennas, numRows, numCols };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

const exampleInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "14",
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
  onlyTests: true,
});
