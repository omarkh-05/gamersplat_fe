"use client";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useI18n } from "@/hooks/useI18n";

export const chartTooltip = {
  contentStyle: {
    background: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 12,
    fontSize: 12,
  },
} as const;

export const Panel = ({
  title,
  action,
  className,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "bg-gradient-surface border border-border rounded-2xl p-4 sm:p-6 min-w-0",
      className,
    )}
  >
    {(title || action) && (
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        {title && (
          <h3 className="font-display text-lg font-semibold">{title}</h3>
        )}
        {action}
      </div>
    )}
    {children}
  </div>
);

export const PageHead = ({
  title,
  description,
  action,
  eyebrow,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  eyebrow?: string;
}) => {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-2">
          {eyebrow ?? t("owner.eyebrow")}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};

export const Th = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th
    scope="col"
    className={cn(
      "py-2 pe-3 text-start text-xs font-mono uppercase tracking-wider text-muted-foreground",
      className,
    )}
  >
    {children}
  </th>
);

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
}) => {
  const { t } = useI18n();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? t("common.demoNote")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t("common.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
