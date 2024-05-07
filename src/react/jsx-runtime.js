import { REACT_ELEMENT_TYPE } from "../shared/element-types";

// TODO: dynamic element type
export function createElement(tagName, attributes = {}, ...rest) {
  const children = rest.length > 0 ? rest : null;

  if (typeof tagName === "function") {
    // pass props as first argument
    return tagName({
      ...attributes,
      children,
    });
  }

  return {
    type: REACT_ELEMENT_TYPE,
    tagName,
    props: {
      ...attributes,
      children,
    },
  };
}
