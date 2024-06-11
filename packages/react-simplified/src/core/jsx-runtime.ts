import type {
  HTMLTagElementType,
  ReactElementPropsType,
  ReactElementType,
  VDOMType,
} from "../shared/types";

export function createElement(
  type: HTMLTagElementType | Function,
  attributes: ReactElementType["props"],
  ...rest: VDOMType[]
): ReactElementType {
  const children = rest.length > 0 ? rest : [];
  if (typeof type === "function") {
    if (type.name === "Fragment") {
      return {
        type: "div",
        props: {
          children,
        },
      };
    }

    // because vdom is generated on state change,
    // RSComponent- prefix is added to fns on every
    // change. This condition prevents it.
    if (type.name.includes("RSComponent-") === false) {
      // this makes easy to filter caller stack for hooks
      // make - because fns cannot be declared in such way
      // => consumers cannot 'break' it.
      Object.defineProperty(type, "name", {
        value: `RSComponent-${type.name}`,
      });
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

// TODO: implement Fragment
export function Fragment() {
  return "fragment";
}
