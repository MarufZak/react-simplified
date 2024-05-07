import React from "./react";
import ReactDOM from "./react-dom";

const App = () => {
  return [1, 2, 3];
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
