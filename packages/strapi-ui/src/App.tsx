import React from "react-simplified/core";
import Button from "./components/button";

const App = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-4 w-max p-5 gap-4">
      <Button theme="success" variant="secondary" size="icon">
        a
      </Button>
    </div>
  );
};

export default App;
