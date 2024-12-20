import { rootComponent } from "../dom/react-dom";
import type { StoreType } from "./componentRegistry";

export function getCallerStack() {
  const stack = new Error().stack!.split("\n");

  const result: string[] = [];

  for (let i = 0; i < stack.length; i++) {
    const item = stack[i].trim().split(" ")[1] || "";

    // this makes the caller stack easier to read and debug,
    // for example ['Sidebar', 'DashboardLayout', 'App', 'render'];
    // RSComponent - React Simplified Component
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
  const biggestLength = Math.max(firstArray.length, secondArray.length);
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

export function cloneFunction(func: Function, name: string) {
  // eval is intentional here, because other methods to
  // clone function breaks the stores functionality.
  const result = eval(`(${func.toString()})`);
  Object.defineProperty(result, "name", {
    value: name,
  });

  return result;
}

export function insertAtStringPosition(
  first: string,
  second: string,
  index: number,
) {
  return [first.slice(0, index), second, first.slice(index)].join("");
}

export function transformStorePaths(
  currentStore: StoreType,
  referenceStore: StoreType,
  componentPaths: string[],
) {
  const result: string[] = [];

  for (let i = 0; i < componentPaths.length; i++) {
    const componentPath = componentPaths[i];
    const dotIndex = componentPath.indexOf(".");

    for (let x = 0; x < currentStore[componentPath].length; x++) {
      const component = currentStore[componentPath][x];

      if (referenceStore[componentPath]?.includes(component)) {
        continue;
      }

      const pushItem =
        component === "default"
          ? componentPath
          : insertAtStringPosition(componentPath, `-${component}`, dotIndex);

      result.push(pushItem);
    }
  }

  return result;
}
