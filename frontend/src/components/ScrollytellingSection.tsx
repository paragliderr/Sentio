"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ScrollytellingItem } from "@/constants/content";
import ContactFooter from "./ContactFooter";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  item: ScrollytellingItem;
  index: number;
};

const THEME_LABELS = [
  "Deep Space Exploration",      // 01: Mars Rover
  "Orbital Infrastructure",      // 02: Satellite Systems
  "Atmospheric Dynamics",        // 03: Outer Atmosphere/Jets
  "Aerodynamic Research",        // 04: High Space Aero
  "Commercial Aviation",         // 05: Plane Systems
  "Urban Architecture",          // 06: Skylines
  "Autonomous Mobility",         // 07: Self-driving Roads
  "Silicon Intelligence",        // 08: Chips/Microcontrollers
  "Personal Augmentation"        // 09: Palm of Hand/AI
];


export function ScrollytellingSection({ item, index }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const themeLabel = THEME_LABELS[index] || "From Orbit to Hand";
  const isRightAligned = index % 2 !== 0;
  const isCenter = useMemo(() => [0, 3, 4, 7, 8].includes(index), [index]);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

      const label = contentRef.current.querySelector("[data-animate='label']");
      const desc = contentRef.current.querySelector("[data-animate='desc']");
      const btn = contentRef.current.querySelector("[data-animate='btn']");

      const slideEases = [
        "expo.inOut",
        "power4.out",
        "power3.out",
        "expo.out",
        "power4.out",
        "expo.inOut",
        "power4.out",
        "power2.out",
        "expo.out",
      ] as const;
      const easeFor = (i: number) => slideEases[i % slideEases.length];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(imageRef.current, { scale: 1.3 }, { scale: 1.1, ease: easeFor(index) }, 0);

      if (index === 0) {
        const h = contentRef.current.querySelector("[data-hero='heading']");
        if (h) {
          gsap.set(h, { scale: 1.12 });
          tl.to(h, { scale: 0.94, duration: 1, ease: easeFor(index) }, 0.1);
        }
      }

      if (index === 1) {
        const specs = contentRef.current.querySelectorAll("[data-tech='spec']");
        const lines = contentRef.current.querySelectorAll("[data-tech='line']");
        gsap.set(specs, { x: 60, opacity: 0 });
        gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
        tl.to(lines, { scaleX: 1, duration: 0.8, ease: easeFor(index), stagger: 0.08 }, 0.15);
        tl.to(specs, { x: 0, opacity: 1, duration: 0.9, ease: easeFor(index), stagger: 0.08 }, 0.2);
      }

      if (index === 2) {
        const cards = contentRef.current.querySelectorAll("[data-bento='card']");
        gsap.set(cards, { y: 40, opacity: 0 });
        tl.to(cards, { y: 0, opacity: 1, duration: 0.9, ease: easeFor(index), stagger: 0.12 }, 0.2);
      }

      if (index === 3) {
        const mask = contentRef.current.querySelector("[data-mask='heading']");
        if (mask) {
          gsap.set(mask, { y: 24, opacity: 0 });
          tl.to(mask, { y: 0, opacity: 1, duration: 0.9, ease: easeFor(index) }, 0.2);
        }
      }

      if (index === 4) {
        const nums = contentRef.current.querySelectorAll("[data-stats='num']");
        nums.forEach((el) => {
          const target = parseFloat((el as HTMLElement).dataset.target || "0");
          const decimal = (el as HTMLElement).dataset.decimal === "true";
          const obj = { value: 0 };
          tl.to(obj, {
            value: target,
            duration: 1.4,
            ease: easeFor(index),
            onUpdate: () => {
              const v = decimal ? obj.value.toFixed(2) : Math.round(obj.value).toString();
              (el as HTMLElement).textContent = v;
            },
          }, 0.2);
        });
      }

      if (index === 5) {
        const progress = contentRef.current.querySelector("[data-process='progress']");
        if (progress) {
          gsap.set(progress, { scaleY: 0, transformOrigin: "top" });
          tl.to(progress, { scaleY: 1, duration: 1.2, ease: easeFor(index) }, 0.15);
        }
      }

      if (index === 6) {
        const spots = contentRef.current.querySelectorAll("[data-float='spot']");
        gsap.set(spots, { y: 20, opacity: 0 });
        tl.to(spots, { y: 0, opacity: 1, duration: 1, ease: easeFor(index), stagger: 0.1 }, 0.2);
      }

      if (index === 7) {
        const vis = contentRef.current.querySelector("[data-vision='text']");
        if (vis) {
          gsap.set(vis, { letterSpacing: "0.1em", opacity: 0 });
          tl.to(vis, { letterSpacing: "0.25em", opacity: 1, duration: 1.2, ease: easeFor(index) }, 0.15);
        }
      }

      if (index === 8) {
        const cta = contentRef.current.querySelector("[data-cta='button']");
        const corners = contentRef.current.querySelectorAll("[data-cta='corner']");
        gsap.set(corners, { opacity: 0 });
        tl.to(corners, { opacity: 1, duration: 0.8, ease: easeFor(index), stagger: 0.1 }, 0.2);
        if (cta) {
          gsap.set(cta, { scale: 0.95 });
          tl.to(cta, { scale: 1.08, duration: 1.1, ease: easeFor(index) }, 0.25);
        }
      }

      if (label) tl.fromTo(label, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: easeFor(index) }, 0.05);
      if (desc) tl.fromTo(desc, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: easeFor(index) }, 0.12);
      if (btn) tl.fromTo(btn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: easeFor(index) }, 0.2);
    },
    { scope: sectionRef, dependencies: [index] }
  );

  return (
    <section
      ref={sectionRef}
      className="panel relative h-screen w-full"
      aria-label={item.title}
    >
      <div ref={imageRef} className="absolute inset-0 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={index === 0}
          className="object-cover object-center"
        />
        <div className={`absolute inset-0`} style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.6), rgba(5,5,5,0.2), rgba(5,5,5,0.7))" }} />
      </div>

      <div className={`relative z-10 flex h-full w-full items-center px-6 py-10 md:px-24 ${
        isCenter ? "justify-center text-center" : isRightAligned ? "justify-end text-right" : "justify-start text-left"
      }`}>
        <div ref={contentRef} className="relative w-full max-w-6xl" style={{ color: "#F5F5DC" }}>
          <p data-animate="label" className="mb-4 text-[10px] font-light uppercase" style={{ letterSpacing: "0.4em", color: "#F5F5DC" }}>
            {String(index + 1).padStart(2, "0")} • {themeLabel}
          </p>

          {index === 0 && (
            <div className="mx-auto max-w-4xl">
              <h1 data-hero="heading" className="font-light leading-[0.95] text-white text-5xl sm:text-7xl md:text-8xl">
                {item.title}
              </h1>
              <p data-animate="desc" className="mx-auto mt-6 max-w-2xl text-sm md:text-base font-body text-neutral-300">
                {item.description}
              </p>
              <button data-animate="btn" className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-[10px] uppercase text-white" style={{ letterSpacing: "0.3em" }}>
                Explore
                <span className="text-xs">↗</span>
              </button>
            </div>
          )}

          {index === 1 && (
            <div className="ml-auto max-w-xl">
              <h2 className="mb-6 font-light text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05]">{item.title}</h2>
              <div className="space-y-3">
                {["Altitude", "Bandwidth", "Field of View", "Latency", "Thermals"].map((labelText, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div data-tech="line" className="h-px w-16 origin-left bg-white/40" />
                    <span data-tech="spec" className="text-[10px] font-light uppercase text-neutral-300" style={{ letterSpacing: "0.4em" }}>
                      {labelText}
                    </span>
                  </div>
                ))}
              </div>
              <p data-animate="desc" className="mt-6 text-sm md:text-base font-body text-neutral-300">
                {item.description}
              </p>
            </div>
          )}

          {index === 2 && (
            <div className="max-w-none">
              <h2 className="mb-6 font-light text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05]">{item.title}</h2>
              <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} data-bento="card" className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-md">
                    <p className="text-[10px] font-light uppercase text-neutral-400" style={{ letterSpacing: "0.4em" }}>
                      Module {i + 1}
                    </p>
                    <p className="mt-3 text-sm font-body text-neutral-200">
                      {item.description.slice(0, 90)}…
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {index === 3 && (
            <div className="mx-auto max-w-4xl">
              <h2
                data-mask="heading"
                className="font-light text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-transparent bg-clip-text"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {item.title}
              </h2>
              <p data-animate="desc" className="mx-auto mt-6 max-w-2xl text-sm md:text-base font-body text-neutral-300">
                {item.description}
              </p>
            </div>
          )}

          {index === 4 && (
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-light text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05]">{item.title}</h2>
              <div className="flex items-center justify-center gap-10">
                <div className="text-center">
                  <div data-stats="num" data-target="12000" className="text-6xl md:text-7xl font-light">0</div>
                  <div className="mt-2 text-[10px] uppercase text-neutral-400" style={{ letterSpacing: "0.4em" }}>Images/hr</div>
                </div>
                <div className="text-center">
                  <div data-stats="num" data-target="2.40" data-decimal="true" className="text-6xl md:text-7xl font-light">0</div>
                  <div className="mt-2 text-[10px] uppercase text-neutral-400" style={{ letterSpacing: "0.4em" }}>Latency ms</div>
                </div>
                <div className="text-center">
                  <div data-stats="num" data-target="99.97" data-decimal="true" className="text-6xl md:text-7xl font-light">0</div>
                  <div className="mt-2 text-[10px] uppercase text-neutral-400" style={{ letterSpacing: "0.4em" }}>Accuracy</div>
                </div>
              </div>
              <p data-animate="desc" className="mx-auto mt-8 max-w-2xl text-sm md:text-base font-body text-neutral-300">
                {item.description}
              </p>
            </div>
          )}

          {index === 5 && (
            <div className="flex max-w-5xl">
              <div className="relative mr-8 w-1">
                <div className="h-full w-px bg-white/20" />
                <div data-process="progress" className="absolute left-0 top-0 h-full w-px origin-top bg-white" />
              </div>
              <div className="flex-1">
                <h2 className="mb-6 font-light text-white text-3xl sm:text-4xl md:text-5xl leading-[1.05]">{item.title}</h2>
                <ul className="space-y-4">
                  {["Frame ingest", "Pre-process", "Model pass", "Policy compare", "Render"].map((step, i) => (
                    <li key={i} className="text-sm md:text-base font-body text-neutral-200">
                      {String(i + 1).padStart(2, "0")} — {step}
                    </li>
                  ))}
                </ul>
                <p data-animate="desc" className="mt-6 text-sm md:text-base font-body text-neutral-300">
                  {item.description}
                </p>
              </div>
            </div>
          )}

          {index === 6 && (
            <div className="relative h-[70vh] w-full">
              <div data-float="spot" className="absolute left-[12%] top-[18%]">
                <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase text-white" style={{ letterSpacing: "0.4em" }}>Sensor</div>
              </div>
              <div data-float="spot" className="absolute left-[64%] top-[36%]">
                <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase text-white" style={{ letterSpacing: "0.4em" }}>Path</div>
              </div>
              <div data-float="spot" className="absolute left-[32%] top-[66%]">
                <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase text-white" style={{ letterSpacing: "0.4em" }}>Control</div>
              </div>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="12" y1="18" x2="30" y2="22" stroke="white" strokeWidth="0.4" opacity="0.5" />
                <line x1="64" y1="36" x2="60" y2="28" stroke="white" strokeWidth="0.4" opacity="0.5" />
                <line x1="32" y1="66" x2="42" y2="70" stroke="white" strokeWidth="0.4" opacity="0.5" />
              </svg>
              <p data-animate="desc" className="absolute bottom-0 left-0 max-w-md text-sm md:text-base font-body text-neutral-200">
                {item.description}
              </p>
            </div>
          )}

          {index === 7 && (
            <div className="mx-auto max-w-5xl">
              <h2
                data-vision="text"
                className="mx-auto font-light text-white mix-blend-difference text-4xl sm:text-6xl md:text-7xl leading-[0.95]"
              >
                Models that see like you do
              </h2>
              <p data-animate="desc" className="mx-auto mt-6 max-w-2xl text-sm md:text-base font-body text-neutral-300">
                {item.description}
              </p>
            </div>
          )}

          {index === 8 && (
            <div className="relative h-full">
              <div data-cta="corner" className="absolute left-6 top-6 text-[10px] uppercase text-neutral-300" style={{ letterSpacing: "0.4em" }}>Docs</div>
              <div data-cta="corner" className="absolute right-6 top-6 text-[10px] uppercase text-neutral-300" style={{ letterSpacing: "0.4em" }}>Contact</div>
              <div data-cta="corner" className="absolute left-6 bottom-6 text-[10px] uppercase text-neutral-300" style={{ letterSpacing: "0.4em" }}>Roadmap</div>
              <div data-cta="corner" className="absolute right-6 bottom-6 text-[10px] uppercase text-neutral-300" style={{ letterSpacing: "0.4em" }}>Pricing</div>
              <button
                data-cta="button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-[10px] uppercase text-white"
                style={{ letterSpacing: "0.4em" }}
              >
                Explore
              </button>
            </div>
          )}

          {index === 9 && (
            <div className="mx-auto max-w-6xl">
              <ContactFooter />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
