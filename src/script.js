import React from "./react";
import ReactDOM from "./react-dom";

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

const App = () => {
  return (
    <div>
      <Button style="color:green;">
        Button 2<p>{[1, 2, 3]}</p>
        <Button style="color:green;">Button 3</Button>
      </Button>
      <Button style="color:green;">Button 2</Button>
      <Button style="color:green;">Button 2</Button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
