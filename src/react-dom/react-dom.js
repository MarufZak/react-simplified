function renderRecursively(virtualDom) {
  if (typeof virtualDom === "string") {
    return document.createTextNode(virtualDom);
  } else if (Array.isArray(virtualDom)) {
    for (let i = 0; i < virtualDom.length; i++) {
      return renderRecursively(virtualDom[i]);
    }
  } else if (typeof virtualDom === "object") {
    const element = document.createElement(virtualDom.tagName);

    const attributes = virtualDom.attributes || {};
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    const children = virtualDom.children;
    for (let i = 0; i < children?.length; i++) {
      renderChildrenRecursively(element, children[i]);
    }

    return element;
  }
}

function renderChildrenRecursively(parent, children) {
  for (let i = 0; i < children.length; i++) {
    const child = renderRecursively(children[i]);

    parent.appendChild(child);
  }
}

export function createRoot(element) {
  return {
    // returns the root element
    render: (virtualDom) => element.appendChild(renderRecursively(virtualDom)),
  };
}
