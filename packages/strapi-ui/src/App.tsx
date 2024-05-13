import React from "react-simplified/core";
import Button from "./components/button";

const App = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-4 w-max p-5 gap-4">
      <Button theme="default" variant="primary" size="sm">
        Hello World
      </Button>
      <Button theme="default" variant="secondary" size="sm">
        Hello World
      </Button>
      <Button theme="default" variant="tertiary" size="sm">
        Hello World
      </Button>
      <Button theme="success" variant="primary" size="sm">
        Hello World
      </Button>
      <Button theme="default" variant="secondary" size="sm">
        Hello World
      </Button>
      <Button theme="danger" variant="primary" size="sm">
        Hello World
      </Button>
      <Button theme="default" variant="secondary" size="sm">
        Hello World
      </Button>
      <Button theme="text" variant="primary" size="sm">
        Hello World
      </Button>
    </div>
  );
};

export default App;
