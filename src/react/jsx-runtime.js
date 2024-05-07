import { REACT_ELEMENT_TYPE } from "../shared/element-types";

// TODO: dynamic element type
export function createElement(tagName, attributes, ...rest) {
  const children = rest.length > 0 ? [].concat(rest) : null;

  if (typeof tagName === "function") {
    return tagName({
      ...attributes,
      // inner components override children prop
      children,
    });
  }

  return {
    type: REACT_ELEMENT_TYPE,
    tagName,
    attributes,
    children,
  };
}
