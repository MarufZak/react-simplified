# @marufzak/react

This project serves as a minimalistic implementation of the React library, originally created and maintained by Facebook.

## Features

- **JSX-Runtime**: Custom JSX runtime for creating React elements.
- **Event Handlers**: Support for dom-attachable event handlers.

## Installation

Assuming you have cloned the whole repository, build this package by running:

```bash
npm run build -w @marufzak/react
```

Now you can go to strapi-ui package and see this package in action! For more information, refer to [its documentation.](../strapi-ui/README.md)

## Troubleshooting

1. Problem: Uncaught TypeError: Failed to resolve module specifier "react". Relative references must start with either "/", "./", or "../". Solution: You either have imported React Simplified from wrong directory (import it from "@marufzak/react" instead), or you have not put keyword type before importing ReactTypes from "@marufzak/react/types" (import type ReactTypes from "@marufzak/react/types")
2. Problem: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead. Solution: Import React from "@marufzak/react" at the top of your file.
