"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import Image from "next/image";
import AIButton from "./AIButton";
import AIPanel from "./AIPanel";

const DashboardTopbar = () => {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-20 flex h-16 items-center justify-between px-6 border-b"
        style={{
          background: "hsl(240 6% 4% / 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "hsl(240 4% 16%)",
        }}
      >
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "hsl(240 4% 48%)" }}
          />
          <input
            type="text"
            placeholder="Search models, projects, datasets…"
            className="h-9 w-full rounded-lg pl-10 pr-4 text-sm outline-none transition-colors duration-200"
            style={{
              backgroundColor: "hsl(240 4% 10%)",
              border: "1px solid hsl(240 4% 18%)",
              color: "hsl(0 0% 98%)",
            }}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AIButton onClick={() => setAiOpen(!aiOpen)} isOpen={aiOpen} />
          <button
            className="relative rounded-lg p-2 transition-colors duration-200"
            style={{ color: "hsl(240 4% 48%)" }}
          >
            <Bell className="h-[18px] w-[18px]" />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ backgroundColor: "hsl(263 70% 76%)" }}
            />
          </button>
          <div
            className="h-8 w-8 overflow-hidden rounded-full"
            style={{ border: "1px solid hsl(240 4% 16%)" }}
          >
            <Image
              src="/assets/avatar.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      {aiOpen && <AIPanel onClose={() => setAiOpen(false)} />}
    </>
  );
};

export default DashboardTopbar;