import React from "@marufzak/react";
import DashboardLayout from "./components/layout";
import Welcome from "./pages/dashboard/welcome";

const App = () => {
  return (
    <DashboardLayout>
      <Welcome />
    </DashboardLayout>
  );
};

export default App;
