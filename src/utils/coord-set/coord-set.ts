export type Coord = { r: number; c: number };

export class CoordSet {
  #map: Map<number, Set<number>> = new Map();

  #size = 0;

  get size(): number {
    return this.#size;
  }

  add = (coord: Coord): void => {
    if (!this.#map.has(coord.r)) this.#map.set(coord.r, new Set());
    if (!this.#map.has(coord.r) || !this.#map.get(coord.r)!.has(coord.c)) {
      this.#map.get(coord.r)!.add(coord.c);
      this.#size++;
    }
  };

  has = (coord: Coord): boolean =>
    this.#map.has(coord.r) && this.#map.get(coord.r)!.has(coord.c);

  values = (): Coord[] =>
    [...this.#map.entries()].flatMap(([r, cs]) =>
      [...cs.values()].map((c) => ({
        r,
        c,
      })),
    );
}
