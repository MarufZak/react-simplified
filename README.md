# React-simplified

This project serves as a minimalistic implementation of the React library, originally created and maintained by Facebook.

## Features

- **JSX-Runtime**: Custom JSX runtime for creating React elements.
- **Event Handlers**: Support for dom-attachable event handlers.

### Installation

The library is not available as a package. To install it, you will need to clone the repository and set up your project structure manually:

```bash
git clone https://github.com/MarufZak/react-simplified.git
cd react-simplified
npm install
```

After cloning the repository, create an HTML file in the public directory with following contents:

```html
<div id="root"></div>
<script type="module" src="./script.js"></script>
```

Once you have set up your project, you need to compile the scripts:

```bash
npm run build
```

Now you can start editing src/script.tsx file.

To see your application in action, you'll need to serve the HTML file using a live server. You can do this by [installing through an extension in your IDE.](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
