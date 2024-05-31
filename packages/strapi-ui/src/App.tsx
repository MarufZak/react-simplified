import React from "react-simplified";
import Button from "./components/button";

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button
        onClick={() => setCount(count + 1)}
        theme="danger"
        variant="primary"
      >
        First {count}
      </Button>
      <Button theme="success" variant="primary">
        Second
      </Button>
    </div>
  );
};

export default App;
