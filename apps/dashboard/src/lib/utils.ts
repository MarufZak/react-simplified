export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export function range(start: number = 1, end: number | void, step: number = 1) {
  const result = [];

  if (typeof end !== "number") {
    end = start;
    start = 1;
  }

  for (let i = start; i <= end; i += step) {
    result.push(i);
  }

  return result;
}
