import React from "react-simplified";
import Radio from "./components/radio";

const App = () => {
  return (
    <form className="p-10">
      <Radio id="1" name="hi" />
      <Radio id="2" name="hi" />
      <Radio disabled id="3" name="hi" />
    </form>
  );
};

export default App;
