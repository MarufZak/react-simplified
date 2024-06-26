import React from "@marufzak/react";

const App = () => {
  const [text, setText] = React.useState(() => {
    console.log(1);
    return "";
  });

  React.useEffect(() => {
    console.log(2);
  }, []);

  console.log(3);

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
