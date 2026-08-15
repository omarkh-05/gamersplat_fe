"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Check,
  X,
  Ban,
  BadgePercent,
  CheckCircle2,
  Clock,
  Archive,
} from "lucide-react";
import { adminOffers, type AdminOffer } from "@/data/adminMock";

export const OffersManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<AdminOffer[]>(adminOffers);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [pending, setPending] = useState<{
    item: AdminOffer;
    next: AdminOffer["status"];
  } | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (o) =>
          (status === "all" || o.status === status) &&
          (!q ||
            o.name.toLowerCase().includes(q.toLowerCase()) ||
            o.center.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, status, q],
  );

  const apply = () => {
    if (!pending) return;
    setList((prev) =>
      prev.map((o) =>
        o.id === pending.item.id ? { ...o, status: pending.next } : o,
      ),
    );
    toast({
      title: t("admin.offers.confirmToast", {
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
        title={t("admin.offers.title")}
        description={t("admin.offers.description")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={BadgePercent}
          label={t("admin.offers.total")}
          value={list.length}
        />
        <StatCard
          Icon={CheckCircle2}
          label={t("admin.offers.active")}
          value={list.filter((o) => o.status === "Active").length}
        />
        <StatCard
          Icon={Clock}
          label={t("admin.offers.pending")}
          value={list.filter((o) => o.status === "Pending").length}
        />
        <StatCard
          Icon={Archive}
          label={t("admin.offers.expired")}
          value={list.filter((o) => o.status === "Expired").length}
        />
      </div>

      <Panel>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={`${t("common.search")}…`}
              aria-label={t("admin.offers.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("admin.offers.statusFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyStatus")}</SelectItem>
              {["Pending", "Active", "Disabled", "Rejected", "Expired"].map(
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

      <Panel title={t("admin.offers.all")}>
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("admin.offers.tableCaption")}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <Th>{t("admin.offers.colOffer")}</Th>
                  <Th>{t("admin.offers.colCenter")}</Th>
                  <Th>{t("admin.offers.colDiscount")}</Th>
                  <Th>{t("admin.offers.colPeriod")}</Th>
                  <Th>{t("admin.offers.colStatus")}</Th>
                  <Th className="text-end">{t("common.actions")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/30">
                    <td className="py-3 pe-3 font-medium">{o.name}</td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {o.center}
                    </td>
                    <td className="py-3 pe-3 font-mono text-primary">
                      {o.discount}
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground whitespace-nowrap text-xs">
                      {o.start} → {o.end}
                    </td>
                    <td className="py-3 pe-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="py-3 text-end whitespace-nowrap">
                      {o.status === "Pending" && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("admin.offers.approve", {
                              name: o.name,
                            })}
                            onClick={() =>
                              setPending({ item: o, next: "Active" })
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("admin.offers.reject", {
                              name: o.name,
                            })}
                            onClick={() =>
                              setPending({ item: o, next: "Rejected" })
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {o.status === "Active" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.offers.disable", {
                            name: o.name,
                          })}
                          onClick={() =>
                            setPending({ item: o, next: "Disabled" })
                          }
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                      {o.status === "Disabled" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.offers.activate", {
                            name: o.name,
                          })}
                          onClick={() =>
                            setPending({ item: o, next: "Active" })
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

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={t("admin.offers.confirmSetStatus", {
          name: pending?.item.name ?? "",
          status: pending?.next ?? "",
        })}
        onConfirm={apply}
      />
    </div>
  );
};
