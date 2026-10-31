"use client";

import { useState } from "react";
import { Priority, TaskCreate } from "@/lib/types";

export default function TaskForm({
  onCreate,
}: {
  onCreate: (task: TaskCreate) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      await onCreate({ title: title.trim(), priority });
      setTitle("");
      setPriority("medium");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task…"
        className="flex-1 rounded-md border border-slate-300 px-3 py-2"
        aria-label="Task title"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="rounded-md border border-slate-300 px-3 py-2"
        aria-label="Priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
