import React from "react-simplified";
import SearchBar from "./components/search-bar";

const App = () => {
  return (
    <div className="p-6 flex gap-3">
      <SearchBar placeholder="Search for an entry" />
    </div>
  );
};

export default App;
