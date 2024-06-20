import type ReactTypes from "../types";
import type {
  HTMLTagElementType,
  ReactElementPropsType,
  ReactElementType,
  VDOMType,
} from "../shared/types";
import { getCallerStack } from "./utils";
import componentRegistry from "./componentRegistry";

export function createElement(
  type: HTMLTagElementType | Function,
  attributes: ReactElementType["props"],
  ...rest: VDOMType[]
): ReactElementType {
  const children = rest.length > 0 ? rest : [];
  if (typeof type === "function") {
    // because vdom is generated on state change,
    // RSComponent- prefix is added to fns on every
    // change. This condition prevents it.
    if (
      type.name.includes("RSComponent-") === false &&
      type.name !== Fragment.name
    ) {
      // this makes easy to filter caller stack for hooks
      // make - because fns cannot be declared in such way
      // => consumers cannot 'break' it.
      Object.defineProperty(type, "name", {
        value: `RSComponent-${type.name}`,
      });
    }

    // functionality of mounted components store
    if (type.name !== Fragment.name) {
      let stringCallerStack = getCallerStack().join(".");
      const functionName = type.name.replace("RSComponent-", "");

      if (componentRegistry.hasComponent(functionName) === false) {
        stringCallerStack = `${functionName}.${stringCallerStack}`;
      }

      componentRegistry.registerComponent(
        stringCallerStack,
        type,
        attributes?.key,
      );
    }

    // because key is not a prop to func component,
    // meaning it cannot be used inside of that component.
    if (attributes?.key) {
      delete attributes.key;
    }

    return type({
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
}

export function Fragment({ children }: { children: VDOMType[] }) {
  return {
    type: "fragment",
    props: {
      // fragment has no attributes
      children,
    },
  } as ReactTypes.ReactNode;
}
