function renderRecursively(virtualDom) {
  if (typeof virtualDom === "string") {
    return document.createTextNode(virtualDom);
  }

  const element = document.createElement(virtualDom.tagName);

  const attributes = virtualDom.attributes || {};
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  const children = virtualDom.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    element.appendChild(renderRecursively(child));
  }

  return element;
}

export function createRoot(element) {
  return {
    // returns the root element
    render: (virtualDom) => element.appendChild(renderRecursively(virtualDom)),
  };
}
