import componentRegistry from "../core/componentRegistry";
import { ComponentError, InternalError } from "../shared/errors";
import type { ReactElementType, VDOMType } from "../shared/types";
import eventRegistry from "./eventRegistry";
import {
  attachAttribute,
  attachStyles,
  isConditionalAttribute,
  isDocumentFragment,
  isStaticType,
  isSvgElement,
  transformJSXEvent,
} from "./utils";

type RootComponentType = (() => ReactElementType) | null;
type RootElementType = HTMLElement | null;

export let rootComponent: RootComponentType = null;
export let rootElement: RootElementType = null;

function renderChildrenRecursively(
  virtualDom: VDOMType[],
  parent: HTMLElement | SVGElement | DocumentFragment,
): void {
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
  } else if (isStaticType(virtualDom)) {
    return document.createTextNode(virtualDom.toString());
  } else if (typeof virtualDom === "object") {
    const element = isSvgElement(virtualDom.type)
      ? document.createElementNS("http://www.w3.org/2000/svg", virtualDom.type)
      : isDocumentFragment(virtualDom)
        ? document.createDocumentFragment()
        : document.createElement(virtualDom.type);

    const props = virtualDom.props;
    for (const key in props) {
      if (element instanceof DocumentFragment) {
        break;
      }

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
        if (key === "checked") {
          console.log(props[key]);
        }
        continue;
      }

      if (key === "checked") {
        console.log(props[key]);
      }

      attachAttribute(element, key, props[key]);
    }

    const children = props.children;
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

  throw new InternalError("unknown vdom type");
}

function registerRootElement(element: RootElementType) {
  rootElement = element;
}

function registerRootComponent(component: RootComponentType) {
  rootComponent = component;
}

function render() {
  if (!rootElement || !rootComponent) {
    throw new ComponentError(
      "root element or root component is not registered",
    );
  }

  componentRegistry.setComponentRegistryState("pending");
  const virtualDom = rootComponent();
  componentRegistry.setComponentRegistryState("completed");

  // handle situation when root component returns array of values
  if (Array.isArray(virtualDom)) {
    return renderChildrenRecursively(virtualDom, rootElement);
  }

  const root = renderRecursively(virtualDom);
  rootElement.innerHTML = "";
  rootElement.appendChild(root);
}

export default {
  render,
  registerRootElement,
  registerRootComponent,
};
