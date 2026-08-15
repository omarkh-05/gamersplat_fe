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
  Trophy,
  Radio,
  Clock,
  Users,
} from "lucide-react";
import { adminTournaments, type AdminTournament } from "@/data/adminMock";

export const TournamentsManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<AdminTournament[]>(adminTournaments);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<AdminTournament | null>(null);
  const [pending, setPending] = useState<{
    item: AdminTournament;
    next: AdminTournament["status"];
  } | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (x) =>
          (status === "all" || x.status === status) &&
          (!q ||
            x.name.toLowerCase().includes(q.toLowerCase()) ||
            x.center.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, status, q],
  );

  const apply = () => {
    if (!pending) return;
    setList((prev) =>
      prev.map((x) =>
        x.id === pending.item.id ? { ...x, status: pending.next } : x,
      ),
    );
    toast({
      title: t("admin.tournaments.confirmToast", {
        name: pending.item.name,
        status: pending.next,
      }),
      description: t("common.demoNote"),
    });
    setPending(null);
  };

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.tournaments.title")}
        description={t("admin.tournaments.description")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Trophy}
          label={t("admin.tournaments.total")}
          value={list.length}
        />
        <StatCard
          Icon={Radio}
          label={t("admin.tournaments.live")}
          value={list.filter((x) => x.status === "Live").length}
        />
        <StatCard
          Icon={Clock}
          label={t("admin.tournaments.pendingReview")}
          value={list.filter((x) => x.status === "Pending").length}
        />
        <StatCard
          Icon={Users}
          label={t("admin.tournaments.participants")}
          value={list.reduce((s, x) => s + x.participants, 0)}
        />
      </div>

      <Panel>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={`${t("common.search")}…`}
              aria-label={t("admin.tournaments.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("admin.tournaments.statusFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyStatus")}</SelectItem>
              {["Pending", "Published", "Live", "Finished", "Rejected"].map(
                (s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      </Panel>

      <Panel title={t("admin.tournaments.all")}>
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("admin.tournaments.tableCaption")}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <Th>{t("admin.tournaments.colTournament")}</Th>
                  <Th>{t("admin.tournaments.colCenter")}</Th>
                  <Th>{t("admin.tournaments.colDate")}</Th>
                  <Th>{t("admin.tournaments.colPlayers")}</Th>
                  <Th>{t("admin.tournaments.colPrize")}</Th>
                  <Th>{t("admin.tournaments.colStatus")}</Th>
                  <Th className="text-end">{t("common.actions")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((x) => (
                  <tr key={x.id} className="hover:bg-muted/30">
                    <td className="py-3 pe-3">
                      <p className="font-medium">{x.name}</p>
                      <p className="text-xs text-muted-foreground">{x.game}</p>
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {x.center}
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground whitespace-nowrap">
                      {x.date}
                    </td>
                    <td className="py-3 pe-3 font-mono text-xs">
                      {x.participants}/{x.maxParticipants}
                    </td>
                    <td className="py-3 pe-3 font-mono text-primary">
                      {x.prize}
                    </td>
                    <td className="py-3 pe-3">
                      <StatusBadge status={x.status} />
                    </td>
                    <td className="py-3 text-end whitespace-nowrap">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t("admin.tournaments.view", {
                          name: x.name,
                        })}
                        onClick={() => setView(x)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {x.status === "Pending" && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("admin.tournaments.approve", {
                              name: x.name,
                            })}
                            onClick={() =>
                              setPending({ item: x, next: "Published" })
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("admin.tournaments.reject", {
                              name: x.name,
                            })}
                            onClick={() =>
                              setPending({ item: x, next: "Rejected" })
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
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
            <DialogTitle className="font-display">{view?.name}</DialogTitle>
          </DialogHeader>
          {view && (
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              {(
                [
                  [t("admin.tournaments.fieldCenter"), view.center],
                  [t("admin.tournaments.fieldGame"), view.game],
                  [t("admin.tournaments.fieldDate"), view.date],
                  [t("admin.tournaments.fieldPrize"), view.prize],
                  [
                    t("admin.tournaments.fieldParticipants"),
                    `${view.participants}/${view.maxParticipants}`,
                  ],
                  [t("admin.tournaments.fieldWinner"), view.winner ?? "—"],
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
        title={t("admin.tournaments.confirmSetStatus", {
          name: pending?.item.name ?? "",
          status: pending?.next ?? "",
        })}
        onConfirm={apply}
      />
    </div>
  );
};
