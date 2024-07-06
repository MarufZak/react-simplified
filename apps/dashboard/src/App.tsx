import React from "@marufzak/react";
import DashboardLayout from "./components/layout";
import Welcome from "./pages/dashboard/welcome";
import Login from "./pages/login";
import Profile from "./pages/dashboard/profile";
import type { PathType } from "./components/sidebar";
import Marketplace from "./pages/dashboard/marketplace";
import Media from "./pages/dashboard/media";
import Settings from "./pages/dashboard/settings";

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

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [activePath]);

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

  const handleLogout = () => {
    setUser(null);
    document.body.classList.remove("dark");
    setActivePath("Welcome");
  };

  // current patching algorithm requires
  // this to make full rerender
  return user ? (
    activePath === "Welcome" ? (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <Welcome />
      </DashboardLayout>
    ) : activePath === "Profile" ? (
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
    ) : activePath === "Settings" ? (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <Settings onLogout={handleLogout} />
      </DashboardLayout>
    ) : (
      <DashboardLayout
        onPathChange={handlePathChange}
        activePath={activePath}
        user={user}
      >
        <div></div>
      </DashboardLayout>
    )
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default App;
