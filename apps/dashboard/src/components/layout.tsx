import React from "@marufzak/react";
import Sidebar from "./sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
