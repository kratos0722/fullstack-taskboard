"use client";

import { useCallback, useEffect, useState } from "react";
import { Status, Task, TaskCreate } from "@/lib/types";
import { createTask, deleteTask, listTasks, updateTask } from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const ADVANCE: Record<Status, Status> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setTasks(await listTasks());
      setError(null);
    } catch {
      setError("Could not reach the API. Is the backend running on :8000?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleCreate(data: TaskCreate) {
    await createTask(data);
    await refresh();
  }

  async function handleAdvance(task: Task) {
    await updateTask(task.id, { status: ADVANCE[task.status] });
    await refresh();
  }

  async function handleDelete(task: Task) {
    await deleteTask(task.id);
    await refresh();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold">Taskboard</h1>
      <p className="mb-6 text-sm text-slate-500">
        A small full-stack task manager — Next.js + FastAPI.
      </p>

      <div className="mb-6">
        <TaskForm onCreate={handleCreate} />
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <TaskList tasks={tasks} onAdvance={handleAdvance} onDelete={handleDelete} />
      )}
    </main>
  );
}
