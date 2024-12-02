import run from "aocrunner";

type Report = number[];
type Input = Report[];

const parseInput = (rawInput: string): Input =>
  rawInput.split("\n").map((line) => line.split(" ").map(Number));

const isReportSafe = (report: Report): boolean => {
  let direction: "increasing" | "decreasing" | undefined = undefined;
  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1];
    const curr = report[i];

    const diff = Math.abs(prev - curr);
    if (diff < 1 || diff > 3) return false;

    const dir = prev < curr ? "increasing" : "decreasing";

    if (direction) {
      if (dir !== direction) return false;
    } else {
      direction = dir;
    }
  }

  return true;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const safeReports = input.filter(isReportSafe);
  return safeReports.length.toString();
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
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`,
        expected: "4",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
