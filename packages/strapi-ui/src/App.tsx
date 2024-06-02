import React from "react-simplified";
import { PasswordInput, TextInput } from "./components/input";

const App = () => {
  return (
    <form className="p-10">
      <PasswordInput
        disabled
        placeholder="Hello"
        label="My label"
        description="My description"
      />
    </form>
  );
};

export default App;
