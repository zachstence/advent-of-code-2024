export const filterTruthy = <T>(input: (T | undefined)[]): T[] =>
  input.filter(Boolean) as T[];
