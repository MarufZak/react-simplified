import React from "./react";
import ReactDOM from "./react-dom";

const App = () => {
  return <p>Hello World!</p>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
