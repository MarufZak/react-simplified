import React from "@marufzak/react";

const App = () => {
  const [text, setText] = React.useState("");

  return (
    <input
      value={text}
      onClick={(e: MouseEvent) => {
        e.preventDefault();
      }}
    />
  );
};

export default App;
