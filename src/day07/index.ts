import run from "aocrunner";

type UnfilledEquation = {
  value: number;
  operands: number[];
};

type Input = UnfilledEquation[];

const parseInput = (rawInput: string): Input =>
  rawInput.split("\n").map((line) => {
    const [valueStr, operandsStr] = line.split(": ");
    const value = parseInt(valueStr);
    const operands = operandsStr.split(" ").map((n) => parseInt(n));
    return { value, operands };
  });

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
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "3749",
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
