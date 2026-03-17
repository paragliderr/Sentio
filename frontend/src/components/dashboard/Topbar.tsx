"use client";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white border-b border-gray-800">
      <input
        placeholder="Search..."
        className="bg-gray-900 px-4 py-2 rounded w-80"
      />

      <div className="flex gap-4">
        <button>🔔</button>
        <button>✨</button>
      </div>
    </div>
  );
}