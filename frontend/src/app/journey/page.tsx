"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { scrollytellingData } from "@/constants/content";
import { ScrollytellingSection } from "@/components/ScrollytellingSection";

export default function JourneyPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <header className="fixed top-0 z-40 flex w-full items-center justify-between px-6 py-4 md:px-12">
        <div className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-300">
          Sentio
        </div>
        <div className="hidden text-[11px] uppercase tracking-[0.25em] text-neutral-400 md:block">
          From Space to Hand
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 top-16 z-30 flex justify-center">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <div className="relative">
        {scrollytellingData.map((item, index) => (
          <ScrollytellingSection key={item.id} item={item} index={index} />
        ))}
      </div>
    </main>
  );
}

