import React from "react-simplified";
import type ReactTypes from "react-simplified/types";
import Sidebar from "./sidebar";

const DashboardLayout = ({ children }: { children: ReactTypes.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        handleCollapseChange={setIsSidebarCollapsed}
      />
      <main className="relative p-[55px] bg-neutral-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
