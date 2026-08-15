"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import {
  AdminHead,
  Panel,
  Th,
  ConfirmDialog,
  Empty,
} from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import {
  Eye,
  Search,
  X,
  CalendarCheck,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import {
  adminBookings,
  adminCenters,
  type AdminBooking,
} from "@/data/adminMock";

export const BookingsManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<AdminBooking[]>(adminBookings);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [center, setCenter] = useState("all");
  const [view, setView] = useState<AdminBooking | null>(null);
  const [pending, setPending] = useState<AdminBooking | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (b) =>
          (status === "all" || b.status === status) &&
          (center === "all" || b.center === center) &&
          (!q ||
            b.player.toLowerCase().includes(q.toLowerCase()) ||
            b.id.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, status, center, q],
  );

  const cancel = () => {
    if (!pending) return;
    setList((prev) =>
      prev.map((b) =>
        b.id === pending.id ? { ...b, status: "Cancelled" } : b,
      ),
    );
    toast({
      title: t("admin.bookings.confirmToast", { id: pending.id }),
      description: t("common.demoNote"),
    });
    setPending(null);
  };

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.bookings.title")}
        description={t("admin.bookings.description")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={CalendarCheck}
          label={t("admin.bookings.total")}
          value={list.length}
          hint={t("admin.bookings.inThisView")}
        />
        <StatCard
          Icon={CheckCircle2}
          label={t("admin.bookings.confirmed")}
          value={list.filter((b) => b.status === "Confirmed").length}
        />
        <StatCard
          Icon={Clock}
          label={t("admin.bookings.pending")}
          value={list.filter((b) => b.status === "Pending").length}
        />
        <StatCard
          Icon={XCircle}
          label={t("admin.bookings.cancelled")}
          value={list.filter((b) => b.status === "Cancelled").length}
        />
      </div>

      <Panel>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={`${t("common.search")}…`}
              aria-label={t("admin.bookings.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("admin.bookings.statusFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyStatus")}</SelectItem>
              {["Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={center} onValueChange={setCenter}>
            <SelectTrigger aria-label={t("admin.bookings.centerFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyCenter")}</SelectItem>
              {adminCenters.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Panel>

      <Panel title={t("admin.bookings.all")}>
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("admin.bookings.tableCaption")}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <Th>{t("admin.bookings.colBooking")}</Th>
                  <Th>{t("admin.bookings.colPlayer")}</Th>
                  <Th>{t("admin.bookings.colCenter")}</Th>
                  <Th>{t("admin.bookings.colSchedule")}</Th>
                  <Th>{t("admin.bookings.colTotal")}</Th>
                  <Th>{t("admin.bookings.colStatus")}</Th>
                  <Th className="text-end">{t("common.actions")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/30">
                    <td className="py-3 pe-3 font-mono text-xs">{b.id}</td>
                    <td className="py-3 pe-3 font-medium">{b.player}</td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {b.center}
                      <span className="block text-xs">{b.resource}</span>
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground whitespace-nowrap">
                      {b.date} · {b.time}
                    </td>
                    <td className="py-3 pe-3 font-mono text-primary">
                      ${b.total}
                    </td>
                    <td className="py-3 pe-3">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="py-3 text-end whitespace-nowrap">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t("admin.bookings.view", { id: b.id })}
                        onClick={() => setView(b)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {b.status !== "Cancelled" && b.status !== "Completed" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.bookings.cancel", { id: b.id })}
                          onClick={() => setPending(b)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{view?.id}</DialogTitle>
          </DialogHeader>
          {view && (
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              {(
                [
                  [t("admin.bookings.fieldPlayer"), view.player],
                  [t("admin.bookings.fieldCenter"), view.center],
                  [t("admin.bookings.fieldCity"), view.city],
                  [t("admin.bookings.fieldResource"), view.resource],
                  [t("admin.bookings.fieldDate"), view.date],
                  [t("admin.bookings.fieldTime"), view.time],
                  [t("admin.bookings.fieldTotal"), `$${view.total}`],
                  [t("admin.bookings.fieldStatus"), view.status],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-surface-elevated p-4">
                  <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={t("admin.bookings.confirmCancel", { id: pending?.id ?? "" })}
        onConfirm={cancel}
      />
    </div>
  );
};
