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
  Check,
  X,
  Ban,
  Building2,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";
import { adminCenters, type AdminCenter } from "@/data/adminMock";

export const CentersManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<AdminCenter[]>(adminCenters);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [city, setCity] = useState("all");
  const [view, setView] = useState<AdminCenter | null>(null);
  const [pending, setPending] = useState<{
    center: AdminCenter;
    next: AdminCenter["status"];
  } | null>(null);

  const cities = useMemo(
    () => Array.from(new Set(list.map((c) => c.city))),
    [list],
  );

  const filtered = useMemo(
    () =>
      list.filter(
        (c) =>
          (status === "all" || c.status === status) &&
          (city === "all" || c.city === city) &&
          (!q ||
            c.name.toLowerCase().includes(q.toLowerCase()) ||
            c.owner.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, status, city, q],
  );

  const apply = () => {
    if (!pending) return;
    setList((prev) =>
      prev.map((c) =>
        c.id === pending.center.id ? { ...c, status: pending.next } : c,
      ),
    );
    toast({
      title: t("admin.centers.confirmToast", {
        name: pending.center.name,
        status: pending.next,
      }),
      description: t("common.demoNote"),
    });
    setPending(null);
    setView(null);
  };

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.centers.title")}
        description={t("admin.centers.description")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Building2}
          label={t("admin.centers.total")}
          value={list.length}
        />
        <StatCard
          Icon={CheckCircle2}
          label={t("admin.centers.active")}
          value={list.filter((c) => c.status === "Active").length}
        />
        <StatCard
          Icon={Clock}
          label={t("admin.centers.pending")}
          value={list.filter((c) => c.status === "Pending").length}
        />
        <StatCard
          Icon={Star}
          label={t("admin.centers.avgRating")}
          value={(
            list.filter((c) => c.rating > 0).reduce((s, c) => s + c.rating, 0) /
            Math.max(1, list.filter((c) => c.rating > 0).length)
          ).toFixed(1)}
        />
      </div>

      <Panel>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={`${t("common.search")}…`}
              aria-label={t("admin.centers.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("admin.centers.statusFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyStatus")}</SelectItem>
              {["Active", "Pending", "Suspended", "Rejected"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger aria-label={t("admin.centers.locationFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyLocation")}</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Panel>

      <Panel title={t("admin.centers.all")}>
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("admin.centers.tableCaption")}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <Th>{t("admin.centers.colCenter")}</Th>
                  <Th>{t("admin.centers.colOwner")}</Th>
                  <Th>{t("admin.centers.colLocation")}</Th>
                  <Th>{t("admin.centers.colRating")}</Th>
                  <Th>{t("admin.centers.colStatus")}</Th>
                  <Th className="text-end">{t("common.actions")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30">
                    <td className="py-3 pe-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("admin.centers.devicesServices", {
                          count: c.devices,
                          services: c.services.join(", "),
                        })}
                      </p>
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {c.owner}
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {c.city}, {c.country}
                    </td>
                    <td className="py-3 pe-3 font-mono text-xs">
                      {c.rating > 0 ? `${c.rating} (${c.reviews})` : "—"}
                    </td>
                    <td className="py-3 pe-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="py-3 text-end whitespace-nowrap">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t("admin.centers.view", { name: c.name })}
                        onClick={() => setView(c)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {c.status === "Pending" && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("admin.centers.approve", {
                              name: c.name,
                            })}
                            onClick={() =>
                              setPending({ center: c, next: "Active" })
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("admin.centers.reject", {
                              name: c.name,
                            })}
                            onClick={() =>
                              setPending({ center: c, next: "Rejected" })
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {c.status === "Active" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.centers.block", {
                            name: c.name,
                          })}
                          onClick={() =>
                            setPending({ center: c, next: "Suspended" })
                          }
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                      {(c.status === "Suspended" ||
                        c.status === "Rejected") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.centers.activate", {
                            name: c.name,
                          })}
                          onClick={() =>
                            setPending({ center: c, next: "Active" })
                          }
                        >
                          <Check className="h-4 w-4" />
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">{view?.name}</DialogTitle>
          </DialogHeader>
          {view && (
            <div className="space-y-4">
              <img
                src={view.image}
                alt=""
                className="rounded-xl aspect-video object-cover w-full bg-surface-elevated"
              />
              <dl className="grid gap-3 sm:grid-cols-2 text-sm">
                {(
                  [
                    [t("admin.centers.fieldOwner"), view.owner],
                    [t("admin.centers.fieldOwnerEmail"), view.ownerEmail],
                    [
                      t("admin.centers.fieldLocation"),
                      `${view.city}, ${view.country}`,
                    ],
                    [t("admin.centers.fieldRegistered"), view.registered],
                    [t("admin.centers.fieldDevices"), String(view.devices)],
                    [
                      t("admin.centers.fieldServices"),
                      view.services.join(", "),
                    ],
                    [
                      t("admin.centers.fieldBookings"),
                      view.bookings.toLocaleString(),
                    ],
                    [
                      t("admin.centers.fieldRevenue"),
                      `$${view.revenue.toLocaleString()}`,
                    ],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-surface-elevated p-4">
                    <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1.5 font-medium break-words">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => setPending({ center: view, next: "Active" })}
                >
                  <Check className="h-4 w-4" /> {t("common.approve")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPending({ center: view, next: "Rejected" })}
                >
                  <X className="h-4 w-4" /> {t("common.reject")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    setPending({ center: view, next: "Suspended" })
                  }
                >
                  <Ban className="h-4 w-4" /> {t("common.block")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={t("admin.centers.confirmSetStatus", {
          name: pending?.center.name ?? "",
          status: pending?.next ?? "",
        })}
        onConfirm={apply}
      />
    </div>
  );
};
