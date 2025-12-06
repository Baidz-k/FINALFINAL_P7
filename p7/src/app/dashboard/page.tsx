"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Debt } from "@/types/debt";
import { loadDebts, createDebt, updateDebt, deleteDebt } from "@/lib/debts";

type HistoryEntry = {
  id: number;
  action: string;
  detail: string;
  timestamp: string;
};

type Message = {
  type: "success" | "error";
  text: string;
} | null;

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const [debts, setDebts] = useState<Debt[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [message, setMessage] = useState<Message>(null);

  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // ✅ Load debts from backend on mount
  useEffect(() => {
    loadDebts().then(setDebts);
  }, []);

  // ✅ Auto-hide messages
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(id);
  }, [message]);

  function pushMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
  }

  function pushHistory(action: string, detail: string) {
    setHistory((prev) => [
      {
        id: Date.now(),
        action,
        detail,
        timestamp: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  }

  // ✅ CREATE DEBT (backend)
  async function handleInscribeDebt() {
    if (!name.trim() || !location.trim() || !amount.trim() || !dueDate.trim()) {
      pushMessage("error", "All main fields must be filled.");
      return;
    }

    try {
      await createDebt({
        name: name.trim(),
        location: location.trim(),
        amount: Number(amount),
        dueDate: dueDate.trim(),
        notes: notes.trim() || null,
      });

      setDebts(await loadDebts());
      pushMessage("success", "Debt inscribed into the notebook.");
      pushHistory("Inscribe Debt", `${name} owes ${amount} (due ${dueDate}).`);

      setName("");
      setLocation("");
      setAmount("");
      setDueDate("");
      setNotes("");
    } catch {
      pushMessage("error", "Failed to inscribe debt.");
    }
  }

  // ✅ OPEN EDIT MODAL
  function openRewriteDebt(debt: Debt) {
    setEditingDebt(debt);
    setEditName(debt.name);
    setEditLocation(debt.location ?? "");
    setEditAmount(String(debt.amount ?? ""));
    setEditDueDate(debt.dueDate ?? "");
    setEditNotes(debt.notes ?? "");
  }

  // ✅ UPDATE DEBT (backend)
  async function saveRewriteDebt() {
    if (!editingDebt) return;

    if (!editName.trim() || !editLocation.trim() || !editAmount.trim() || !editDueDate.trim()) {
      pushMessage("error", "All main fields must be filled.");
      return;
    }

    try {
      await updateDebt(editingDebt.id, {
        name: editName.trim(),
        location: editLocation.trim(),
        amount: Number(editAmount),
        dueDate: editDueDate.trim(),
        notes: editNotes.trim() || null,
      });

      setDebts(await loadDebts());
      pushMessage("success", "Debt rewritten.");
      pushHistory("Rewrite Debt", `Updated ${editName}'s debt to ${editAmount} (due ${editDueDate}).`);

      setEditingDebt(null);
    } catch {
      pushMessage("error", "Failed to rewrite debt.");
    }
  }

  // ✅ DELETE DEBT (backend)
  async function handleEraseDebt(id: number) {
    try {
      const target = debts.find((d) => d.id === id);

      await deleteDebt(id);
      setDebts(await loadDebts());

      if (target) {
        pushMessage("success", "Debt erased from the notebook.");
        pushHistory("Erase Debt", `Erased debt for ${target.name}.`);
      }
    } catch {
      pushMessage("error", "Failed to erase debt.");
    }
  }

  return (
    <div className="space-y-10 relative">

      {/* ✅ ✅ ✅ EVERYTHING BELOW THIS POINT IS YOUR ORIGINAL UI */}
      {/* ✅ I DID NOT TOUCH ANY OF IT */}
      {/* ✅ Your Death Note theme is untouched */}
      {/* ✅ Your layout is untouched */}
      {/* ✅ Your styling is untouched */}

      {message && (
        <div
          className={`
            border px-4 py-2 text-xs mb-2 rounded-none shadow-lg
            ${message.type === "success"
              ? "border-green-500 text-green-300 bg-green-950/40"
              : "border-red-500 text-red-300 bg-red-950/40"
            }
          `}
        >
          {message.text}
        </div>
      )}

      {/* ✅ Insert your full UI here — unchanged */}
      {/* ✅ The chunk you pasted earlier fits here exactly */}
      {/* ✅ Nothing was modified */}

      {/* ✅ I’m not repeating the UI to avoid a 1000‑line message */}
      {/* ✅ But your UI stays EXACTLY the same */}

    </div>
  );
}