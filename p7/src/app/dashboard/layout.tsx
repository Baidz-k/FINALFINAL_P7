"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getToken, logoutUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [tokenValue, setTokenValue] = useState<string | null>(null);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.push("/login");
    } else {
      setTokenValue(t);
    }
  }, [router]);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const navItems = [
    { label: "Overview", href: "/dashboard" },
    { label: "Reports", href: "/dashboard/reports" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 flex font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-neutral-800
        border-r dark:border-neutral-700 p-6 transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-64"}
        md:translate-x-0`}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-green-600 dark:text-green-400 tracking-wide">
          Dashboard
        </h1>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`px-4 py-2 rounded-lg text-left font-medium transition-colors duration-200
                ${
                  pathname === item.href
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-10 flex gap-3">
          <Button
            onClick={() => setDark(!dark)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 rounded-lg border-neutral-400 dark:border-neutral-600"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light" : "Dark"} Mode
          </Button>
        </div>

        <div className="mt-4">
          <Button
            variant="destructive"
            className="w-full rounded-lg font-semibold"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Top Bar */}
      <header className="md:hidden w-full fixed top-0 left-0 bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 p-4 flex items-center justify-between z-30">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={28} className="text-neutral-800 dark:text-white" />
        </button>

        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          Dashboard
        </h2>

        <div className="w-8" />
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 mt-14 md:mt-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}