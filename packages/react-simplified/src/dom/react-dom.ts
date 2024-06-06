import { registerRef } from "../core/useRef";
import type { ReactElementType, VDOMType } from "../shared/types";
import eventRegistry from "./eventRegistry";
import {
  attachAttribute,
  attachStyles,
  isConditionalAttribute,
  isStaticType,
  isSvgElement,
  transformJSXEvent,
} from "./utils";

type RootComponentType = (() => ReactElementType) | null;
type RootElementType = HTMLElement | null;

class ReactDOM {
  private rootComponent: RootComponentType = null;
  private rootElement: RootElementType = null;

  private renderChildrenRecursively(
    virtualDom: VDOMType[],
    parent: HTMLElement | SVGElement,
  ): void {
    for (let i = 0; i < virtualDom.length; i++) {
      const child = virtualDom[i];
      if (Array.isArray(child)) {
        return this.renderChildrenRecursively(child, parent);
      }

      const renderedNode = this.renderRecursively(child);
      parent.appendChild(renderedNode);
    }
  }

  private renderRecursively(virtualDom: VDOMType) {
    if (virtualDom === null || virtualDom === undefined) {
      return document.createTextNode("");
    } else if (isStaticType(virtualDom)) {
      return document.createTextNode(virtualDom.toString());
    } else if (typeof virtualDom === "object") {
      const element = isSvgElement(virtualDom.type)
        ? document.createElementNS(
            "http://www.w3.org/2000/svg",
            virtualDom.type,
          )
        : document.createElement(virtualDom.type);

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
          eventRegistry.setEvent(event, element, props[key]);
          continue;
        } else if (key === "ref") {
          registerRef(element, props[key]);
          continue;
        } else if (isConditionalAttribute(key) && !props[key]) {
          continue;
        }

        attachAttribute(element, key, props[key]);
      }

      const children = props.children;
      for (let i = 0; i < children?.length; i++) {
        const child = children[i];
        if (Array.isArray(child)) {
          this.renderChildrenRecursively(child, element);
        } else {
          element.appendChild(this.renderRecursively(child));
        }
      }

      return element;
    }

    throw new Error("unknown vdom type");
  }

  registerRootElement(rootElement: RootElementType) {
    if (!rootElement) {
      throw new Error("root element not found");
    }

    this.rootElement = rootElement;
  }

  registerRootComponent(component: RootComponentType) {
    this.rootComponent = component;
  }

  render() {
    if (!this.rootElement || !this.rootComponent) {
      throw new Error("root element or root component is not registered");
    }

    const virtualDom = this.rootComponent();

    // handle situation when root component returns array of values
    if (Array.isArray(virtualDom)) {
      return this.renderChildrenRecursively(virtualDom, this.rootElement);
    }

    const root = this.renderRecursively(virtualDom);
    return this.rootElement.appendChild(root);
  }

  commit(newDOM: HTMLElement | Text | SVGElement) {
    if (!this.rootElement || !this.rootComponent) {
      throw new Error("root element or root component is not registered");
    }

    this.rootElement.innerHTML = "";
    this.rootElement.appendChild(newDOM);
  }
}

export default new ReactDOM();
