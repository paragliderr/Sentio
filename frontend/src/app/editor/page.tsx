"use client";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function EditorPage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950 text-white">
      <Topbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex items-center justify-center">
          <p className="text-neutral-500">Canvas Area</p>
        </div>
      </div>
    </div>
  );
}
