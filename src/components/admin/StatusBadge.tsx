import { cn } from "@/lib/utils";

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  // Green
  confirmed: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  published: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  won: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },

  // Yellow
  pending: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  pending_payment: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  quoted: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },

  // Red
  cancelled: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  payment_failed: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  lost: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },

  // Blue
  new: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  contacted: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },

  // Gray
  draft: { bg: "bg-slate-500/10", text: "text-slate-400", dot: "bg-slate-400" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] ?? {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    dot: "bg-slate-400",
  };

  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        style.bg,
        style.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
      {label}
    </span>
  );
}
