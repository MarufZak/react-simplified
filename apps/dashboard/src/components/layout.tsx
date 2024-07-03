import React from "@marufzak/react";
import Sidebar, { type PathType } from "./sidebar";
import type { User } from "../App";

interface Props {
  user: User | null;
  children: React.ReactNode;
  activePath: PathType;
  onPathChange: (newPath: PathType) => void;
}

const DashboardLayout = ({
  children,
  user,
  activePath,
  onPathChange,
}: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(() => {
    const value = localStorage.getItem("isSidebarCollapsed");
    return value ? (JSON.parse(value) as boolean) : false;
  });

  const handleCollapseChange = () => {
    const newValue = !isSidebarCollapsed;
    localStorage.setItem("isSidebarCollapsed", String(newValue));
    setIsSidebarCollapsed(newValue);
  };

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
      <Sidebar
        onPathChange={onPathChange}
        activePath={activePath}
        user={user}
        isCollapsed={isSidebarCollapsed}
        handleCollapseChange={handleCollapseChange}
      />
      <main className="relative p-[55px] bg-neutral-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
