import { compareArrays, getCallerStack } from "../core/utils";
import type { ReactElementPropsType, ReactElementType } from "../shared/types";
import eventRegistry from "./eventRegistry";

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
  tabIndex: "tabindex",
  defaultChecked: "checked",
  defaultValue: "value",
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

export function setAttributes(
  element: HTMLElement | SVGElement | DocumentFragment,
  props: ReactElementPropsType,
) {
  for (const key in props) {
    if (element instanceof DocumentFragment) {
      break;
    }

    if (key === "children" || props[key] === undefined || props[key] === null) {
      continue;
    } else if (key === "style") {
      attachStyles(element, props[key]);
      continue;
    } else if (key.startsWith("on")) {
      const event = transformJSXEvent(key);
      eventRegistry.setEvent(event, element, props[key]);
      continue;
    } else if (key === "ref") {
      if (
        typeof props[key] === "object" &&
        Object.keys(props[key]).includes("current")
      ) {
        props[key].current = element;
      }
      continue;
    } else if (isConditionalAttribute(key) && !props[key]) {
      continue;
    }

    attachAttribute(element, key, props[key]);
  }
}
