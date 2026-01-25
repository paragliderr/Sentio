"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const images = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
];

const texts = ["Picture.", "Experience.", "Understand.", "Visualize."];

export default function SentioLanding() {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // --- NEW: Form State ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- NEW: Backend Connection Logic ---
  const handleSignup = async (emailVal: string, passwordVal: string) => {
    try {
      console.log("Sending data:", { email: emailVal, password: passwordVal });
      
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailVal, password: passwordVal }),
      });

      const data = await res.json();
      console.log("Response from backend:", data);
      
      // Optional: Close modal on success
      if (res.ok) {
        setModalOpen(false);
        // Reset form
        setEmail("");
        setPassword("");
        setFullName("");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  //Wrapper to handle button click
  const handleAuthAction = () => {
    if (authMode === "signup") {
      handleSignup(email, password);
    } else {
      console.log("Sign In logic would go here...");
    }
  };

  // --- SCROLL Animation ---
  const handleScroll = useCallback((event: WheelEvent) => {
    if (modalOpen || isAnimating) return; 

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1200);

    if (event.deltaY > 0) {
      setIndex((prev) => (prev + 1) % images.length);
    } else {
      setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  }, [modalOpen, isAnimating]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  // --- SLIDESHOW ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!modalOpen) {
        setIndex((prev) => (prev + 1) % images.length);
      }
    }, 7000); 
    return () => clearInterval(interval);
  }, [modalOpen]);

  // --- TEXT ANIMATION ---
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.animation = "none";
      void textRef.current.offsetHeight; 
      textRef.current.style.animation = "";
    }
  }, [index]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-serif">
      
      {/* --- BACKGROUND SLIDESHOW --- */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-16">
        <header className="text-center">
          <h1 className="uppercase tracking-[0.4em] text-sm md:text-base font-light">
            Sentio
          </h1>
        </header>

        <div />

        <footer className="flex justify-between items-end w-full">
          <div
            ref={textRef}
            className="text-5xl md:text-7xl font-light tracking-wide animate-fade-up"
          >
            {texts[index]}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="text-sm md:text-base uppercase tracking-widest border-b border-transparent hover:border-white transition-all duration-500 pb-1 cursor-pointer"
          >
            {authMode === "signup" ? "Begin" : "Sign In"}
          </button>
        </footer>
      </div>

      {/* --- MODAL --- */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-white text-black w-full max-w-md p-12 rounded-sm shadow-2xl relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black transition-colors"
            >
              &times;
            </button>

            <div className="text-center mb-10">
              <h2 className="uppercase tracking-[0.25em] text-xl mb-4 font-light">Sentio</h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest space-x-2">
                <span>Picture</span>
                <span>•</span>
                <span>Experience</span>
                <span>•</span>
                <span>Visualize</span>
              </p>
            </div>

            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => setAuthMode("signup")}
                className={`flex-1 pb-3 text-sm uppercase tracking-wider transition-all ${
                  authMode === "signup" 
                    ? "border-b-2 border-black text-black" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setAuthMode("signin")}
                className={`flex-1 pb-3 text-sm uppercase tracking-wider transition-all ${
                  authMode === "signin" 
                    ? "border-b-2 border-black text-black" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Sign In
              </button>
            </div>

            <div className="space-y-6">
              {authMode === "signup" && (
                <div className="group relative">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                  />
                </div>
              )}
              <div className="group relative">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                />
              </div>
              
              <div className="group relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-gray-400 hover:text-black transition-colors focus:outline-none"
                  type="button"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={showPassword ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    {showPassword && <circle cx="12" cy="12" r="4" fill="white" stroke="none" />} 
                  </svg>
                </button>
              </div>

              {/* --- ACTION BUTTON --- */}
              <button 
                onClick={handleAuthAction}
                className="w-full bg-black text-white py-4 mt-8 uppercase tracking-widest text-xs hover:bg-gray-900 transition-colors cursor-pointer duration-300"
              >
                {authMode === "signup" ? "Begin" : "Enter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CSS ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-up {
          animation: fadeUp 1.5s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}