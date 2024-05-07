const staticTypes = ["string", "number"];

function renderChildrenRecursively(virtualDom, parent) {
  for (let i = 0; i < virtualDom.length; i++) {
    const renderedNode = renderRecursively(virtualDom[i]);
    parent.appendChild(renderedNode);
  }
}

function renderRecursively(virtualDom) {
  if (staticTypes.includes(typeof virtualDom)) {
    return document.createTextNode(virtualDom);
  } else if (typeof virtualDom === "object") {
    const element = document.createElement(virtualDom.tagName);

    const props = virtualDom.props;
    for (const key in props) {
      if (key === "children") {
        continue;
      }
      element.setAttribute(key, props[key]);
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
}

export function createRoot(rootElement) {
  return {
    // returns the root element
    render: (virtualDom) =>
      Array.isArray(virtualDom)
        ? renderChildrenRecursively(virtualDom, rootElement)
        : rootElement.appendChild(renderRecursively(virtualDom)),
  };
}
