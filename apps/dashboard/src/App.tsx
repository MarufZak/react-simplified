import React from "react-simplified";
import DashboardLayout from "./components/layout";
import Welcome from "./pages/welcome";

const App = () => {
  return (
    <DashboardLayout>
      <Welcome />
    </DashboardLayout>
  );
};

export default App;
