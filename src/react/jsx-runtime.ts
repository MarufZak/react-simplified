import { REACT_ELEMENT_TYPE } from "../shared/element-types";
import type { HTMLTagElementType, ReactElementType } from "../shared/types";

// TODO: dynamic element type
export function createElement(
  type: HTMLTagElementType | Function,
  attributes: Record<string, unknown> = {},
  ...rest: (string | number | ReactElementType)[]
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
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props: {
      ...attributes,
      children,
    },
  };
}
