"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { Heart } from "lucide-react";

const items = [
  { image: "/assets/explore-1.jpg", title: "Neural Network Viz", author: "ada_ml", likes: 342 },
  { image: "/assets/explore-2.jpg", title: "Synthetic Faces", author: "deepvision", likes: 891 },
  { image: "/assets/explore-3.jpg", title: "Particle Flow", author: "genart_lab", likes: 256 },
  { image: "/assets/explore-4.jpg", title: "Data Landscape", author: "tensor_art", likes: 1204 },
  { image: "/assets/explore-5.jpg", title: "Crystal Structure", author: "quantum_viz", likes: 478 },
  { image: "/assets/explore-6.jpg", title: "Bio Worlds", author: "eco_ai", likes: 667 },
];

export default function ExplorePage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">Explore</h1>
          <p className="text-sm text-muted-foreground mt-1">Discover community creations</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {items.map((item) => (
            <div key={item.title} className="break-inside-avoid rounded-xl overflow-hidden border border-border bg-card group cursor-pointer">
              <div className="relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-white/70">@{item.author}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <Heart className="h-3.5 w-3.5" />{item.likes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}