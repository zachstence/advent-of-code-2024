import run from "aocrunner";

/** { before: afters } */
type Rules = Map<number, Set<number>>;

/** { before: afters } */
type Update = {
  list: number[];
  map: Map<number, Set<number>>;
};

type Input = {
  rules: Rules;
  updates: Update[];
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").reduce<Input>(
    (input, line) => {
      if (line.includes("|")) {
        const [before, after] = line.split("|").map((n) => parseInt(n));
        if (!input.rules.has(before)) input.rules.set(before, new Set());
        input.rules.get(before)!.add(after);
      } else if (line.includes(",")) {
        const list = line.split(",").map((n) => parseInt(n));
        const map = new Map();
        list.forEach((num, i) => {
          const afters = list.slice(i + 1);
          if (!map.has(num)) map.set(num, new Set());
          afters.forEach((after) => map.get(num)!.add(after));
        });
        input.updates.push({ map, list });
      }
      return input;
    },
    { rules: new Map(), updates: [] },
  );

const isUpdateCorrect = (update: Update, rules: Rules): boolean => {
  for (const [num, afters] of update.map.entries()) {
    for (const after of afters) {
      if (rules.has(after) && rules.get(after)?.has(num)) {
        return false;
      }
    }
  }
  return true;
};

const sumMiddleNumbers = (arrays: number[][]): number =>
  arrays.reduce<number>((sum, arr) => sum + arr[(arr.length - 1) / 2], 0);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const correctUpdates = input.updates.filter((update) =>
    isUpdateCorrect(update, input.rules),
  );
  const sum = sumMiddleNumbers(correctUpdates.map((u) => u.list));
  return sum.toString();
};

const fixUpdate = (update: Update, rules: Rules): number[] =>
  [...update.list].sort((a, b) => {
    1;
    if (rules.has(a) && rules.get(a)!.has(b)) return -1;
    if (rules.has(b) && rules.get(b)!.has(a)) return 1;
    return 0;
  });

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const incorrectUpdates = input.updates.filter(
    (update) => !isUpdateCorrect(update, input.rules),
  );
  const correctedUpdates = incorrectUpdates.map((update) =>
    fixUpdate(update, input.rules),
  );

  const sum = sumMiddleNumbers(correctedUpdates);

  return sum.toString();
};

const exampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: "143",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: "123",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
