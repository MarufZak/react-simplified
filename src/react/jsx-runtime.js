export function createElement(tagName, attributes, ...rest) {
  const children = rest.length > 0 ? [].concat(rest) : null;

  return {
    tagName,
    attributes,
    children,
  };
}

export function render(virtualDom) {
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
    element.appendChild(render(child));
  }

  return element;
}

export function createRoot(id, virtualDom) {
  document.getElementById(id).appendChild(render(virtualDom));
}
