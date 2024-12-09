import run from "aocrunner";

type File = {
  id: number;
  start: number;
  size: number;
};

type Input = File[];

const parseInput = (rawInput: string): Input => {
  const files: File[] = [];
  let start = 0;
  for (let i = 0; i < rawInput.length; i++) {
    const size = parseInt(rawInput[i]);

    const isFile = i % 2 === 0;
    if (isFile) {
      const id = i / 2;
      files.push({ id, start, size });
    }

    start += size;
  }
  return files;
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

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: "1928",
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
