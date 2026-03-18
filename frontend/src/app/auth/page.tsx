"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      alert("Signup successful! Now login.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.push("/dashboard/explore"); // 🔥 important
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[350px] space-y-4 p-6 bg-[#111] rounded-xl border border-gray-800">

        <h1 className="text-2xl font-bold text-center">Sentio</h1>

        <input
          className="w-full p-3 bg-gray-900 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 bg-gray-900 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 py-2 rounded hover:bg-purple-600"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="w-full border border-gray-700 py-2 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>

      </div>
    </div>
  );
}