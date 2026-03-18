"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Plus, MoreHorizontal } from "lucide-react";

const projects = [
  { name: "Image Classifier", model: "ResNet-50", updated: "2 hours ago", status: "Training" },
  { name: "Text Generator", model: "GPT-4 Fine-tune", updated: "1 day ago", status: "Ready" },
  { name: "Voice Synthesis", model: "WaveNet", updated: "3 days ago", status: "Draft" },
  { name: "Object Detection", model: "YOLOv8", updated: "1 week ago", status: "Ready" },
  { name: "Sentiment Analysis", model: "BERT", updated: "2 weeks ago", status: "Training" },
  { name: "Style Transfer", model: "Neural Style", updated: "3 weeks ago", status: "Ready" },
];

const statusStyles: Record<string, { color: string; bg: string }> = {
  Training: { color: "hsl(263 70% 76%)", bg: "hsl(263 70% 76% / 0.2)" },
  Ready:    { color: "hsl(160 68% 40%)", bg: "hsl(160 68% 40% / 0.2)" },
  Draft:    { color: "hsl(240 4% 48%)",  bg: "hsl(240 4% 16%)" },
};

export default function ProjectsPage() {
  const router = useRouter();
  useEffect(() => {
    getSupabaseClient().auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/auth");
    });
  }, [router]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your AI projects</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90" style={{ backgroundColor: "hsl(263 70% 76%)", color: "hsl(240 6% 4%)" }}>
            <Plus className="h-4 w-4" /> Create Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.name} className="rounded-xl border border-border bg-card p-5 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium">{project.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{project.model}</p>
                </div>
                <button className="rounded-md p-1 transition-colors hover:bg-secondary">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{project.updated}</span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium" style={{ color: statusStyles[project.status].color, backgroundColor: statusStyles[project.status].bg }}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}