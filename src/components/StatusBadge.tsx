"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/useI18n";

const tones: Record<string, string> = {
  Open: "bg-success/15 text-success ring-success/30",
  Active: "bg-success/15 text-success ring-success/30",
  Confirmed: "bg-success/15 text-success ring-success/30",
  Available: "bg-success/15 text-success ring-success/30",
  Accepted: "bg-success/15 text-success ring-success/30",
  Published: "bg-success/15 text-success ring-success/30",
  Live: "bg-success/15 text-success ring-success/30",
  Upcoming: "bg-primary/15 text-primary ring-primary/30",
  Earned: "bg-primary/15 text-primary ring-primary/30",
  Reserved: "bg-primary/15 text-primary ring-primary/30",
  Scheduled: "bg-primary/15 text-primary ring-primary/30",
  "Almost Full": "bg-warning/15 text-warning ring-warning/30",
  Busy: "bg-warning/15 text-warning ring-warning/30",
  Pending: "bg-warning/15 text-warning ring-warning/30",
  Maintenance: "bg-warning/15 text-warning ring-warning/30",
  "On leave": "bg-warning/15 text-warning ring-warning/30",
  Closed: "bg-destructive/15 text-destructive ring-destructive/30",
  Cancelled: "bg-destructive/15 text-destructive ring-destructive/30",
  Suspended: "bg-destructive/15 text-destructive ring-destructive/30",
  Rejected: "bg-destructive/15 text-destructive ring-destructive/30",
  Disabled: "bg-destructive/15 text-destructive ring-destructive/30",
  Expired: "bg-destructive/15 text-destructive ring-destructive/30",
  Redeemed: "bg-secondary/15 text-secondary ring-secondary/30",
  Finished: "bg-secondary/15 text-secondary ring-secondary/30",
};

const statusKeys: Record<string, string> = {
  Open: "status.open",
  Active: "status.active",
  Confirmed: "status.confirmed",
  Available: "status.available",
  Accepted: "status.approved",
  Published: "status.published",
  Live: "status.ongoing",
  Upcoming: "status.upcoming",
  Earned: "status.approved",
  Reserved: "status.reserved",
  Scheduled: "status.scheduled",
  "Almost Full": "card.status.almostFull",
  Busy: "status.busy",
  Pending: "status.pending",
  Maintenance: "status.maintenance",
  "On leave": "status.onleave",
  Closed: "status.closed",
  Cancelled: "status.cancelled",
  Suspended: "status.blocked",
  Rejected: "status.rejected",
  Disabled: "status.inactive",
  Expired: "status.expired",
  Redeemed: "status.completed",
  Finished: "status.finished",
};

export const StatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  const { t } = useI18n();
  const key = statusKeys[status];
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ring-1 whitespace-nowrap",
        tones[status] ?? "bg-muted text-muted-foreground ring-border",
        className,
      )}
    >
      {key ? t(key, undefined, status) : status}
    </span>
  );
};
