import React from "react-simplified";
import ProgressBar from "./components/progress-bar";

const App = () => {
  return (
    <div className="p-6 bg-red-50">
      <ProgressBar value={30} size="lg" />
    </div>
  );
};

export default App;
