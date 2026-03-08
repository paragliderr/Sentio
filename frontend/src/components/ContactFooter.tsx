import React from "react";

export default function ContactFooter() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="md:col-span-1 flex items-end">
          <div className="text-5xl md:text-7xl font-light" style={{ color: "#F5F5DC" }}>
            Cortex
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-[10px]" style={{ color: "rgba(245,245,220,0.8)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Discover
          </div>
          <div className="space-y-3 text-xs" style={{ color: "rgba(245,245,220,0.7)" }}>
            <div>Platform</div>
            <div>Simulations</div>
            <div>Models</div>
            <div>Docs</div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-[10px]" style={{ color: "rgba(245,245,220,0.8)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Explore
          </div>
          <div className="space-y-3 text-xs" style={{ color: "rgba(245,245,220,0.7)" }}>
            <div>Case Studies</div>
            <div>Research</div>
            <div>Roadmap</div>
            <div>Pricing</div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-[10px]" style={{ color: "rgba(245,245,220,0.8)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
            Connect
          </div>
          <div className="space-y-3 text-xs" style={{ color: "rgba(245,245,220,0.7)" }}>
            <div>Contact</div>
            <div>Twitter</div>
            <div>LinkedIn</div>
            <div>Newsletter</div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-[10px] mb-3" style={{ color: "rgba(245,245,220,0.85)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
          Sign up for updates
        </div>
        <div className="flex items-center">
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-transparent outline-none text-sm"
            style={{ color: "#F5F5DC" }}
          />
        </div>
        <div className="mt-2 h-px w-full" style={{ backgroundColor: "rgba(245,245,220,0.5)" }} />
      </div>
    </div>
  );
}
