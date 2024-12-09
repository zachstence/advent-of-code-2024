import run from "aocrunner";
import { filterTruthy } from "../utils/filter-truthy.js";
import { TupleSet } from "../utils/tuple-set/tuple-set.js";

type Coord = [number, number];

type Antenna = {
  type: "antenna";
  coord: Coord;
  frequency: string;
};

type Antinode = {
  type: "antinode";
  coord: Coord;
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

const isOutOfBounds = (coord: Coord, input: Input): boolean => {
  const [r, c] = coord;
  return r < 0 || r >= input.numRows || c < 0 || c >= input.numCols;
};

const findAntinodes = (
  a: Antenna,
  b: Antenna,
  input: Input,
  { includeResonantHarmonics }: { includeResonantHarmonics?: boolean } = {},
): Coord[] => {
  const [a0, a1] = a.coord;
  const [b0, b1] = b.coord;

  // Slope
  const [d0, d1] = [a0 - b0, a1 - b1];

  if (includeResonantHarmonics) {
    let coords: Coord[] = [];
    let coord: Coord = [b0, b1];
    while (!isOutOfBounds(coord, input)) {
      coords.push([...coord]);
      coord = [coord[0] - d0, coord[1] - d1];
    }
    coord = [a0, a1];
    while (!isOutOfBounds(coord, input)) {
      coords.push([...coord]);
      coord = [coord[0] + d0, coord[1] + d1];
    }
    return coords;
  } else {
    return [[b0 - d0, b1 - d1] as Coord, [a0 + d0, a1 + d1] as Coord].filter(
      (coord) => !isOutOfBounds(coord, input),
    );
  }
};

const findAllAntinodes = (
  input: Input,
  { includeResonantHarmonics }: { includeResonantHarmonics?: boolean } = {},
): Coord[] => {
  const coords = new TupleSet<Coord>();
  for (let i = 0; i < input.antennas.length; i++) {
    for (let j = i + 1; j < input.antennas.length; j++) {
      const a = input.antennas[i];
      const b = input.antennas[j];
      if (a.frequency !== b.frequency) continue;

      findAntinodes(a, b, input, { includeResonantHarmonics }).forEach(
        (coord) => coords.add(coord),
      );
    }
  }
  return coords.values();
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const coords = findAllAntinodes(input);
  return coords.length.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const coords = findAllAntinodes(input, { includeResonantHarmonics: true });
  return coords.length.toString();
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
      {
        input: exampleInput,
        expected: "34",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
