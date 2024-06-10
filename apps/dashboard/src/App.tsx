import React from "react-simplified";
import DashboardLayout from "./components/layout";
import Profile from "./pages/dashboard/profile";

const App = () => {
  return (
    <DashboardLayout>
      <Profile />
    </DashboardLayout>
  );
};

export default App;
