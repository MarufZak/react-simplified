import React from "./react";
import ReactDOM from "./react-dom";

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

const App = () => {
  return (
    <Button style="color: red;">
      hello
      <Button style="color: green;">
        bye
        <Button style="color: yellow;">yellow</Button>
      </Button>
    </Button>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
