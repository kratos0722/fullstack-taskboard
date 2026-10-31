import { Status } from "@/lib/types";

const styles: Record<Status, string> = {
  todo: "bg-slate-200 text-slate-700",
  in_progress: "bg-amber-200 text-amber-800",
  done: "bg-emerald-200 text-emerald-800",
};

const label: Record<Status, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {label[status]}
    </span>
  );
}
