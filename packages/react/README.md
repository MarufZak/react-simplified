# @marufzak/react [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

This project serves as a minimalistic and zero-dependency implementation of the React library, originally created and maintained by Facebook.

## Features

- **JSX-Runtime**: Custom JSX runtime for creating React elements and fragments.
- **Hooks**: Support for hooks such as useState, useEffect, useRef, useId.
- **Event Handlers**: Support for dom-attachable event handlers.

## Installation

```bash
npm install @marufzak/react
```

Now you can see this package in action! Note: You need to configure build tools for it to work properly.

## Usage/Examples

```tsx
// index.tsx
import ReactDOM from "@marufzak/react/dom";
import App from "./App";

const root = document.getElementById("root");
ReactDOM.registerRootComponent(App);
ReactDOM.registerRootElement(root);
ReactDOM.render();
```

```tsx
// App.tsx
import React from "@marufzak/react";

function App() {
  return <h1>Hello world!</h1>;
}

export default App;
```

## Troubleshooting

1. Problem: Uncaught TypeError: Failed to resolve module specifier "react". Relative references must start with either "/", "./", or "../". Solution: You either have imported React Simplified from wrong directory (import it from "@marufzak/react" instead), or you have not put keyword type before importing ReactTypes from "@marufzak/react/types" (import type ReactTypes from "@marufzak/react/types")
2. Problem: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead. Solution: Import React from "@marufzak/react" at the top of your file.

## Authors

- [@marufzak](https://www.github.com/marufzak)

## License

[MIT](https://choosealicense.com/licenses/mit/)
