export const isNaN = (value: unknown): boolean => {
  return Number.isNaN(value);
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
