import type { VDOMType } from "../shared/types";
import eventHandlers from "./eventRegistry";
import { attachStyles, transformJSXEvent } from "./utils";

const staticTypes = ["string", "number"] as const;
type StaticType = (typeof staticTypes)[number];

const conditionalAttributes = [
  "disabled",
  "checked",
  "selected",
  "required",
  "hidden",
] as const;
type ConditionalAttributeType = (typeof conditionalAttributes)[number];

function renderChildrenRecursively(
  virtualDom: VDOMType[],
  parent: HTMLElement,
) {
  for (let i = 0; i < virtualDom.length; i++) {
    const child = virtualDom[i];
    if (Array.isArray(child)) {
      return renderChildrenRecursively(child, parent);
    }

    const renderedNode = renderRecursively(child);
    parent.appendChild(renderedNode);
  }
}

function renderRecursively(virtualDom: VDOMType) {
  if (virtualDom === null || virtualDom === undefined) {
    return document.createTextNode("");
  } else if (staticTypes.includes(typeof virtualDom as StaticType)) {
    return document.createTextNode(virtualDom.toString());
  } else if (typeof virtualDom === "object") {
    const element = document.createElement(virtualDom.type);

    const props = virtualDom.props;
    for (const key in props) {
      if (
        key === "children" ||
        props[key] === undefined ||
        props[key] === null
      ) {
        continue;
      } else if (key === "style") {
        attachStyles(element, props[key]);
        continue;
      } else if (key.startsWith("on")) {
        const event = transformJSXEvent(key);
        eventHandlers.setEvent(event, element, props[key]);
        continue;
      } else if (key === "className") {
        element.className = props[key];
        continue;
      } else if (
        conditionalAttributes.includes(key as ConditionalAttributeType) &&
        !props[key]
      ) {
        continue;
      }

      element.setAttribute(key, props[key]);
    }

    const children = props?.children;
    for (let i = 0; i < children?.length; i++) {
      const child = children[i];
      if (Array.isArray(child)) {
        renderChildrenRecursively(child, element);
      } else {
        element.appendChild(renderRecursively(child));
      }
    }

    return element;
  }

  throw new Error("unknown vdom type");
}

export function createRoot(rootElement: HTMLElement | null) {
  if (!rootElement) {
    throw new Error("root element not found");
  }

  return {
    // pitfall. need to create own JSX namespace if double assertion should be fixed
    render: (virtualDom: JSX.Element) =>
      Array.isArray(virtualDom)
        ? renderChildrenRecursively(virtualDom, rootElement)
        : rootElement.appendChild(
            renderRecursively(virtualDom as unknown as VDOMType),
          ),
  };
}
