import React from "@marufzak/react";
import DashboardLayout from "./components/layout";
import Welcome from "./pages/dashboard/welcome";
import Login from "./pages/login";
import Profile from "./pages/dashboard/profile";
import type { PathType } from "./components/sidebar";
import Marketplace from "./pages/dashboard/marketplace";
import Media from "./pages/dashboard/media";

export interface User {
  username: string;
  password: string;
  firstName?: string;
  familyName?: string;
  email?: string;
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

  // current patching algorithm requires
  // this to make full rerender
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
    ) : activePath === "Media Library" ? (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <Media />
      </DashboardLayout>
    ) : (
      <div></div>
    )
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default App;
