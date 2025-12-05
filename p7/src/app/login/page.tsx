"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      saveToken(data.accessToken);

      // Cinematic delay
      setTimeout(() => router.push("/dashboard"), 350);

    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="content-wrapper flex flex-col items-center justify-center py-20 fade-in">

      {/* Floating Logo */}
      <Link
        href="/"
        className="mb-12 opacity-0 animate-[fadeIn_1.4s_ease_forwards] hover:scale-105 active:scale-95 transition-transform duration-300"
      >
        <Image
          src="/logo.png"
          alt="DeathPost Logo"
          width={180}
          height={180}
          priority
          className="cursor-pointer animate-[float_4s_ease-in-out_infinite]"
        />
      </Link>

      {/* Ritual Login Box */}
      <div className="inner-box w-full max-w-md text-center px-10 py-14 opacity-0 animate-[fadeIn_1.8s_ease_forwards] hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] transition-shadow duration-500">

        <h1 className="death-title text-4xl mb-8 tracking-wide">Login</h1>

        <p className="text-white/80 text-sm mb-10 leading-relaxed">
          Re-enter the ledger.
          <br></br>
          Only those who remember their credentials may proceed.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Username */}
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black border border-white text-white placeholder-white/40 focus:border-red-600 focus:ring-2 focus:ring-red-600/40"
            required
          />

          {/* Password with Show/Hide */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black border border-white text-white placeholder-white/40 focus:border-red-600 focus:ring-2 focus:ring-red-600/40 pr-14"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-red-500 transition select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            className="w-full bg-white text-black hover:bg-red-700 hover:text-white transition-all font-semibold py-2 rounded-none border border-white opacity-0 animate-[fadeIn_2.2s_ease_forwards]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        {/* Register Link */}
        <button
          onClick={() => router.push("/register")}
          className="mt-8 text-sm text-white/70 hover:text-red-500 transition-colors opacity-0 animate-[fadeIn_2.4s_ease_forwards]"
        >
          Don’t have an account?
          <span className="underline ml-1">Sign up</span>
        </button>
      </div>
    </div>
  );
}