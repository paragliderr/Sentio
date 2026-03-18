"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Edit, FolderKanban, Cpu, Database } from "lucide-react";

const badges = [
  { label: "AI", color: "hsl(263 70% 76%)", bg: "hsl(263 70% 76% / 0.2)" },
  { label: "ML", color: "hsl(263 70% 76%)", bg: "hsl(263 70% 76% / 0.2)" },
  { label: "Vision", color: "hsl(160 68% 40%)", bg: "hsl(160 68% 40% / 0.2)" },
  { label: "Advanced", color: "hsl(0 0% 98%)", bg: "hsl(240 4% 16%)" },
];

const stats = [
  { label: "Projects", value: "24", icon: FolderKanban },
  { label: "Models", value: "12", icon: Cpu },
  { label: "Datasets", value: "8", icon: Database },
];

export default function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    getSupabaseClient().auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/auth");
    });
  }, [router]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[900px] space-y-8">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-28 w-28 rounded-full overflow-hidden mb-4" style={{ border: "2px solid hsl(263 70% 76% / 0.3)" }}>
              <img src="/assets/avatar.jpg" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <h1 className="text-xl font-semibold">Alex Neural</h1>
            <p className="font-mono text-sm text-muted-foreground mt-0.5">@alex_neural</p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {badges.map((b) => (
                <span key={b.label} className="rounded-full px-3 py-1 text-[11px] font-medium" style={{ color: b.color, backgroundColor: b.bg }}>
                  {b.label}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-5 max-w-md leading-relaxed">
              AI researcher & creative technologist exploring the intersection of machine learning and generative art.
            </p>
            <button className="mt-6 flex items-center gap-2 h-9 px-5 rounded-lg border border-border text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary">
              <Edit className="h-3.5 w-3.5" /> Edit Profile
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 text-center">
              <stat.icon className="h-5 w-5 mx-auto mb-2" style={{ color: "hsl(263 70% 76%)" }} />
              <p className="text-2xl font-semibold font-mono">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}