import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  className?: string;
}

export function StatsCard({ icon: Icon, label, value, trend, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6 transition-colors hover:border-[#1e2a5e]/80",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-[#d4a418]/10 p-2.5">
          <Icon className="h-5 w-5 text-[#d4a418]" />
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.direction === "up" ? "text-emerald-400" : "text-red-400"
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="mt-1 text-sm text-slate-400">{label}</p>
      </div>
    </div>
  );
}
