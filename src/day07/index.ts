import run from "aocrunner";

type UnfilledEquation = {
  value: number;
  operands: number[];
};

type Operator = "+" | "*" | "||";

type Input = UnfilledEquation[];

const parseInput = (rawInput: string): Input =>
  rawInput.split("\n").map((line) => {
    const [valueStr, operandsStr] = line.split(": ");
    const value = parseInt(valueStr);
    const operands = operandsStr.split(" ").map((n) => parseInt(n));
    return { value, operands };
  });

const evaluateOperation = (a: number, b: number, op: Operator): number => {
  switch (op) {
    case "+":
      return a + b;
    case "*":
      return a * b;
    case "||":
      return parseInt(a.toString() + b.toString());
  }
};

const evaluate = (operands: number[], operators: Operator[]): number => {
  const _operands = [...operands];
  const _operators = [...operators];

  while (_operands.length > 1) {
    const a = _operands.shift()!;
    const b = _operands.shift()!;
    const op = _operators.shift()!;
    const result = evaluateOperation(a, b, op);
    _operands.unshift(result);
  }

  return _operands[0];
};

const replaceAllMap = (s: string, map: Record<string, string>): string =>
  Object.entries(map).reduce<string>(
    (s, [find, replace]) => s.replaceAll(find, replace),
    s,
  );

const getValidOperatorCombinations = (
  e: UnfilledEquation,
  validOperators: Operator[],
): Operator[][] => {
  const replaceMap = validOperators.reduce<Record<string, string>>(
    (map, op, i) => {
      map[i] = op;
      return map;
    },
    {},
  );

  const numOperators = e.operands.length - 1;
  const numCombinations = validOperators.length ** numOperators;
  const combinations = Array.from({ length: numCombinations }).map((_, n) =>
    n
      .toString(validOperators.length)
      .padStart(numOperators, "0")
      .split("")
      .map((i) => parseInt(i))
      .map((i) => validOperators[i]),
  );

  const validCombinations = combinations.filter((operators) => {
    const result = evaluate(e.operands, operators);
    return result === e.value;
  });

  return validCombinations;
};

const sumValidEquations = (
  input: Input,
  validOperators: Operator[],
): number => {
  const validEquations = input.filter(
    (eq) => getValidOperatorCombinations(eq, validOperators).length > 0,
  );
  const sum = validEquations.reduce<number>((sum, e) => sum + e.value, 0);
  return sum;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sum = sumValidEquations(input, ["+", "*"]);
  return sum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const sum = sumValidEquations(input, ["+", "*", "||"]);
  return sum.toString();
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
      {
        input: exampleInput,
        expected: "11387",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
