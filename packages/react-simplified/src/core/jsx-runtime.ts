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
    // inner components override children prop
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
