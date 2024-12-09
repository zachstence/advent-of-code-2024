type Tree = Map<any, Tree>;

export class TupleSet<T extends any[]> {
  #map: Tree = new Map();

  #size = 0;

  get size(): number {
    return this.#size;
  }

  add = (tuple: T): void => {
    if (this.has(tuple)) return;

    let map = this.#map;
    tuple.forEach((value) => {
      const nextMap = map.get(value) ?? new Map();
      map.set(value, nextMap);
      map = nextMap;
    });
    this.#size++;
  };

  remove = (tuple: T): void => {
    if (!this.has(tuple)) return;

    tuple.toReversed().forEach((_, i) => {
      const path = tuple.slice(0, tuple.length - i - 1);
      const key = tuple.slice(tuple.length - i - 1, tuple.length - i)[0];

      let map = this.#map;
      for (const value of path) {
        map = map.get(value)!;
      }
      if (map.get(key)!.size === 0) {
        map.delete(key);
      }
    });

    this.#size--;
  };

  has = (tuple: T): boolean => {
    let map = this.#map;
    for (const value of tuple) {
      if (!map.has(value)) return false;
      map = map.get(value)!;
    }
    return true;
  };

  values = ({ depth }: { depth?: number } = {}): T[] => {
    const getPaths = (
      tree: Tree,
      tuples: T[] = [],
      currentTuple: T = [] as unknown as T,
    ): T[] => {
      const isLeaf = tree.size === 0;
      const reachedDepth =
        typeof depth !== "undefined" && currentTuple.length === depth;
      if ((isLeaf || reachedDepth) && currentTuple.length) {
        tuples.push(currentTuple);
      } else {
        tree.keys().forEach((key) => {
          getPaths(tree.get(key)!, tuples, [...currentTuple, key] as T);
        });
      }
      return tuples;
    };

    return getPaths(this.#map);
  };
}
