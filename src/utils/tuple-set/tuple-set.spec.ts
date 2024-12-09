import { describe, it, expect } from "vitest";
import { TupleSet } from "./tuple-set.js";

describe("TupleSet", () => {
  describe("add", () => {
    it("should add tuple", () => {
      const tuple = [Math.random(), Math.random()];
      const tupleSet = new TupleSet();
      tupleSet.add(tuple);
      const values = tupleSet.values();
      expect(values[0]).toEqual(tuple);
    });
  });

  describe("has", () => {
    it("should return true if tuple has been added", () => {
      const tuple = [Math.random(), Math.random()];
      const tupleSet = new TupleSet();
      tupleSet.add(tuple);
      expect(tupleSet.has(tuple)).toBe(true);
    });
    it("should return false if tuple has not been added", () => {
      const tupleSet = new TupleSet();
      const tuple = [Math.random(), Math.random()];
      tupleSet.add(tuple);
      const otherTuple = [tuple[0] + 1, tuple[1] + 1];
      expect(tupleSet.has(otherTuple)).toBe(false);
    });
  });

  describe("values", () => {
    it.each([{ depth: 1 }, { depth: 2 }, { depth: 3 }])(
      "depth=$depth",
      ({ depth }) => {
        const tuple = Array.from({ length: depth }).map((_, i) => i + 1);
        const tupleSet = new TupleSet();
        tupleSet.add(tuple);
        const values = tupleSet.values();
        expect(values).toEqual([tuple]);
      },
    );

    it("complex", () => {
      const tupleSet = new TupleSet();
      const tuples = [
        [1, 2, 3],
        [1, "a", 3],
        [1, 3, 5, 7, 9],
      ];

      tuples.forEach((tuple) => tupleSet.add(tuple));
      const values = tupleSet.values();
      expect(values).toEqual(tuples);
    });

    it("should not contain duplicate tuples", () => {
      const tuple = [1, 2, 3];
      const tupleSet = new TupleSet();
      tupleSet.add(tuple);
      tupleSet.add(tuple);
      tupleSet.add(tuple);
      tupleSet.add(tuple);
      tupleSet.add(tuple);
      const values = tupleSet.values();
      expect(values[0]).toEqual(tuple);
      expect(tupleSet.size).toEqual(1);
    });
  });
});
