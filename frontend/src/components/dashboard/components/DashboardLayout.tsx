"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "hsl(240 6% 4%)" }}>
      <DashboardSidebar />
      {/* pl-14 = 56px collapsed sidebar width */}
      <div className="flex flex-1 flex-col pl-14 transition-all duration-300">
        <DashboardTopbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;