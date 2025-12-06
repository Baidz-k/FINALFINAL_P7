"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message ?? "Registration failed");
        setLoading(false);
        return;
      }

      setTimeout(() => router.push("/login"), 400);

    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="content-wrapper flex flex-col items-center justify-center py-20 fade-in">

      <Link href="/">
        <div className="mb-12 opacity-0 animate-[fadeIn_1.4s_ease_forwards] cursor-pointer">
          <Image
            src="/logo.png"
            alt="DeathPost Logo"
            width={190}
            height={190}
            priority
            className="animate-[float_4s_ease-in-out_infinite]"
          />
        </div>
      </Link>

      <div className="inner-box w-full max-w-md text-center px-10 py-14 opacity-0 animate-[fadeIn_1.8s_ease_forwards] hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] transition-shadow duration-500">

        <h1 className="death-title text-4xl mb-8 tracking-wide">
          Register
        </h1>

        <p className="text-white/80 text-sm mb-10 leading-relaxed">
          Your name will be inscribed into the Ledger.
          <br />
          Proceed only if you accept the consequences.
        </p>

        <form onSubmit={handleRegister} className="space-y-6">

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black border border-white text-white placeholder-white/40 focus:border-red-600 focus:ring-2 focus:ring-red-600/40"
            required
          />

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

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          <Button
            className="w-full bg-white text-black hover:bg-red-700 hover:text-white transition-all font-semibold py-2 rounded-none border border-white opacity-0 animate-[fadeIn_2.2s_ease_forwards]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <button
          onClick={() => router.push("/login")}
          className="mt-8 text-sm text-white/70 hover:text-red-500 transition-colors opacity-0 animate-[fadeIn_2.4s_ease_forwards]"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}