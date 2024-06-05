import React from "react-simplified";
import Status from "./components/status";

const App = () => {
  return (
    <div className="p-6 flex gap-3">
      <Status type="published">Published</Status>
      <Status type="draft">Draft</Status>
      <Status type="modified">Modified</Status>
    </div>
  );
};

export default App;
