// TODO: find way to make callerStack according to component invocations.
export function getCallerStack() {
  const stack = new Error().stack!.split("\n");

  const result = [];
  for (let i = 0; i < stack.length; i += 2) {
    const item = stack[i].trim().split(" ")[1] || "";
    if (i >= stack.length - 1) {
      return result;
    } else if (item.startsWith("on")) {
      continue;
    }

    result.push(item);
  }

  return result;
}
