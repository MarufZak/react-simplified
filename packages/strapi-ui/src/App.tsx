import React from "react-simplified";
import Button from "./components/button";
import Divider from "./components/divider";

const App = () => {
  const [count, setCount] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  return (
    <div>
      <Button
        onClick={() => setCount(count + 1)}
        theme="danger"
        variant="primary"
      >
        First {count}
      </Button>
      <Divider />
      <Button
        onClick={() => setCount2(count2 + 1)}
        theme="success"
        variant="primary"
      >
        Second {count2}
      </Button>
    </div>
  );
};

export default App;
