import React from "@marufzak/react";
import DashboardLayout from "./components/layout";
import Welcome from "./pages/dashboard/welcome";
import Login from "./pages/login";
import Profile from "./pages/dashboard/profile";
import type { PathType } from "./components/sidebar";

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
    <DashboardLayout
      onPathChange={handlePathChange}
      activePath={activePath}
      user={user}
    >
      {activePath === "Content" ? <Welcome /> : null}
      {activePath === "Builder" ? <Profile /> : null}
    </DashboardLayout>
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default App;
