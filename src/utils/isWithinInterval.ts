export const isWithinInterval = (
  a: number,
  interval: [number, number],
): boolean => a >= interval[0] && a <= interval[1];
