import { isWithinInterval } from "./isWithinInterval.js";

export const doIntervalsOverlap = (
  a: [number, number],
  b: [number, number],
): boolean => {
  const [a1, a2] = a;
  const [b1, b2] = b;
  return (
    isWithinInterval(a1, b) ||
    isWithinInterval(a2, b) ||
    isWithinInterval(b1, a) ||
    isWithinInterval(b2, a)
  );
};
