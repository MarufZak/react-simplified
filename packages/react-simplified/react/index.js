function createElement(type, attributes) {
  for (
    var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2;
    _key < _len;
    _key++
  ) {
    rest[_key - 2] = arguments[_key];
  }
  const children = rest.length > 0 ? rest : [];
  if (typeof type === "function") {
    // inner components override children prop
    return type(
      Object.assign(Object.assign({}, attributes), {
        children,
      }),
    );
  }
  return {
    type,
    props: Object.assign(Object.assign({}, attributes), {
      children,
    }),
  };
}

const React = {
  createElement,
};

export { React as default };
