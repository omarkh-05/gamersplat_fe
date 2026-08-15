"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ownerOffers, type Offer } from "@/data/ownerMock";

const statuses: Offer["status"][] = ["Draft", "Scheduled", "Active", "Expired"];

export const Offers = ({
  centerId,
  centerName,
}: {
  centerId?: string;
  centerName?: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(ownerOffers);
  const empty: Offer = {
    id: "",
    centerId: centerId ?? "oc1",
    title: "",
    description: "",
    benefit: "",
    start: "",
    end: "",
    audience: "All players",
    status: "Draft",
    used: 0,
  };
  const scoped = centerId ? list.filter((o) => o.centerId === centerId) : list;
  const [draft, setDraft] = useState<Offer | null>(null);
  const [removing, setRemoving] = useState<Offer | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setList((l) =>
      draft.id
        ? l.map((o) => (o.id === draft.id ? draft : o))
        : [
            ...l,
            {
              ...draft,
              id: `of${Date.now()}`,
              centerId: draft.centerId || centerId || "oc1",
            },
          ],
    );
    toast({
      title: draft.id
        ? t("owner.offers.toastUpdatedTitle")
        : t("owner.offers.toastCreatedTitle"),
      description: draft.title,
    });
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.offers.title")}
        description={
          centerName
            ? t("owner.offers.descriptionCenter", { center: centerName })
            : t("owner.offers.description")
        }
        action={
          <Button variant="hero" onClick={() => setDraft({ ...empty })}>
            <Plus className="h-4 w-4" /> {t("owner.offers.create")}
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {scoped.map((o) => (
          <div
            key={o.id}
            className="bg-gradient-surface border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary">
                  {o.benefit}
                </span>
                <h3 className="font-display text-lg font-semibold mt-1">
                  {o.title}
                </h3>
              </div>
              <StatusBadge status={o.status} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {o.description}
            </p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("owner.offers.period")}
                </dt>
                <dd className="font-mono text-xs">
                  {o.start} → {o.end}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("owner.offers.audience")}
                </dt>
                <dd>{o.audience}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("owner.offers.timesUsed")}
                </dt>
                <dd className="font-mono text-primary">{o.used}</dd>
              </div>
            </dl>
            <div className="mt-5 pt-5 flex gap-2 mt-auto">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => setDraft(o)}
              >
                <Pencil className="h-3.5 w-3.5" /> {t("common.edit")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRemoving(o)}
                aria-label={t("owner.offers.deleteName", { name: o.title })}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Panel title={t("owner.offers.usageTitle")}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.offers.tableCaption")}
            </caption>
            <thead>
              <tr>
                <Th>{t("owner.offers.offer")}</Th>
                <Th>{t("owner.offers.benefit")}</Th>
                <Th>{t("owner.offers.status")}</Th>
                <Th>{t("owner.offers.audience")}</Th>
                <Th className="text-end">{t("owner.offers.redemptions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scoped.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{o.title}</td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {o.benefit}
                  </td>
                  <td className="py-3 pe-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {o.audience}
                  </td>
                  <td className="py-3 text-end font-mono text-primary">
                    {o.used}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {draft?.id
                ? t("owner.offers.editTitle")
                : t("owner.offers.createTitle")}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form onSubmit={save} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="o-title">{t("owner.offers.titleLabel")}</Label>
                <Input
                  id="o-title"
                  required
                  maxLength={60}
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="o-desc">
                  {t("owner.offers.descriptionLabel")}
                </Label>
                <Textarea
                  id="o-desc"
                  rows={3}
                  maxLength={240}
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="o-benefit">
                    {t("owner.offers.benefitLabel")}
                  </Label>
                  <Input
                    id="o-benefit"
                    maxLength={30}
                    placeholder="30% OFF"
                    value={draft.benefit}
                    onChange={(e) =>
                      setDraft({ ...draft, benefit: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="o-audience">
                    {t("owner.offers.audienceLabel")}
                  </Label>
                  <Input
                    id="o-audience"
                    maxLength={40}
                    value={draft.audience}
                    onChange={(e) =>
                      setDraft({ ...draft, audience: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="o-start">{t("owner.offers.startDate")}</Label>
                  <Input
                    id="o-start"
                    type="date"
                    value={draft.start}
                    onChange={(e) =>
                      setDraft({ ...draft, start: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="o-end">{t("owner.offers.endDate")}</Label>
                  <Input
                    id="o-end"
                    type="date"
                    value={draft.end}
                    onChange={(e) =>
                      setDraft({ ...draft, end: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>{t("owner.offers.status")}</Label>
                <Select
                  value={draft.status}
                  onValueChange={(v) =>
                    setDraft({ ...draft, status: v as Offer["status"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDraft(null)}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit" variant="hero">
                  {t("owner.offers.saveOffer")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={t("owner.confirmDelete", { name: removing?.title ?? "" })}
        onConfirm={() => {
          setList((l) => l.filter((o) => o.id !== removing?.id));
          setRemoving(null);
          toast({ title: t("owner.offers.toastDeleted") });
        }}
      />
    </div>
  );
};
