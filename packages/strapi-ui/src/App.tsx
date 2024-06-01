import React from "react-simplified";
import Avatar from "./components/avatar";

const App = () => {
  return (
    <div className="p-8">
      <Avatar fallback="Ma'ruf" src="./avatar.png" />
    </div>
  );
};

export default App;
