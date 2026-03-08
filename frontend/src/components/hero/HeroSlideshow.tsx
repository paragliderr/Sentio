"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import AuthModal from "@/components/auth/AuthModal";
import { scrollytellingData } from "@/constants/content";

gsap.registerPlugin(useGSAP);

const SLIDE_DURATION = 5000;
const heroSlides = [
  { id: "hero-1", image: "/images/1.png", title: "Picture the Unknown" },
  { id: "hero-2", image: "/images/2.png", title: "Experience the Planet" },
  { id: "hero-3", image: "/images/3.png", title: "Understand the Atmosphere" },
  { id: "hero-4", image: "/images/4.png", title: "Visualize the Invisible" },
];

const HERO_TEXT_VARIANTS = ["revealUp", "fromLeft", "scaleIn", "blurIn"] as const;

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const id = setInterval(
      () => setActive((prev) => (prev + 1) % heroSlides.length),
      SLIDE_DURATION
    );
    return () => clearInterval(id);
  }, []);

  // GSAP: smooth crossfade between slides + subtle scale
  useGSAP(
    () => {
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const isActive = i === active;
        gsap.to(el, {
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1.02 : 1,
          duration: 1.6,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
    },
    { dependencies: [active] }
  );

  // GSAP: different text animation per hero slide
  useGSAP(
    () => {
      if (!textRef.current) return;

      const variant = HERO_TEXT_VARIANTS[active % HERO_TEXT_VARIANTS.length];
      const chars = textRef.current.querySelectorAll("[data-split-char]");
      const rest = textRef.current.querySelectorAll("[data-animate='content']");

      gsap.set(chars, { clearProps: "all" });
      gsap.set(rest, { clearProps: "all" });

      if (variant === "revealUp") {
        gsap.set(chars, { yPercent: 110, opacity: 0 });
        gsap.set(rest, { y: 24, opacity: 0 });
        gsap.to(chars, { yPercent: 0, opacity: 1, duration: 0.95, ease: "power3.out", stagger: 0.028 });
        gsap.to(rest, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.1, delay: 0.35 });
      } else if (variant === "fromLeft") {
        gsap.set(chars, { x: -60, opacity: 0 });
        gsap.set(rest, { x: -20, opacity: 0 });
        gsap.to(chars, { x: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.03 });
        gsap.to(rest, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.08, delay: 0.3 });
      } else if (variant === "scaleIn") {
        gsap.set(chars, { scale: 0.5, opacity: 0 });
        gsap.set(rest, { scale: 0.92, opacity: 0 });
        gsap.to(chars, { scale: 1, opacity: 1, duration: 0.85, ease: "back.out(1.2)", stagger: 0.025 });
        gsap.to(rest, { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08, delay: 0.4 });
      } else {
        gsap.set(chars, { filter: "blur(12px)", opacity: 0 });
        gsap.set(rest, { filter: "blur(8px)", opacity: 0 });
        gsap.to(chars, { filter: "blur(0px)", opacity: 1, duration: 1, ease: "power2.out", stagger: 0.035 });
        gsap.to(rest, { filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.09, delay: 0.25 });
      }
    },
    { dependencies: [active], scope: textRef }
  );

  const current = heroSlides[active];
  const description = scrollytellingData[active]?.description ?? "";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => { slideRefs.current[index] = el; }}
            className="absolute inset-0"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between px-6 py-5 md:px-10">
          <div className="text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-200">
            Sentio
          </div>
          <div className="hidden text-[11px] uppercase tracking-[0.25em] text-neutral-400 md:block">
            From Space to Hand
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 pb-16 pt-4 md:px-10 md:pb-24">
          <div ref={textRef} className="max-w-3xl text-center md:text-left">
            <p
              data-animate="content"
              className="mb-4 text-[11px] uppercase tracking-[0.3em] text-neutral-300"
            >
              Visual Intelligence for the Physical World
            </p>

            <h1 className="mb-5 text-3xl font-heading tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {current.title.split("").map((char, i) => (
                <span key={i} data-split-char className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <p
              data-animate="content"
              className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-neutral-200 md:mx-0 md:text-base font-body"
            >
              {description}
            </p>

            <button
              data-animate="content"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:border-white hover:bg-white/10"
              onClick={() => setShowAuth(true)}
            >
              Begin the Journey
              <span className="text-xs">↓</span>
            </button>
          </div>
        </div>

        <div className="pointer-events-none flex items-center justify-center pb-6">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
            Scroll to Explore
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />
          </div>
        </div>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </section>
  );
}
