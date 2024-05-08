import { REACT_ELEMENT_TYPE } from "../shared/element-types";
// TODO: dynamic element type
export function createElement(type, attributes = {}, ...rest) {
    const children = rest.length > 0 ? rest : [];
    if (typeof type === "function") {
        // inner components override children prop
        return type(Object.assign(Object.assign({}, attributes), { children }));
    }
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        props: Object.assign(Object.assign({}, attributes), { children }),
    };
}
