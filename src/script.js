import React from "./react";
import ReactDOM from "./react-dom";

const element = (
  <div>
    just a test
    <a href="/">Link</a>
    <p style="color:red;">hello</p>
    <h1>Good work!</h1>
    <h2>It is working!!!</h2>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
