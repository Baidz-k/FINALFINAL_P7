const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_BASE = "https://miow.onrender.com"; 

export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}