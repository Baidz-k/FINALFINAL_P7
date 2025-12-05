"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  const [showLogoPopup, setShowLogoPopup] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  function confirmLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
    }
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex bg-black text-white font-[var(--death-font)] relative overflow-hidden">

      {/* GLOBAL AURA */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)] opacity-40 animate-pulse" />

      {/* PAGE SPINE SHADOW */}
      <div className="pointer-events-none absolute left-72 top-0 w-10 h-full bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Sidebar */}
      <aside
        className="
          w-72 border-r border-white/10 px-6 py-10 flex flex-col
          bg-gradient-to-b from-black via-black to-red-950/40
          backdrop-blur-sm
          shadow-[inset_-20px_0_60px_rgba(255,0,0,0.35)]
          relative overflow-hidden
        "
      >

        {/* Ink bleed top */}
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-red-900/50 to-transparent pointer-events-none animate-[drip_6s_infinite]" />

        {/* Floating glyphs */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-[url('/textures/glyphs.png')] bg-cover animate-slow-pan" />

        {/* Notebook tabs */}
        <div className="absolute right-0 top-24 flex flex-col gap-3 pr-1">
          <div className="w-4 h-6 bg-red-900/60 border border-red-700 shadow-md rotate-3" />
          <div className="w-4 h-6 bg-red-900/60 border border-red-700 shadow-md -rotate-2" />
          <div className="w-4 h-6 bg-red-900/60 border border-red-700 shadow-md rotate-1" />
        </div>

        {/* Logo (opens popup) */}
        <button
          onClick={() => setShowLogoPopup(true)}
          className="flex flex-col items-center gap-2 group relative z-10"
        >
          <Image
            src="/logo.png"
            alt="DebtNote Logo"
            width={90}
            height={90}
            className="
              animate-[float_4s_ease-in-out_infinite]
              group-hover:scale-110
              transition-transform
              drop-shadow-[0_0_15px_rgba(255,0,0,0.45)]
            "
          />
          <p
            className="
              text-xs tracking-[0.35em] text-white/60
              group-hover:text-red-500 transition
              font-[var(--death-font)]
            "
          >
            DEBT NOTE
          </p>
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 text-sm tracking-wide mt-14 relative z-10">
          <span className="cursor-default text-white/80 hover:text-red-400 transition relative group">
            Rituals (CRUD)
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
          </span>

          <span className="cursor-default text-white/60 hover:text-red-400 transition relative group">
            Debt Ledger
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
          </span>

          <span className="cursor-default text-white/50 hover:text-red-400 transition relative group">
            Ledger History
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-red-600 group-hover:w-full transition-all duration-300" />
          </span>
        </nav>

        {/* Identity preview */}
        <div className="mt-10 text-[11px] text-white/60 leading-relaxed relative z-10">
          <p className="uppercase tracking-widest text-white/40 mb-1">
            Keeper
          </p>
          <p className="text-sm">
            {username ? (
              <span className="text-white">{username}</span>
            ) : (
              <span className="text-white/40 italic">Unknown entity</span>
            )}
          </p>
        </div>

        {/* Shinigami Note */}
        <div
          className="
            mt-20 text-[11px] text-white/40 leading-relaxed italic
            border-t border-white/10 pt-4 relative z-10
          "
        >
          Debts written here may be<br />
          rewritten, erased, or sealed.
        </div>

        {/* Logout (moved up) */}
        <div className="mt-6 relative z-10" />

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="
            text-sm text-white/70 hover:text-red-500 transition-colors
            border-t border-white/10 pt-3 text-left
            font-[var(--death-font)]
          "
        >
          Ritual Logout
        </button>

        {/* Ink bleed bottom */}
        <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-red-900/50 to-transparent pointer-events-none animate-[drip_7s_infinite]" />
      </aside>

      {/* Main Page */}
      <main
        className="
          flex-1 p-12 overflow-y-auto
          bg-[radial-gradient(circle_at_top,_rgba(139,0,0,0.35),_transparent_60%),_black]
          relative
        "
      >
        {/* Burned page edges */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/textures/burnt-edge.png')] opacity-25 mix-blend-screen animate-slow-fade" />

        {/* Subtle parchment texture */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/textures/paper.png')] opacity-10 mix-blend-overlay" />

        {children}
      </main>

      {/* POPUP: Logo Image */}
      {showLogoPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="relative p-4 border border-white/20 bg-black shadow-[0_0_40px_rgba(255,0,0,0.5)]">
            <Image
              src="/stnp.jpg"
              alt="Popup Image"
              width={500}
              height={500}
              className="shadow-xl"
            />
            <button
              onClick={() => setShowLogoPopup(false)}
              className="absolute top-2 right-2 text-white/70 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* POPUP: Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-black border border-white/20 px-8 py-6 shadow-[0_0_40px_rgba(255,0,0,0.5)] text-center space-y-4">
            <p className="text-white/80 text-sm">
              Are you certain you wish to end this ritual?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border border-white text-white hover:bg-red-900 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-700 text-white border border-red-500 hover:bg-red-600 transition"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}