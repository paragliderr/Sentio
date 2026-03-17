"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSlideshow } from "@/components/hero/HeroSlideshow";
import { scrollytellingData } from "@/constants/content";
import { ScrollytellingSection } from "@/components/ScrollytellingSection";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-[#f0f0f0]">
      {/* HERO SECTION */}
      <div className="relative">
        <HeroSlideshow />
        {/* Get Started button REMOVED — Begin the Journey handles this */}
      </div>

      {/* SCROLL CONTENT */}
      <div className="relative">
        {scrollytellingData.map((item, index) => (
          <ScrollytellingSection key={item.id} item={item} index={index} />
        ))}
      </div>
    </main>
  );
}