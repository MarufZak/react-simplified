import { rootComponent } from "../dom/react-dom";

export function getCallerStack() {
  const stack = new Error().stack!.split("\n");

  const result: string[] = [];

  for (let i = 0; i < stack.length; i++) {
    const item = stack[i].trim().split(" ")[1] || "";

    // this makes the caller stack easier to read and debug,
    // for example ['Sidebar', 'DashboardLayout', 'App', 'render'];
    if (item.startsWith("RSComponent-")) {
      result.push(item.replace("RSComponent-", ""));
    } else if (item.startsWith("ReactDOM.")) {
      result.push(item.replace("ReactDOM.", ""));
    } else if (item === rootComponent?.name) {
      result.push(item);
    }
  }

  return result;
}

export function compareArrays(firstArray: any[], secondArray: any[]) {
  const biggestLength =
    firstArray.length > secondArray.length
      ? firstArray.length
      : secondArray.length;

  let result = true;

  for (let i = 0; i < biggestLength; i++) {
    // Object.is is used to check values such as NaN
    if (Object.is(firstArray[i], secondArray[i]) === false) {
      result = false;
      break;
    }
  }

  return result;
}
