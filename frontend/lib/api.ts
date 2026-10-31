import { Status, Task, TaskCreate } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function listTasks(status?: Status): Promise<Task[]> {
  const url = new URL(`${BASE}/api/tasks`);
  if (status) url.searchParams.set("status", status);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function createTask(data: TaskCreate): Promise<Task> {
  const res = await fetch(`${BASE}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${BASE}/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE}/api/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
