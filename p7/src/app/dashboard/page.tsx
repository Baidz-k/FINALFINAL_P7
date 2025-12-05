"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Debt = {
  id: number;
  name: string;
  location: string;
  amount: number;
  dueDate: string;
  notes?: string;
  createdAt: string;
};

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
  // New debt form
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // Ledger
  const [debts, setDebts] = useState<Debt[]>([]);

  // History
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Message bar
  const [message, setMessage] = useState<Message>(null);

  // Rewrite modal
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Auto-clear message
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

  function handleInscribeDebt() {
    if (!name.trim() || !location.trim() || !amount.trim() || !dueDate.trim()) {
      pushMessage("error", "All main fields must be filled.");
      return;
    }

    const newDebt: Debt = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim(),
      amount: Number(amount),
      dueDate: dueDate.trim(),
      notes: notes.trim() || undefined,
      createdAt: new Date().toLocaleDateString(),
    };

    setDebts((prev) => [newDebt, ...prev]);

    pushMessage("success", "Debt inscribed into the notebook.");
    pushHistory("Inscribe Debt", `${newDebt.name} owes ${newDebt.amount} (due ${newDebt.dueDate}).`);

    setName("");
    setLocation("");
    setAmount("");
    setDueDate("");
    setNotes("");
  }

  function openRewriteDebt(debt: Debt) {
    setEditingDebt(debt);
    setEditName(debt.name);
    setEditLocation(debt.location);
    setEditAmount(String(debt.amount));
    setEditDueDate(debt.dueDate);
    setEditNotes(debt.notes || "");
  }

  function saveRewriteDebt() {
    if (!editingDebt) return;

    if (!editName.trim() || !editLocation.trim() || !editAmount.trim() || !editDueDate.trim()) {
      pushMessage("error", "All main fields must be filled.");
      return;
    }

    const updated: Debt = {
      ...editingDebt,
      name: editName.trim(),
      location: editLocation.trim(),
      amount: Number(editAmount),
      dueDate: editDueDate.trim(),
      notes: editNotes.trim() || undefined,
    };

    setDebts((prev) => prev.map((d) => (d.id === editingDebt.id ? updated : d)));

    pushMessage("success", "Debt rewritten.");
    pushHistory("Rewrite Debt", `Updated ${updated.name}'s debt to ${updated.amount} (due ${updated.dueDate}).`);

    setEditingDebt(null);
  }

  function handleEraseDebt(id: number) {
    const target = debts.find((d) => d.id === id);
    setDebts((prev) => prev.filter((d) => d.id !== id));

    if (target) {
      pushMessage("success", "Debt erased from the notebook.");
      pushHistory("Erase Debt", `Erased debt for ${target.name}.`);
    }
  }

  return (
    <div className="space-y-10 relative">

      {/* Message Bar */}
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

      {/* Title */}
      <div className="relative z-10">
        <h1 className="death-title text-4xl tracking-wide mb-2">
          Debt Note
        </h1>
        <p className="text-white/70 text-sm">
          Inscribe, rewrite, and erase debts as if they were names in a cursed notebook.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 2xl:grid-cols-[1.6fr,1.4fr] gap-10 relative z-10">

        {/* LEFT SIDE — Inscribe + History */}
        <div className="space-y-8">

          {/* Inscribe Debt */}
          <section className="inner-box border border-white/10 bg-black/70 px-8 py-7 shadow-[0_0_30px_rgba(255,0,0,0.3)] space-y-5">
            <h2 className="death-title text-2xl tracking-wide mb-2">
              Inscribe Debt
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Who</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name of the debtor"
                  className="bg-black border border-white text-white placeholder:text-white/40 text-sm"
                />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Where</p>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Origin of the debt"
                  className="bg-black border border-white text-white placeholder:text-white/40 text-sm"
                />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">How much</p>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount owed"
                  className="bg-black border border-white text-white placeholder:text-white/40 text-sm"
                />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">Due date</p>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-black border border-white text-white text-sm"
                />
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1 mt-3">Notes</p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional cursed remarks…"
                className="bg-black border border-white text-white placeholder:text-white/40 text-xs h-24"
              />
            </div>

            <Button
              type="button"
              onClick={handleInscribeDebt}
              className="w-full bg-white text-black hover:bg-red-700 hover:text-white transition-all font-semibold py-2 rounded-none border border-white"
            >
              Inscribe Debt
            </Button>
          </section>

          {/* History */}
          <section className="inner-box border border-white/10 bg-black/70 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm tracking-wide">History of Incantations</h3>
              <span className="text-[11px] text-white/40">Current session</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.length === 0 && (
                <p className="text-[11px] text-white/40 italic">
                  The ledger is quiet. No rituals yet.
                </p>
              )}

              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="w-full text-left text-[11px] px-3 py-2 border border-white/10 bg-black/70 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono uppercase text-[10px] text-white/80">
                      {entry.action}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {entry.timestamp}
                    </span>
                  </div>
                  <span className="text-white/80">{entry.detail}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE — Ledger */}
        <section className="inner-box border border-white/10 bg-black/80 px-7 py-6 space-y-4 shadow-[0_0_30px_rgba(255,0,0,0.25)]">
          <h2 className="death-title text-2xl tracking-wide">
            Ledger of Debts
          </h2>
          <p className="text-[11px] text-white/50">
            Names, places, and amounts bound to this notebook.
          </p>

          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            {debts.length === 0 && (
              <p className="text-[11px] text-white/40 italic">
                No debts are inscribed yet.
              </p>
            )}

            {debts.map((debt) => (
              <div
                key={debt.id}
                className="group border border-white/10 bg-black/70 px-4 py-3 flex flex-col gap-2 hover:border-red-600 hover:bg-red-950/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-white">
                      <span className="text-white/40 mr-2">Name:</span>
                      {debt.name}
                    </p>
                    <p className="text-[11px] text-white/70">
                      <span className="text-white/40 mr-2">Where:</span>
                      {debt.location}
                    </p>
                    <p className="text-[11px] text-white/70">
                      <span className="text-white/40 mr-2">How much:</span>
                      {debt.amount}
                    </p>
                    <p className="text-[11px] text-white/70">
                      <span className="text-white/40 mr-2">Due:</span>
                      {debt.dueDate}
                    </p>
                    <p className="text-[11px] text-white/40">
                      Written: {debt.createdAt}
                    </p>
                    {debt.notes && (
                      <p className="text-[11px] text-white/60 italic">
                        “{debt.notes}”
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <Button
                      type="button"
                      onClick={() => openRewriteDebt(debt)}
                      className="bg-black border border-white/40 text-white text-[11px] px-3 py-1 rounded-none hover:bg-red-900 hover:border-red-500"
                    >
                      Rewrite
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleEraseDebt(debt.id)}
                      className="bg-red-900 border border-red-700 text-white text-[11px] px-3 py-1 rounded-none hover:bg-red-700"
                    >
                      Erase
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Rewrite Modal */}
      {editingDebt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="w-full max-w-md inner-box border border-white/20 bg-black px-7 py-6 shadow-[0_0_40px_rgba(255,0,0,0.35)] space-y-5">
            <h3 className="death-title text-2xl tracking-wide">
              Rewrite Debt
            </h3>
            <p className="text-[11px] text-white/60">
              Updating entry written on {editingDebt.createdAt}.
            </p>

            <div className="space-y-3 text-sm">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-black border border-white text-white placeholder:text-white/40 text-sm"
                placeholder="Name"
              />
              <Input
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="bg-black border border-white text-white placeholder:text-white/40 text-sm"
                placeholder="Location"
              />
              <Input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="bg-black border border-white text-white placeholder:text-white/40 text-sm"
                placeholder="Amount"
              />
              <Input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="bg-black border border-white text-white text-sm"
              />
              <Textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="bg-black border border-white text-white placeholder:text-white/40 text-xs h-20"
                placeholder="Notes"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                onClick={() => setEditingDebt(null)}
                className="bg-black border border-white text-white rounded-none hover:bg-red-950 text-xs px-4 py-2"
              >
                Cancel Ritual
              </Button>
              <Button
                type="button"
                onClick={saveRewriteDebt}
                className="bg-white text-black hover:bg-red-700 hover:text-white border border-white rounded-none text-xs px-4 py-2"
              >
                Seal Rewrite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}