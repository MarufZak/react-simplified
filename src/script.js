import React from "./react";

const element = (
  <div>
    just a test
    <a href="/">Link</a>
    <p style="color:red;">hello</p>
    <h1>Good work!</h1>
    <h2>It is working!!!</h2>
  </div>
);

React.createRoot("root", element);
