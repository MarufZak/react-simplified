import type { ReactElementType, VDOMType } from "../shared/types";

const staticTypes = ["string", "number"] as const;
type StaticType = (typeof staticTypes)[number];

function renderChildrenRecursively(
  virtualDom: (string | number | ReactElementType)[],
  parent: HTMLElement
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
    console.log(virtualDom);

    const element = document.createElement(virtualDom.type);

    const props = virtualDom.props;
    for (const key in props) {
      if (
        key === "children" ||
        props[key] === undefined ||
        props[key] === null
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
    // pitfall. need to create own JSX namespace if should be fixed
    render: (virtualDom: JSX.Element) =>
      Array.isArray(virtualDom)
        ? renderChildrenRecursively(virtualDom, rootElement)
        : rootElement.appendChild(
            renderRecursively(virtualDom as unknown as VDOMType)
          ),
  };
}
