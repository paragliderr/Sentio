"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-6">Sentio</h1>

      <nav className="space-y-3">
        <Link href="/dashboard">Studio</Link>
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/dashboard/explore">Explore</Link>
        <Link href="/dashboard/datasets">Datasets</Link>
        <Link href="/dashboard/learn">Learn</Link>
        <Link href="/dashboard/profile">Profile</Link>
      </nav>
    </div>
  );
}