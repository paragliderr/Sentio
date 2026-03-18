"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Wand2, FolderKanban, Compass, Database, GraduationCap, User, Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Studio",   path: "/dashboard",          icon: Wand2 },
  { label: "Projects", path: "/dashboard/projects",  icon: FolderKanban },
  { label: "Explore",  path: "/dashboard/explore",   icon: Compass },
  { label: "Datasets", path: "/dashboard/datasets",  icon: Database },
  { label: "Learn",    path: "/dashboard/learn",     icon: GraduationCap },
  { label: "Profile",  path: "/dashboard/profile",   icon: User },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Hover trigger zone — invisible strip on left edge */}
      <div
        className="fixed left-0 top-0 z-40 h-screen w-3"
        onMouseEnter={() => setExpanded(true)}
      />

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="fixed left-0 top-0 z-30 flex h-screen flex-col border-r transition-all duration-300 ease-in-out"
        style={{
          width: expanded ? "240px" : "56px",
          backgroundColor: "hsl(240 6% 6%)",
          borderColor: "hsl(240 4% 16%)",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-4 overflow-hidden">
          <Sparkles className="shrink-0 h-5 w-5" style={{ color: "hsl(263 70% 76%)" }} />
          <span
            className="text-lg font-semibold tracking-tight whitespace-nowrap transition-all duration-300"
            style={{
              color: "hsl(0 0% 98%)",
              opacity: expanded ? 1 : 0,
              width: expanded ? "auto" : 0,
            }}
          >
            Sentio
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200"
                style={{
                  backgroundColor: isActive ? "hsl(240 4% 12%)" : "transparent",
                  color: isActive ? "hsl(263 70% 76%)" : "hsl(240 4% 48%)",
                  minWidth: 0,
                }}
              >
                <item.icon className="shrink-0 h-4 w-4" />
                <span
                  className="whitespace-nowrap transition-all duration-300 overflow-hidden"
                  style={{
                    opacity: expanded ? 1 : 0,
                    maxWidth: expanded ? "200px" : "0px",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t px-2 py-4 overflow-hidden" style={{ borderColor: "hsl(240 4% 16%)" }}>
          <div className="rounded-lg p-3" style={{ backgroundColor: "hsl(240 4% 16%)" }}>
            <p
              className="text-xs whitespace-nowrap transition-all duration-300"
              style={{
                color: "hsl(240 4% 48%)",
                opacity: expanded ? 1 : 0,
              }}
            >
              <span className="font-mono" style={{ color: "hsl(263 70% 76%)", fontSize: "10px" }}>v0.1.0</span>
              {" · "}Sentio AI Platform
            </p>
            {/* Collapsed state — just a dot */}
            {!expanded && (
              <div className="h-2 w-2 rounded-full mx-auto" style={{ backgroundColor: "hsl(263 70% 76%)" }} />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;