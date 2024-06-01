export function attachStyles(
  element: HTMLElement | SVGElement,
  styles: Record<string, string>,
) {
  for (const key in styles) {
    element.style.setProperty(key, styles[key]);
  }
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
];

export function isConditionalAttribute(attribute: string) {
  return conditionalAttributes.includes(attribute);
}

const staticTypes = ["string", "number", "boolean"];
export function isStaticType(element: unknown) {
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
