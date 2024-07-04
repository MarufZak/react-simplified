import React from "@marufzak/react";
import DashboardLayout from "./components/layout";
import Welcome from "./pages/dashboard/welcome";
import Login from "./pages/login";
import Profile from "./pages/dashboard/profile";
import type { PathType } from "./components/sidebar";
import Marketplace from "./pages/dashboard/marketplace";

export interface User {
  username: string;
  password: string;
}

const App = () => {
  const [user, setUser] = React.useState<User | null>(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });
  const [activePath, setActivePath] = React.useState(() => {
    return (localStorage.getItem("activePath") as PathType) || "Content";
  });

  const handleLogin = (username: string, password: string) => {
    const newUser = {
      username,
      password,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handlePathChange = (newPath: PathType) => {
    localStorage.setItem("activePath", newPath);
    setActivePath(newPath);
  };

  // with experimental patching enabled,
  // the following code will not work as expected,
  // and approach would be different
  return user ? (
    activePath === "Content" ? (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <Welcome />
      </DashboardLayout>
    ) : activePath === "Builder" ? (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <Profile />
      </DashboardLayout>
    ) : activePath === "Marketplace" ? (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <Marketplace />
      </DashboardLayout>
    ) : (
      <div></div>
    )
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default App;
