import type { ReactElementType } from "../shared/types";

export function attachStyles(
  element: HTMLElement | SVGElement,
  styles: Record<string, string>,
) {
  for (const key in styles) {
    element.style.setProperty(key, styles[key]);
  }
}

const specialAttributes: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};

export function attachAttribute(
  element: HTMLElement | SVGElement,
  attribute: string,
  value: string,
) {
  if (Object.keys(specialAttributes).includes(attribute)) {
    element.setAttribute(specialAttributes[attribute], value);
    return;
  }

  element.setAttribute(attribute, value);
}

const specialEventCases = {
  onDoubleClick: "dblclick",
};

export function transformJSXEvent(event: string) {
  if (Object.keys(specialEventCases).includes(event)) {
    return specialEventCases[event as keyof typeof specialEventCases];
  }

  const result = event.slice(2); // remove "on"
  return result.toLowerCase();
}

const conditionalAttributes = [
  "disabled",
  "checked",
  "selected",
  "required",
  "hidden",
  "open",
];

export function isConditionalAttribute(attribute: string) {
  return conditionalAttributes.includes(attribute);
}

const staticTypes = ["string", "number", "boolean"];
export function isStaticType(
  element: unknown,
): element is string | number | boolean {
  return staticTypes.includes(typeof element);
}

const svgElements = [
  "svg",
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "ellipse",
  "g",
];
export function isSvgElement(element: string) {
  return svgElements.includes(element);
}

export function isDocumentFragment(virtualDom: ReactElementType) {
  return virtualDom.type === "fragment";
}

export function isObjectSame(
  firstObject: Record<string, any>,
  secondObject: Record<string, any>,
) {
  if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
    return false;
  }

  for (const key in firstObject) {
    if (
      typeof firstObject[key] === "object" &&
      typeof secondObject[key] === "object" &&
      isObjectSame(firstObject[key], secondObject[key]) === false
    ) {
      return false;
    }
    if (firstObject[key] !== secondObject[key]) {
      return false;
    }
  }

  return true;
}

export function isSameReactElement(
  firstElement: ReactElementType | null,
  secondElement: ReactElementType | null,
) {
  return (
    firstElement &&
    secondElement &&
    firstElement.type === secondElement.type &&
    isObjectSame(firstElement.props, secondElement.props)
  );
}
