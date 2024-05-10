import React from "./react";
import ReactDOM from "./react-dom";

const App = () => {
  return (
    <div>
      <button
        onMouseEnter={() => console.log("enter")}
        onMouseLeave={() => console.log("leave")}
      >
        mouse
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
