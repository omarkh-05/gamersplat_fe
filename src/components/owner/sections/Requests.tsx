"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Check, Eye, X } from "lucide-react";
import { customerRequests, type CustomerRequest } from "@/data/ownerMock";

const types = ["Booking Request", "Cancellation Request", "Inquiry"];

export const Requests = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(customerRequests);
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<CustomerRequest | null>(null);
  const [pending, setPending] = useState<{
    row: CustomerRequest;
    next: "Accepted" | "Rejected";
  } | null>(null);

  const typeLabel = (v: string) =>
    v === "Booking Request"
      ? t("owner.requests.typeBooking")
      : v === "Cancellation Request"
        ? t("owner.requests.typeCancellation")
        : t("owner.requests.typeInquiry");

  const filtered = useMemo(
    () =>
      list.filter(
        (r) =>
          (type === "all" || r.type === type) &&
          (status === "all" || r.status === status),
      ),
    [list, type, status],
  );

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.requests.title")}
        description={t("owner.requests.description")}
      />

      <Panel
        title={t("owner.requests.listTitle", { count: filtered.length })}
        action={
          <div className="flex flex-wrap gap-2">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                className="w-[190px]"
                aria-label={t("owner.requests.filterByType")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("owner.requests.allTypes")}
                </SelectItem>
                {types.map((tp) => (
                  <SelectItem key={tp} value={tp}>
                    {typeLabel(tp)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                className="w-[150px]"
                aria-label={t("owner.requests.filterByStatus")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("owner.requests.anyStatus")}
                </SelectItem>
                <SelectItem value="Pending">
                  {t("owner.requests.pending")}
                </SelectItem>
                <SelectItem value="Accepted">
                  {t("owner.requests.accepted")}
                </SelectItem>
                <SelectItem value="Rejected">
                  {t("owner.requests.rejected")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.requests.tableCaption")}
            </caption>
            <thead>
              <tr>
                <Th>{t("owner.requests.player")}</Th>
                <Th>{t("owner.requests.type")}</Th>
                <Th>{t("owner.requests.subject")}</Th>
                <Th>{t("owner.requests.date")}</Th>
                <Th>{t("owner.requests.status")}</Th>
                <Th className="text-end">{t("common.actions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{r.player}</td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {typeLabel(r.type)}
                  </td>
                  <td className="py-3 pe-3 text-muted-foreground max-w-[260px] truncate">
                    {r.subject}
                  </td>
                  <td className="py-3 pe-3 text-muted-foreground whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="py-3 pe-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setView(r)}
                    >
                      <Eye className="h-3.5 w-3.5" /> {t("common.view")}
                    </Button>
                    {r.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="hero"
                          onClick={() =>
                            setPending({ row: r, next: "Accepted" })
                          }
                        >
                          <Check className="h-3.5 w-3.5" /> {t("common.accept")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setPending({ row: r, next: "Rejected" })
                          }
                        >
                          <X className="h-3.5 w-3.5" /> {t("common.reject")}
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-muted-foreground"
                  >
                    {t("owner.requests.empty")}
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
            <DialogTitle className="font-display">{view?.subject}</DialogTitle>
          </DialogHeader>
          {view && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <StatusBadge status={view.status} />
                <span className="text-muted-foreground">
                  {typeLabel(view.type)} · {view.date}
                </span>
              </div>
              <p className="font-medium">{view.player}</p>
              <p className="text-muted-foreground leading-relaxed">
                {view.message}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={
          pending?.next === "Accepted"
            ? t("owner.requests.acceptTitle")
            : t("owner.requests.rejectTitle")
        }
        description={pending?.row.subject}
        onConfirm={() => {
          if (!pending) return;
          setList((l) =>
            l.map((r) =>
              r.id === pending.row.id ? { ...r, status: pending.next } : r,
            ),
          );
          toast({
            title:
              pending.next === "Accepted"
                ? t("owner.requests.toastAccepted")
                : t("owner.requests.toastRejected"),
          });
          setPending(null);
        }}
      />
    </div>
  );
};
