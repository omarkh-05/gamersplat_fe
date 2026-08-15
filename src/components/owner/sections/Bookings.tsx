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
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { Check, Eye, Search, X } from "lucide-react";
import {
  ownerBookingRows,
  ownerCenters,
  type OwnerBookingRow,
} from "@/data/ownerMock";
import { resourceImageFor } from "@/data/ownerMock";

const statuses: OwnerBookingRow["status"][] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export const Bookings = ({
  centerId,
  centerName,
}: {
  centerId?: string;
  centerName?: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(ownerBookingRows);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [center, setCenter] = useState("all");
  const [date, setDate] = useState("");
  const [view, setView] = useState<OwnerBookingRow | null>(null);
  const [pending, setPending] = useState<{
    row: OwnerBookingRow;
    next: OwnerBookingRow["status"];
  } | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (b) =>
          (!centerId || b.centerId === centerId) &&
          (status === "all" || b.status === status) &&
          (!!centerId || center === "all" || b.center === center) &&
          (!date || b.date === date) &&
          (!q ||
            b.player.toLowerCase().includes(q.toLowerCase()) ||
            b.device.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, status, center, date, q, centerId],
  );

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.bookings.title")}
        description={
          centerName
            ? t("owner.bookings.descriptionCenter", { center: centerName })
            : t("owner.bookings.description")
        }
      />

      <Panel>
        <div
          className={
            centerId ? "grid gap-3 md:grid-cols-3" : "grid gap-3 md:grid-cols-4"
          }
        >
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={t("owner.bookings.searchPlaceholder")}
              aria-label={t("owner.bookings.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("owner.bookings.filterByStatus")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("owner.bookings.anyStatus")}
              </SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!centerId && (
            <Select value={center} onValueChange={setCenter}>
              <SelectTrigger aria-label={t("owner.bookings.filterByCenter")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("owner.bookings.allCenters")}
                </SelectItem>
                {ownerCenters.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Input
            type="date"
            aria-label={t("owner.bookings.filterByDate")}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </Panel>

      <Panel title={t("owner.bookings.listTitle", { count: filtered.length })}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.bookings.tableCaption")}
            </caption>
            <thead>
              <tr>
                <Th>{t("owner.bookings.player")}</Th>
                <Th>{t("owner.bookings.device")}</Th>
                <Th>{t("owner.bookings.center")}</Th>
                <Th>{t("owner.bookings.date")}</Th>
                <Th>{t("owner.bookings.time")}</Th>
                <Th>{t("owner.bookings.total")}</Th>
                <Th>{t("owner.bookings.status")}</Th>
                <Th className="text-end">{t("common.actions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{b.player}</td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {b.device}
                  </td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {b.center}
                  </td>
                  <td className="py-3 pe-3 font-mono text-xs">{b.date}</td>
                  <td className="py-3 pe-3 text-muted-foreground whitespace-nowrap">
                    {b.time}
                  </td>
                  <td className="py-3 pe-3 font-mono text-primary">
                    ${b.total}
                  </td>
                  <td className="py-3 pe-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setView(b)}
                    >
                      <Eye className="h-3.5 w-3.5" /> {t("common.view")}
                    </Button>
                    {b.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="hero"
                          onClick={() =>
                            setPending({ row: b, next: "Confirmed" })
                          }
                        >
                          <Check className="h-3.5 w-3.5" />{" "}
                          {t("owner.bookings.accept")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setPending({ row: b, next: "Cancelled" })
                          }
                        >
                          <X className="h-3.5 w-3.5" />{" "}
                          {t("owner.bookings.reject")}
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-muted-foreground"
                  >
                    {t("owner.bookings.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("owner.bookings.detailsTitle")}
            </DialogTitle>
          </DialogHeader>
          {view && (
            <dl className="space-y-3 text-sm max-h-[70vh] overflow-y-auto pe-1">
              <img
                src={resourceImageFor(view.device, "PC")}
                alt={view.device}
                loading="lazy"
                className="w-full aspect-video rounded-xl object-cover border border-border"
              />
              {[
                [t("owner.bookings.player"), view.player],
                [t("owner.bookings.device"), view.device],
                [t("owner.bookings.center"), view.center],
                [t("owner.bookings.date"), view.date],
                [t("owner.bookings.time"), view.time],
                [
                  t("owner.bookings.duration"),
                  t("owner.bookings.durationHours", { count: view.hours }),
                ],
                [t("owner.bookings.total"), `$${view.total}`],
                [t("owner.bookings.notes"), view.notes],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-6 border-b border-border pb-2"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-end font-medium">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between items-center gap-6">
                <dt className="text-muted-foreground">
                  {t("owner.bookings.status")}
                </dt>
                <dd>
                  <StatusBadge status={view.status} />
                </dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={
          pending?.next === "Confirmed"
            ? t("owner.bookings.acceptTitle")
            : t("owner.bookings.rejectTitle")
        }
        description={`${pending?.row.player} · ${pending?.row.device}`}
        onConfirm={() => {
          if (!pending) return;
          setList((l) =>
            l.map((b) =>
              b.id === pending.row.id ? { ...b, status: pending.next } : b,
            ),
          );
          toast({
            title:
              pending.next === "Confirmed"
                ? t("owner.bookings.toastAccepted")
                : t("owner.bookings.toastRejected"),
          });
          setPending(null);
        }}
      />
    </div>
  );
};
