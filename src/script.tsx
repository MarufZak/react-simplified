import React from "./react";
import ReactDOM from "./react-dom";

const Button = ({ children, ...props }: any) => {
  return <button {...props}>{children}</button>;
};

const App = () => {
  return [1, 2, 3, 4, 5].map((item) => {
    return <Button>{item}</Button>;
  });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
