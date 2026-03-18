"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Database, Upload, MoreHorizontal } from "lucide-react";

const datasets = [
  { name: "ImageNet Subset", size: "2.4 GB", records: "50,000", type: "Images" },
  { name: "Text Corpus v2", size: "890 MB", records: "1.2M", type: "Text" },
  { name: "Audio Samples", size: "4.1 GB", records: "25,000", type: "Audio" },
  { name: "Tabular Finance", size: "120 MB", records: "500K", type: "Tabular" },
];

export default function DatasetsPage() {
  const router = useRouter();

  // 🔒 Auth guard — redirects to /auth if not logged in
  useEffect(() => {
    const supabase = getSupabaseClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/auth");
    });
  }, [router]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Datasets</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your training data</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:opacity-90">
            <Upload className="h-4 w-4" />
            Upload Dataset
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Records</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Size</th>
                <th className="w-10 px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((ds) => (
                <tr key={ds.name} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Database className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{ds.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-muted-foreground">{ds.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-muted-foreground">{ds.records}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-muted-foreground">{ds.size}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="rounded-md p-1 transition-colors hover:bg-secondary">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}