import { API_BASE } from "./api";

export async function loadDebts() {
  const res = await fetch(`${API_BASE}/debts`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createDebt(data: any) {
  const res = await fetch(`${API_BASE}/debts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateDebt(id: number, data: any) {
  const res = await fetch(`${API_BASE}/debts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteDebt(id: number) {
  const res = await fetch(`${API_BASE}/debts/${id}`, {
    method: "DELETE",
  });
  return res.json();
}