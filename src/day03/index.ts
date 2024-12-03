import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const countMuls = (s: string): number => {
  const matches = [...s.matchAll(/mul\((\d+),(\d+)\)/g)];
  return matches.reduce((total, [_, a, b]) => {
    const product = parseInt(a) * parseInt(b);
    total += product;
    return total;
  }, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return countMuls(input).toString();
};

const part2 = (input: string) => {
  input = input
    .replaceAll("\n", "") // Remove newlines
    .replaceAll(/don't\(\).*?(do\(\)|$)/g, " "); // Remove everything after `don't()` and before `do()`

  return countMuls(input).toString();
};

const rand =
  'ahsdt34l5rk3q4wertL@#$QJ%ipQuaf80osdya890rn71239v45rqwe:DFL:A"SLdfk qwpo3er';

run({
  part1: {
    tests: [
      {
        input:
          "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()${rand}_mul(5,5)+mul(32,64](mul(11,8)undo()${rand}?mul(8,5))`,
        expected: `48`,
      },
      {
        input: `mul(1,2)`,
        expected: `2`,
      },
      {
        input: `don't()${rand}mul(1,2)do()${rand}don't()${rand}mul(1,3)do()${rand}don't()${rand}mul(1,4)do()${rand}mul(1,5)don't()${rand}asdfasfasdfasdfdo()${rand}`,
        expected: `5`,
      },
      {
        input: `don't()${rand}asdhjfahsdfklahsdo()${rand}mul(1,1)dlfjkshflkjhsdlkfjmul(1,2)do()${rand}don't()${rand}mul(1,3)`,
        expected: `3`,
      },
      {
        input: `don't()${rand}asdfasdfado()${rand}asdfasdfsdfmul(1,2)`,
        expected: `2`,
      },
      {
        input: `do()${rand}mul(1,2)`,
        expected: `2`,
      },
      {
        input: `don't()${rand}mul(1,2)do()${rand}mul(1,3)`,
        expected: "3",
      },
      {
        input: `${rand}do()mul(1,2)`,
        expected: "2",
      },
      {
        input: `mul(1,100)muldon't()mul(1,3)${rand}do()(1,2)`,
        expected: "100",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
