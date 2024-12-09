import run from "aocrunner";
import { doIntervalsOverlap } from "../utils/doIntervalsOverlap.js";

class File {
  #start: number;

  get start(): number {
    return this.#start;
  }

  #size: number;

  get size(): number {
    return this.#size;
  }

  get end(): number {
    return this.start + this.size - 1;
  }

  next?: File;

  constructor(readonly id: number, start: number, size: number) {
    this.#start = start;
    this.#size = size;
  }

  isBeforeAddress = (address: number): boolean => this.end < address;

  containsAddress = (address: number): boolean =>
    this.start <= address && address <= this.end;

  isAfterAddress = (address: number): boolean => address < this.start;

  overlapsAddressRange = (range: [number, number]): boolean =>
    doIntervalsOverlap([this.start, this.end], range);

  addBlock = (): void => {
    this.#size++;
  };

  removeBlock = (): void => {
    this.#size--;
  };
}

class Files {
  get start(): number {
    return this.#files[0].start;
  }

  get end(): number {
    const lastFile = this.#files[this.#files.length - 1];
    return lastFile.start + lastFile.size - 1;
  }

  #files: File[];

  constructor(files: File[]) {
    if (!files.length) throw new Error("files cannot be empty!");
    this.#files = files;
  }

  static #getFileAtAddress = (
    address: number,
    toSearch: File[],
  ): File | undefined => {
    const i = Math.floor(toSearch.length / 2);
    let file = toSearch[i];

    if (file.containsAddress(address)) return file;
    if (toSearch.length === 1) return undefined;

    if (file.isBeforeAddress(address))
      return Files.#getFileAtAddress(address, toSearch.slice(i));
    if (file.isAfterAddress(address))
      return Files.#getFileAtAddress(address, toSearch.slice(0, i));
    return undefined;
  };

  getFileAtAddress = (address: number): File | undefined =>
    Files.#getFileAtAddress(address, this.#files);

  static #getNextFileAfterAddress = (
    address: number,
    toSearch: File[],
  ): File | undefined => {
    const i = Math.floor(toSearch.length / 2);
    let file = toSearch[i];

    if (file.containsAddress(address)) return file;
    if (toSearch.length === 1) return undefined;

    if (file.isBeforeAddress(address))
      return Files.#getNextFileAfterAddress(address, toSearch.slice(i));
    if (file.isAfterAddress(address))
      return (
        Files.#getNextFileAfterAddress(address, toSearch.slice(0, i)) ?? file
      );

    return undefined;
  };

  getNextFileAfterAddress = (address: number): File | undefined =>
    Files.#getNextFileAfterAddress(address, this.#files);

  findFirstFreeAddress = (): number => {
    let i = 0;
    while (this.getFileAtAddress(i)) i++;
    return i;
  };

  isAddressRangeFree = (range: [number, number]): boolean => {
    return false;
  };

  addFile = (file: File): void => {
    const isAddressRangeFree = this.isAddressRangeFree([file.start, file.end]);
    if (isAddressRangeFree)
      throw new Error(`Failed to add file ${file}: address range is not free`);
  };

  compact = (): void => {
    const toMove = this.#files[this.#files.length - 1];

    if (toMove.size === 1) this.#files.pop();

    const firstFree = this.findFirstFreeAddress();

    const fileBeforeFirstFree = this.getFileAtAddress(firstFree - 1);
    if (fileBeforeFirstFree?.id === toMove.id) {
      fileBeforeFirstFree.addBlock();
    } else {
      const newFile = new File(toMove.id, firstFree, 1);
    }
    toMove.removeBlock();
  };
}

type Input = Files;

const parseInput = (rawInput: string): Input => {
  const files: File[] = [];
  let start = 0;
  for (let i = 0; i < rawInput.length; i++) {
    const size = parseInt(rawInput[i]);

    const isFile = i % 2 === 0;
    if (isFile) {
      const prev = files[files.length - 1];

      const id = i / 2;
      const file = new File(id, start, size);
      files.push(file);

      if (prev) prev.next = file;
    }

    start += size;
  }
  return new Files(files);
};

const part1 = (rawInput: string) => {
  const files = parseInput(rawInput);

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

// 1,2,4,5,6,7,8,9,10,11,12,13
