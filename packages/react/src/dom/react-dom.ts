import componentRegistry from "../core/componentRegistry";
import { ComponentError, InternalError } from "../shared/errors";
import type {
  ReactElementPropsType,
  ReactElementType,
  VDOMType,
} from "../shared/types";
import eventRegistry from "./eventRegistry";
import {
  attachAttribute,
  attachStyles,
  isConditionalAttribute,
  isDocumentFragment,
  isStaticType,
  isSvgElement,
  setAttributes,
  transformJSXEvent,
} from "./utils";

type RootComponentType = (() => ReactElementType) | null;
type RootElementType = HTMLElement | null;

export let rootComponent: RootComponentType = null;
export let rootElement: RootElementType = null;
export let currentVDOM: VDOMType = undefined;

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
    setAttributes(element, props);

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

  console.time("start");

  componentRegistry.setComponentRegistryState("pending");
  const virtualDom = rootComponent();
  componentRegistry.setComponentRegistryState("completed");

  // handle situation when root component returns array of values
  // if (Array.isArray(virtualDom)) {
  //   return renderChildrenRecursively(virtualDom, rootElement);
  // }

  if (rootElement.children.length > 0) {
    for (let i = 0; i < rootElement.children.length; i++) {
      patch(
        currentVDOM,
        virtualDom,
        rootElement.children[i] as RootElementType,
      );
    }
  } else {
    patch(currentVDOM, virtualDom, rootElement);
  }

  currentVDOM = virtualDom;
  console.timeEnd("start");
}

function patch(
  oldVDOM: VDOMType,
  newVDOM: VDOMType,
  currentNode: RootElementType,
) {
  if (!currentNode) {
    throw new InternalError("currentNode is not specified");
  }
  if (Array.isArray(oldVDOM) && Array.isArray(newVDOM)) {
    // debugger;
    currentNode.replaceChildren();
    renderChildrenRecursively(newVDOM, currentNode);
  } else if (
    Array.isArray(oldVDOM) &&
    Array.isArray(newVDOM) === false &&
    typeof newVDOM === "object"
  ) {
    // debugger;
    for (let i = 0; i < oldVDOM.length; i++) {
      currentNode.removeChild(oldVDOM[i]);
    }
    currentNode.appendChild(renderRecursively(newVDOM));
  } else if (
    Array.isArray(oldVDOM) === false &&
    typeof oldVDOM === "object" &&
    Array.isArray(newVDOM)
  ) {
    // debugger;
    for (let i = 0; i < currentNode.children.length; i++) {
      currentNode.children[i].remove();
    }
    renderChildrenRecursively(newVDOM, currentNode);
  } else if (typeof oldVDOM === "object" && typeof newVDOM === "object") {
    // debugger;

    if (oldVDOM === null && newVDOM !== null && currentNode !== rootElement) {
      // debugger;
      currentNode.parentElement!.replaceChildren(renderRecursively(newVDOM));
    } else if (oldVDOM !== null && newVDOM === null) {
      debugger;
      currentNode.remove();
    } else if (oldVDOM !== null && newVDOM !== null) {
      // debugger;

      if (oldVDOM.type !== newVDOM.type) {
        debugger;
        currentNode.parentElement!.appendChild(renderRecursively(newVDOM));
        currentNode.remove();
        return;
      }
      const oldVDOMPropsKeys = Object.keys(oldVDOM.props).filter(
        (key) => key !== "children",
      );
      const newVDOMPropsKeys = Object.keys(newVDOM.props).filter(
        (key) => key !== "children",
      );

      const removeProps = oldVDOMPropsKeys.filter(
        (prop) => newVDOMPropsKeys.includes(prop) === false,
      );
      const createProps = newVDOMPropsKeys.filter(
        (prop) => oldVDOMPropsKeys.includes(prop) === false,
      );
      const editProps = newVDOMPropsKeys.filter(
        (prop) =>
          removeProps.includes(prop) === false &&
          createProps.includes(prop) === false &&
          oldVDOM.props[prop] !== newVDOM.props[prop],
      );

      removeProps.forEach((prop) => {
        currentNode.removeAttribute(prop);
      });
      const attributes: ReactElementPropsType = {
        children: [],
      };
      [...createProps, ...editProps].forEach((prop) => {
        attributes[prop] = newVDOM.props[prop];
      });
      setAttributes(currentNode as HTMLElement, attributes);

      const oldVDOMChildren = oldVDOM.props.children;
      const newVDOMChildren = newVDOM.props.children;
      const iterationsCount = Math.max(
        oldVDOMChildren.length,
        newVDOMChildren.length,
      );

      // debugger;

      for (let i = 0; i < iterationsCount; i++) {
        let newCurrentNode =
          currentNode.children.length > 0
            ? currentNode.children[i]
            : currentNode;

        if (
          Array.isArray(oldVDOMChildren[i]) &&
          Array.isArray(newVDOMChildren[i])
        ) {
          currentNode.replaceWith(renderRecursively(newVDOM));
          continue;
        }

        if (!newCurrentNode) {
          debugger;
        }

        // debugger;
        patch(
          oldVDOMChildren[i],
          newVDOMChildren[i],
          newCurrentNode as RootElementType,
        );
      }
    }
  } else if (typeof oldVDOM !== "object" && typeof newVDOM === "object") {
    if (currentNode === rootElement) {
      currentNode.replaceChildren(renderRecursively(newVDOM));
    } else {
      currentNode.parentNode!.replaceChildren(renderRecursively(newVDOM));
    }
  }
}

export default {
  render,
  registerRootElement,
  registerRootComponent,
};
