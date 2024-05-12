export function createElement(type, attributes, ...rest) {
    const children = rest.length > 0 ? rest : [];
    if (typeof type === "function") {
        // inner components override children prop
        return type(Object.assign(Object.assign({}, attributes), { children }));
    }
    return {
        type,
        props: Object.assign(Object.assign({}, attributes), { children }),
    };
}
