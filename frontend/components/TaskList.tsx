import { Status, Task } from "@/lib/types";
import StatusBadge from "./StatusBadge";

const NEXT_LABEL: Record<Status, string> = {
  todo: "Start",
  in_progress: "Finish",
  done: "Reopen",
};

export default function TaskList({
  tasks,
  onAdvance,
  onDelete,
}: {
  tasks: Task[];
  onAdvance: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  if (tasks.length === 0) {
    return <p className="text-slate-500">No tasks yet — add one above.</p>;
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-3 px-4 py-3">
          <span className="flex-1">{task.title}</span>
          <span className="text-xs uppercase text-slate-400">{task.priority}</span>
          <StatusBadge status={task.status} />
          <button
            onClick={() => onAdvance(task)}
            className="text-sm text-slate-600 hover:underline"
          >
            {NEXT_LABEL[task.status]}
          </button>
          <button
            onClick={() => onDelete(task)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
