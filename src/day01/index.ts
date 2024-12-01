import run from "aocrunner";

type Input = [number[], number[]];

const parseInput = (rawInput: string): Input =>
  rawInput.split("\n").reduce<Input>(
    (acc, line) => {
      const [left, right] = line.split("   ");
      acc[0].push(parseInt(left));
      acc[1].push(parseInt(right));
      return acc;
    },
    [[], []],
  );

const part1 = (rawInput: string) => {
  const [left, right] = parseInput(rawInput);

  left.sort();
  right.sort();

  let totalDistance = 0;
  for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }

  return totalDistance.toString();
};

const part2 = (rawInput: string) => {
  const [left, right] = parseInput(rawInput);

  let similarityScore = 0;
  for (let i = 0; i < left.length; i++) {
    const l = left[i];
    const matches = right.filter((r) => r === l);
    similarityScore += l * matches.length;
  }

  return similarityScore.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
        `,
        expected: "11",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
        `,
        expected: "31",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
