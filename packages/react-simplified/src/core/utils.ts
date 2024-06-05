export function getCallerStack() {
  const stack = new Error().stack!.split("\n");

  const result = [];
  for (let i = 3; i < stack.length; i += 2) {
    if (i >= stack.length - 1) {
      break;
    }
    result.push(stack[i].trim().split(" ")[1]);
  }

  return result;
}
