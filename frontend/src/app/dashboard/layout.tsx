import type { ReactNode } from "react";
import "./dashboard.css";

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-root">
      {children}
    </div>
  );
}