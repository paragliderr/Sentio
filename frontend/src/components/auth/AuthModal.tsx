"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useGSAP(() => {
    if (!overlayRef.current || !formRef.current) return;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
  }, { scope: overlayRef });

  async function handleSignIn() {
    setError("");
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      gsap.to(overlayRef.current, {
        opacity: 0, duration: 0.4, ease: "power2.in",
        onComplete: () => {
          onClose();
          router.push("/dashboard/explore");
        }
      });
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleSignUp() {
    setError("");
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { sender_name: "Cortex", subject: "Begin your journey now" }
        }
      });
      if (error) throw error;
      setError("✅ Check your email to confirm your account.");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: "rgba(5,5,5,0.75)" }}>
      <div className="w-full max-w-md rounded-xl p-6" style={{ backgroundColor: "#050505", color: "#F5F5DC", border: "1px solid rgba(245,245,220,0.2)" }}>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm" style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}>Begin Your Journey</div>
          <button onClick={onClose} className="text-xs opacity-70 hover:opacity-100">✕</button>
        </div>

        <div ref={formRef} className="space-y-4">
          {error && (
            <p className="text-xs px-3 py-2 rounded border" style={{
              borderColor: error.startsWith("✅") ? "rgba(100,200,100,0.4)" : "rgba(255,100,100,0.4)",
              color: error.startsWith("✅") ? "#90ee90" : "#ff9999"
            }}>
              {error}
            </p>
          )}

          <div className="space-y-2">
            <label className="text-[10px]" style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none border-b"
              style={{ borderColor: "rgba(245,245,220,0.4)", color: "#F5F5DC" }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px]" style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}>Password</label>
            <div className="flex items-center gap-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none border-b"
                style={{ borderColor: "rgba(245,245,220,0.4)", color: "#F5F5DC" }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs opacity-70 hover:opacity-100">👁</button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleSignIn}
              className="rounded-full px-5 py-2 text-[10px]"
              style={{ backgroundColor: "rgba(245,245,220,0.1)", border: "1px solid rgba(245,245,220,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              className="rounded-full px-5 py-2 text-[10px]"
              style={{ backgroundColor: "transparent", border: "1px solid rgba(245,245,220,0.3)", letterSpacing: "0.3em", textTransform: "uppercase" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}