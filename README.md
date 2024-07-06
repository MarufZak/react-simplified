# React Simplified

React simplified is simple, zero-dependency, and lightweight React.js implementation that provides a simple way to create user interfaces. See video demo of the dashboard application built with this library [here](./apps/dashboard/README.md)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
- [Hooks](#hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useRef](#useref)
  - [useId](#useid)
- [Notes](#notes)
  - [Flushing states](#flushing-states)
  - [Experimental patching](#experimental-patching)
  - [Event types](#event-types)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **JSX runtime**: A simple JSX runtime that converts JSX to React elements.
- **React DOM**: A simple DOM renderer that renders React elements and fragments to the DOM.
- **Events system**: Event system that allows you to add event listeners to elements.
- **Component lifecycle**: Component lifecycle methods that allow you to run code when a component is mounted, updated, or unmounted, using useEffect hook.
- **Reconciliation**: Reconciliation algorithm to update the DOM efficiently.
- **Hooks**: A set of hooks that allow you to manage the state of your components, handle side effects, access DOM elements, and generate unique and consistent ids with useState, useEffect, useRef, and useId hooks respectively.
- **Typescript**: TypeScript support, including generic hooks, React elements, and others.

## Installation

To install core package, refer to [its documentation.](./packages/react/README.md)

Instructions below show how to install the repository and run the examples.

```bash
git clone https://github.com/MarufZak/react-simplified
cd react-simplified
npm install

# build core and strapi-ui packages
npm run build -w @marufzak/react
npm run build -w @marufzak/strapi-ui

# run dashboard example
npm run watch -w dashboard
```

## Examples

1. [Dashboard](./apps/dashboard/README.md). There is also video demo!
2. [@marufzak/strapi-ui](./packages/strapi-ui/README.md). There is also video demo!

Here is also a simple counter example:

```tsx
import React from "@marufzak/react";
import ReactDOM from "@marufzak/react/dom";

const App = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Counter mounted");

    // useEffect has support for cleanup functions!
    return () => {
      console.log("Counter unmounted");
    };
  }, []);

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.registerRootComponent(App);
ReactDOM.registerRootElement(root);
ReactDOM.render();
```

and Login form example:

```tsx
import React from "@marufzak/react";
import ReactDOM from "@marufzak/react/dom";

// You can do this with controlled inputs
const App = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Username: ${username}, Password: ${password}`);
  };

  return (
    <form experimental__patching={true} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        experimental__patching={true}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        experimental__patching={true}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

// Or with uncontrolled inputs, with the help of refs
const App = () => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    if (!formRef.current) {
      return;
    }

    e.preventDefault();
    const formData = new FormData(formRef.current);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    console.log({
      username,
      password,
    });
  };

  return (
    <form ref={formRef}>
      <h1>Login</h1>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

const root = document.getElementById("root");
ReactDOM.registerRootComponent(App);
ReactDOM.registerRootElement(root);
ReactDOM.render();
```

## Hooks

The library comes with a set of hooks that you can use to manage the state of your components, handle side effects, and access DOM elements. Here is a list of hooks that you can use:

### useState

```tsx
import React from "@marufzak/react";

const App = () => {
  const [show, setShow] = React.useState(true);

  return (
    <div>
      {show && <p>Hello, world!</p>}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </div>
  );
};
```

State updates are batched, so you can update the state multiple times in a single render cycle, and the component will be re-rendered only once. You can learn more about the batching [here](https://react.dev/learn/queueing-a-series-of-state-updates).

```tsx
import React from "@marufzak/react";

const App = () => {
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);

    // number will be updated only once, and it will be incremented by 1.
  };

  return (
    <>
      <h1>{number}</h1>
      <button onClick={handleClick}>add</button>
    </>
  );
};
```

### useEffect

useEffect hook has support for cleanup functions and dependency array, so you can run code when a component is mounted, updated, or unmounted. Here is an example:

```tsx
import React from "@marufzak/react";

const App = () => {
  React.useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return <p>Hello, world!</p>;
};
```

You can also use the dependency array to run code when a specific value changes:

```tsx
import React from "@marufzak/react";

const App = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Count changed:", count);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### useRef

useRef hook allows you to access DOM elements, or any other value, in your components. Here is an example:

```tsx
import React from "@marufzak/react";

const App = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus</button>
    </>
  );
};
```

### useId

useId hook generates consistent and unique ids for your components. Here is an example:

```tsx
import React from "@marufzak/react";

const App = () => {
  const id = React.useId();

  return (
    <div>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </div>
  );
};
```

## Notes

### Flushing states

### Flushing states

By default, the library flushes the state updates after any DOM event, such as `click`, `input`, etc. This means that the state updates will be applied immediately after the event is triggered, making it possible for useState to be batched. However, if you want to update the state inside useEffect hook, you need to manually flush the state updates using `React.flushStateUpdates()` function. Here is an example:

```tsx
import React from "@marufzak/react";

const App = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText("Hello, world!");
    setIsCopied(true);
  };

  React.useEffect(() => {
    if (!isCopied) {
      return;
    }

    setTimeout(() => {
      setIsCopied(false);
      React.flushStateUpdates();
    }, 3000);
  }, [isCopied]);

  return <button onClick>Copy</button>;
};
```

### Experimental patching

Every React element can be attached a `experimental__patching` prop that allows you to patch the element when rendering is done. By default, if there is no `experimental__patching` prop, the element will be replaced with the new element every time rendering is triggered. Note that if you want to attach `experimental__patching` prop to element, you have to also attach it to its parent elements in the tree, this is done to avoid deep tree traversal in patching.

### Event types

- The library has full TypeScript support, including types for hooks, React elements, and others. However, this library does not come with types for events, so you have to define them yourself. For example:

```tsx
import React from "@marufzak/react";

const App = () => {
  const handleClick = (e: Event) => {
    const target = e.target as HTMLButtonElement;
    console.log(target);
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

## Limitations

Some known limitations of the library are:

- **No support for portals**: The library does not support portals, so you cannot render elements outside of the root element.
- **No support for context**: The library does not support context API, so you cannot use it to pass data to deeply nested components.

## Troubleshooting

1. **Problem**: Uncaught TypeError: Failed to resolve module specifier "react". Relative references must start with either "/", "./", or "../".
   **Solution**: You probably have imported core package from wrong directory, import it from "@marufzak/react" instead.

2. **Problem**: 'React' refers to a UMD global, but the current file is a module.
   **Solution**: Consider adding an import instead. Import React from "@marufzak/react" at the top of your file.

## Contributing

If you have any ideas on how to improve the library, or you found a bug, feel free to open an issue or create a pull request. I will be happy to review it!

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
