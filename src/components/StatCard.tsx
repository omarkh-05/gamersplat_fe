import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export const StatCard = ({
  Icon,
  label,
  value,
  hint,
  className,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-gradient-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors",
      className
    )}
  >
    <div className="flex items-center justify-between">
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <p className="mt-3 font-display text-2xl font-bold">{value}</p>
    {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
  </div>
);
