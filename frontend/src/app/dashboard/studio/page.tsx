"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Layers, Settings, MousePointerClick, SlidersHorizontal } from "lucide-react";

export default function StudioPage() {
  const router = useRouter();
  useEffect(() => {
    getSupabaseClient().auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/auth");
    });
  }, [router]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">Build and train your AI models</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4" style={{ color: "hsl(263 70% 76%)" }} />
              <h2 className="text-sm font-medium">Model Builder</h2>
            </div>
            <div className="flex-1 rounded-lg border border-dashed border-border flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="mx-auto h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <MousePointerClick className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Drag and drop model blocks here</p>
                <p className="text-xs text-muted-foreground/60">or click to browse components</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="h-4 w-4" style={{ color: "hsl(263 70% 76%)" }} />
              <h2 className="text-sm font-medium">Controls</h2>
            </div>
            <div className="space-y-6">
              {[
                { label: "Learning Rate", value: "0.001", type: "lr", width: "40%" },
                { label: "Epochs",        value: "100",   type: "epochs", width: "60%" },
                { label: "Batch Size",    value: "32",    type: "batch", width: "45%" },
                { label: "Optimizer",     value: "Adam",  type: "opt", width: "55%" },
              ].map((control) => (
                <div key={control.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-muted-foreground">{control.label}</label>
                    <span className="font-mono text-xs" style={{ color: "hsl(263 70% 76%)" }}>{control.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary">
                    <div className="h-full rounded-full" style={{ width: control.width, backgroundColor: "hsl(263 70% 76%)" }} />
                  </div>
                </div>
              ))}
              <div className="pt-4 space-y-3" style={{ borderTop: "1px solid hsl(240 4% 16%)" }}>
                <button className="w-full h-10 rounded-lg text-sm font-medium hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(263 70% 76%)", color: "hsl(240 6% 4%)" }}>
                  Train Model
                </button>
                <button className="w-full h-10 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary" style={{ border: "1px solid hsl(240 4% 16%)" }}>
                  <Settings className="inline h-3.5 w-3.5 mr-1.5" /> Advanced Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}