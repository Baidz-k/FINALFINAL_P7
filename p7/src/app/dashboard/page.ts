"use client";

import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardPage() {
  const token = getToken();
  let username = "Guest";

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.username) {
        username = decoded.username;
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Welcome, {username}!
      </h2>

      {token && (
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Your bearer token:
          </p>

          <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded mt-2 break-all text-sm">
            {token}
          </pre>
        </div>
      )}
    </div>
  );
}