import { describe, it, expect } from "vitest";
import { CoordSet } from "./coord-set.js";

describe("CoordSet", () => {
  describe("add", () => {
    it("should add coord", () => {
      const coord = { r: Math.random(), c: Math.random() };
      const coordSet = new CoordSet();
      coordSet.add(coord);
      const values = coordSet.values();
      expect(values[0]).toEqual(coord);
    });
  });

  describe("has", () => {
    it("should return true if coord has been added", () => {
      const coord = { r: Math.random(), c: Math.random() };
      const coordSet = new CoordSet();
      coordSet.add(coord);
      expect(coordSet.has(coord)).toBe(true);
    });
    it("should return false if coord has not been added", () => {
      const coordSet = new CoordSet();
      const coord = { r: Math.random(), c: Math.random() };
      coordSet.add(coord);
      const otherCoord = { r: coord.r + 1, c: coord.c + 1 };
      expect(coordSet.has(otherCoord)).toBe(false);
    });
  });

  describe("values", () => {
    it("should not contain duplicate coords", () => {
      const coord = { r: Math.random(), c: Math.random() };
      const coordSet = new CoordSet();
      coordSet.add(coord);
      coordSet.add(coord);
      coordSet.add(coord);
      coordSet.add(coord);
      coordSet.add(coord);
      expect(coordSet.values()[0]).toEqual(coord);
      expect(coordSet.size).toEqual(1);
    });
  });
});
