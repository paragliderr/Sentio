"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { BookOpen, Play, Clock } from "lucide-react";

const courses = [
  { title: "Introduction to Neural Networks", duration: "2h 30m", lessons: 12, level: "Beginner", progress: 75 },
  { title: "Advanced Computer Vision", duration: "4h 15m", lessons: 18, level: "Advanced", progress: 30 },
  { title: "Natural Language Processing", duration: "3h 45m", lessons: 15, level: "Intermediate", progress: 0 },
  { title: "Reinforcement Learning", duration: "5h 00m", lessons: 22, level: "Advanced", progress: 0 },
];

const levelColors: Record<string, string> = {
  Beginner: "color: hsl(160 68% 40%)",
  Intermediate: "color: hsl(263 70% 76%)",
  Advanced: "color: hsl(0 84% 60%)",
};

export default function LearnPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">Learn</h1>
          <p className="text-sm text-muted-foreground mt-1">Expand your AI knowledge</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.title} className="rounded-xl border border-border bg-card p-5 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">{course.lessons} lessons</span>
                    <span className="font-mono text-[10px] font-medium" style={{ color: course.level === "Beginner" ? "hsl(160 68% 40%)" : course.level === "Advanced" ? "hsl(0 84% 60%)" : "hsl(263 70% 76%)" }}>
                      {course.level}
                    </span>
                  </div>
                  {course.progress > 0 && (
                    <div className="mt-3">
                      <span className="text-[10px] text-muted-foreground">{course.progress}% complete</span>
                      <div className="h-1 rounded-full bg-secondary mt-1">
                        <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, backgroundColor: "hsl(263 70% 76%)" }} />
                      </div>
                    </div>
                  )}
                  {course.progress === 0 && (
                    <button className="mt-3 flex items-center gap-1.5 text-xs font-medium" style={{ color: "hsl(263 70% 76%)" }}>
                      <Play className="h-3 w-3" /> Start Course
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}