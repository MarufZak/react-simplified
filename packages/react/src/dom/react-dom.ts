import componentRegistry from "../core/componentRegistry";
import { ComponentError, InternalError } from "../shared/errors";
import type {
  ReactElementPropsType,
  ReactElementType,
  VDOMType,
} from "../shared/types";
import {
  isDocumentFragment,
  isStaticType,
  isSvgElement,
  setAttributes,
} from "./utils";

type RootComponentType = (() => ReactElementType) | null;
type RootElementType = HTMLElement | null;

export let rootComponent: RootComponentType = null;
export let rootElement: RootElementType = null;
export let currentVDOM: VDOMType = undefined;
export let isPatchingEnabled = false;

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

  componentRegistry.setComponentRegistryState("pending");
  const newVDOM = rootComponent();
  componentRegistry.setComponentRegistryState("completed");

  patch(
    currentVDOM,
    newVDOM,
    (rootElement.children[0] ?? rootElement) as RootElementType,
  );

  currentVDOM = newVDOM;
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
    currentNode.replaceChildren();
    renderChildrenRecursively(newVDOM, currentNode);
  } else if (
    Array.isArray(oldVDOM) &&
    Array.isArray(newVDOM) === false &&
    typeof newVDOM === "object"
  ) {
    for (let i = 0; i < oldVDOM.length; i++) {
      currentNode.removeChild(oldVDOM[i]);
    }
    currentNode.appendChild(renderRecursively(newVDOM));
  } else if (
    Array.isArray(oldVDOM) === false &&
    typeof oldVDOM === "object" &&
    Array.isArray(newVDOM)
  ) {
    for (let i = 0; i < currentNode.children.length; i++) {
      currentNode.children[i].remove();
    }
    renderChildrenRecursively(newVDOM, currentNode);
  } else if (typeof oldVDOM === "object" && typeof newVDOM === "object") {
    if (oldVDOM === null && newVDOM !== null && currentNode !== rootElement) {
      currentNode.parentElement!.replaceChildren(renderRecursively(newVDOM));
    } else if (oldVDOM !== null && newVDOM === null) {
      currentNode.remove();
    } else if (oldVDOM !== null && newVDOM !== null) {
      if (
        oldVDOM.type !== newVDOM.type ||
        !oldVDOM.props.experimental__patching
      ) {
        currentNode.replaceWith(renderRecursively(newVDOM));
        return;
      }

      // filters decreases number of checks, which
      // could be deeply nested and could be expensive
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
      [...editProps].forEach((prop) => {
        attributes[prop] = newVDOM.props[prop];
      });

      // this prevents bug when local variables inside
      // handler function are not updated on state change
      setAttributes(currentNode as HTMLElement, attributes);
      if (
        Object.keys(attributes).some((key) => key.startsWith("on")) &&
        (currentNode.nodeName === "INPUT" ||
          currentNode.nodeName === "TEXTAREA" ||
          currentNode.nodeName === "BUTTON")
      ) {
        let isActive = document.activeElement === currentNode;
        const replaceNode = renderRecursively(newVDOM) as HTMLElement;
        currentNode.replaceWith(replaceNode);

        if (isActive) {
          if (
            replaceNode instanceof HTMLInputElement ||
            replaceNode instanceof HTMLTextAreaElement
          ) {
            replaceNode.setSelectionRange(
              replaceNode.value.length,
              replaceNode.value.length,
            );
          }
          replaceNode.focus();
        }
      }

      // flattening is required here because nested arrays
      // are causing issues with current patching algorithm
      const oldVDOMChildren = oldVDOM.props.children.flat();
      const newVDOMChildren = newVDOM.props.children.flat();
      const iterationsCount = Math.max(
        oldVDOMChildren.length,
        newVDOMChildren.length,
      );

      for (let i = 0; i < iterationsCount; i++) {
        const newCurrentNode = currentNode.children[i] || currentNode;

        patch(
          oldVDOMChildren[i],
          newVDOMChildren[i],
          newCurrentNode as RootElementType,
        );
      }
    }
  } else if (typeof oldVDOM !== "object" && typeof newVDOM === "object") {
    if (currentNode === rootElement) {
      renderChildrenRecursively([newVDOM], currentNode);
      return;
    }
    currentNode.parentNode!.replaceChildren(renderRecursively(newVDOM));
  } else if (typeof oldVDOM === "object" && typeof newVDOM !== "object") {
    currentNode.remove();
  } else if (typeof oldVDOM !== "object" && typeof newVDOM !== "object") {
    if (oldVDOM === newVDOM) {
      return;
    }

    if (newVDOM) {
      currentNode.textContent = newVDOM.toString();
    }
  } else {
    throw new InternalError("unknown vdom type");
  }
}

export default {
  render,
  registerRootElement,
  registerRootComponent,
};
