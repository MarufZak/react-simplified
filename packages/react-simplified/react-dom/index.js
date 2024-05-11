class EventRegistry {
  constructor() {
    this.eventRegistry = {};
  }
  hasEvent(event) {
    return Object.keys(this.eventRegistry).includes(event);
  }
  hasEventTarget(event, eventTarget) {
    return this.eventRegistry[event].has(eventTarget);
  }
  setEvent(event, eventTarget, eventHandler) {
    if (this.hasEvent(event)) {
      if (this.hasEventTarget(event, eventTarget)) {
        return;
      }
      document.body.addEventListener(event, eventHandler);
      this.eventRegistry[event].set(eventTarget, eventHandler);
      return;
    }
    document.body.addEventListener(event, eventHandler);
    const map = new Map();
    map.set(eventTarget, eventHandler);
    this.eventRegistry[event] = map;
  }
  getEvent(event, eventTarget) {
    if (!this.hasEvent(event)) {
      return;
    }
    return this.eventRegistry[event].get(eventTarget);
  }
}
const eventRegistry = new EventRegistry();

function attachStyles(element, styles) {
  for (const key in styles) {
    element.style.setProperty(key, styles[key]);
  }
}
const specialEventCases = {
  onDoubleClick: "dblclick"
};
function transformJSXEvent(event) {
  if (Object.keys(specialEventCases).includes(event)) {
    return specialEventCases[event];
  }
  const result = event.slice(2); // remove "on"
  return result.toLowerCase();
}

const staticTypes = ["string", "number"];
function renderChildrenRecursively(virtualDom, parent) {
  for (let i = 0; i < virtualDom.length; i++) {
    const child = virtualDom[i];
    if (Array.isArray(child)) {
      return renderChildrenRecursively(child, parent);
    }
    const renderedNode = renderRecursively(child);
    parent.appendChild(renderedNode);
  }
}
function renderRecursively(virtualDom) {
  if (virtualDom === null || virtualDom === undefined) {
    return document.createTextNode("");
  } else if (staticTypes.includes(typeof virtualDom)) {
    return document.createTextNode(virtualDom.toString());
  } else if (typeof virtualDom === "object") {
    const element = document.createElement(virtualDom.type);
    const props = virtualDom.props;
    for (const key in props) {
      if (key === "children" || props[key] === undefined || props[key] === null) {
        continue;
      } else if (key === "style") {
        attachStyles(element, props[key]);
        continue;
      } else if (key.startsWith("on")) {
        const event = transformJSXEvent(key);
        eventRegistry.setEvent(event, element, props[key]);
        continue;
      }
      element.setAttribute(key, props[key]);
    }
    const children = props === null || props === void 0 ? void 0 : props.children;
    for (let i = 0; i < (children === null || children === void 0 ? void 0 : children.length); i++) {
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
function createRoot(rootElement) {
  if (!rootElement) {
    throw new Error("root element not found");
  }
  return {
    // pitfall. need to create own JSX namespace if double assertion should be fixed
    render: virtualDom => Array.isArray(virtualDom) ? renderChildrenRecursively(virtualDom, rootElement) : rootElement.appendChild(renderRecursively(virtualDom))
  };
}

const ReactDOM = {
  createRoot
};

export { ReactDOM as default };
