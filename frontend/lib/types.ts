export type Status = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  created_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  priority?: Priority;
}
