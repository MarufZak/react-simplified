import React from "./index";
import type {
  HTMLTagElementType,
  ReactElementPropsType,
  ReactElementType,
  VDOMType,
} from "../shared/types";
import { cloneFunction, getCallerStack } from "./utils";
import componentRegistry from "./componentRegistry";

export function createElement(
  type: HTMLTagElementType | Function,
  attributes: ReactElementType["props"],
  ...rest: VDOMType[]
): ReactElementType | void {
  try {
    const children = rest.length > 0 ? rest : [];
    const key = attributes?.key;
    if (typeof type === "function") {
      // we need to attach key to function instance,
      // using type instead func would lead to changing
      // name of original function
      const func = cloneFunction(type, type.name);

      // because vdom is generated on state change,
      // RSComponent- prefix is added to fns on every
      // change. This condition prevents it.
      if (
        func.name.includes("RSComponent-") === false &&
        func.name !== Fragment.name
      ) {
        // this makes easy to filter caller stack for hooks
        // make - because fns cannot be declared in such way
        // => consumers cannot 'break' it.
        const newFunctionName =
          typeof key === "undefined" || key === null
            ? `RSComponent-${func.name}`
            : `RSComponent-${func.name}-${key.toString()}`;
        Object.defineProperty(func, "name", {
          value: newFunctionName,
        });
      }

      // functionality of mounted components store
      if (func.name !== Fragment.name) {
        let stringCallerStack = getCallerStack().join(".");
        const functionName = func.name.replace("RSComponent-", "");

        if (componentRegistry.hasComponent(functionName) === false) {
          stringCallerStack = `${functionName}.${stringCallerStack}`;
        }

        if (key !== undefined && key !== null) {
          stringCallerStack = stringCallerStack.replace(`-${key}`, "");
        }

        componentRegistry.registerComponent(stringCallerStack, key);
      }

      // because key is not a prop to func component,
      // meaning it cannot be used inside of that component.
      if (typeof key !== "undefined") {
        delete attributes.key;
      }

      return func({
        ...attributes,
        children,
      });
    }

    return {
      type,
      props: {
        ...attributes,
        children,
      } as ReactElementPropsType,
    };
  } catch (error) {
    console.log({ error });
  }
}

export function Fragment({ children }: { children: VDOMType[] }) {
  return {
    type: "fragment",
    props: {
      // fragment has no attributes
      children,
    },
  } as React.ReactNode;
}
