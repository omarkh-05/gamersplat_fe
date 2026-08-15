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
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { Crown, Pencil, Plus, Trash2, Users } from "lucide-react";
import {
  ownerTournaments,
  ownerCenters,
  type OwnerTournament,
} from "@/data/ownerMock";

const statuses: OwnerTournament["status"][] = [
  "Draft",
  "Published",
  "Live",
  "Finished",
];

export const Tournaments = ({
  centerId,
  centerName,
}: {
  centerId?: string;
  centerName?: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(ownerTournaments);
  const empty: OwnerTournament = {
    id: "",
    centerId: centerId ?? ownerCenters[0].id,
    name: "",
    game: "",
    description: "",
    date: "",
    center: centerName ?? ownerCenters[0].name,
    maxPlayers: 16,
    joined: 0,
    prize: "",
    entry: 0,
    status: "Draft",
  };
  const scoped = centerId
    ? list.filter((t2) => t2.centerId === centerId)
    : list;
  const [draft, setDraft] = useState<OwnerTournament | null>(null);
  const [participants, setParticipants] = useState<OwnerTournament | null>(
    null,
  );
  const [removing, setRemoving] = useState<OwnerTournament | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setList((l) =>
      draft.id
        ? l.map((t2) => (t2.id === draft.id ? draft : t2))
        : [...l, { ...draft, id: `ot${Date.now()}` }],
    );
    toast({
      title: draft.id
        ? t("owner.tournaments.toastUpdatedTitle")
        : t("owner.tournaments.toastCreatedTitle"),
      description: draft.name,
    });
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.tournaments.title")}
        description={
          centerName
            ? t("owner.tournaments.descriptionCenter", { center: centerName })
            : t("owner.tournaments.description")
        }
        action={
          <Button variant="hero" onClick={() => setDraft({ ...empty })}>
            <Plus className="h-4 w-4" /> {t("owner.tournaments.create")}
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {scoped.map((tm) => (
          <div
            key={tm.id}
            className="bg-gradient-surface border border-border rounded-2xl p-6 flex flex-col hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary">
                  {tm.game}
                </span>
                <h3 className="font-display text-lg font-semibold mt-1">
                  {tm.name}
                </h3>
              </div>
              <StatusBadge status={tm.status} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {tm.description}
            </p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("owner.tournaments.date")}
                </dt>
                <dd className="font-mono text-xs">{tm.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("owner.tournaments.center")}
                </dt>
                <dd>{tm.center}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {t("owner.tournaments.prizeEntry")}
                </dt>
                <dd className="font-mono text-primary">
                  {tm.prize} · ${tm.entry}
                </dd>
              </div>
              {tm.winner && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground flex items-center gap-1">
                    <Crown className="h-3.5 w-3.5 text-primary" />
                    {t("owner.tournaments.winner")}
                  </dt>
                  <dd>{tm.winner}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4">
              <Progress
                value={(tm.joined / tm.maxPlayers) * 100}
                className="h-1.5"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {t("owner.tournaments.registered", {
                  joined: tm.joined,
                  max: tm.maxPlayers,
                })}
              </p>
            </div>
            <div className="mt-5 flex gap-2 mt-auto pt-5">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => setParticipants(tm)}
              >
                <Users className="h-3.5 w-3.5" />{" "}
                {t("owner.tournaments.players")}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setDraft(tm)}>
                <Pencil className="h-3.5 w-3.5" /> {t("common.edit")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRemoving(tm)}
                aria-label={t("owner.tournaments.deleteName", {
                  name: tm.name,
                })}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!participants}
        onOpenChange={(o) => !o && setParticipants(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("owner.tournaments.participantsTitle", {
                name: participants?.name ?? "",
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("owner.tournaments.tableCaptionParticipants")}
              </caption>
              <thead>
                <tr>
                  <Th>{t("owner.requests.player")}</Th>
                  <Th>{t("owner.tournaments.registeredCol")}</Th>
                  <Th className="text-end">{t("owner.tournaments.payment")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {["Omar Ahmed", "Sara Nabil", "Karim Hassan", "Yousef Magdy"]
                  .slice(0, Math.max(1, Math.min(4, participants?.joined ?? 0)))
                  .map((p, i) => (
                    <tr key={p}>
                      <td className="py-2.5 font-medium">{p}</td>
                      <td className="py-2.5 text-muted-foreground">
                        Aug 0{i + 2}, 2026
                      </td>
                      <td className="py-2.5 text-end">
                        <StatusBadge
                          status={i === 3 ? "Pending" : "Confirmed"}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {draft?.id
                ? t("owner.tournaments.editTitle")
                : t("owner.tournaments.createTitle")}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form
              onSubmit={save}
              className="space-y-4 max-h-[60vh] overflow-y-auto pe-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="t-name">{t("owner.tournaments.name")}</Label>
                  <Input
                    id="t-name"
                    required
                    maxLength={60}
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-game">{t("owner.tournaments.game")}</Label>
                  <Input
                    id="t-game"
                    maxLength={40}
                    value={draft.game}
                    onChange={(e) =>
                      setDraft({ ...draft, game: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="t-desc">
                  {t("owner.tournaments.descriptionLabel")}
                </Label>
                <Textarea
                  id="t-desc"
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
                  <Label htmlFor="t-date">
                    {t("owner.tournaments.dateTime")}
                  </Label>
                  <Input
                    id="t-date"
                    maxLength={30}
                    placeholder="2026-09-12 18:00"
                    value={draft.date}
                    onChange={(e) =>
                      setDraft({ ...draft, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("owner.tournaments.center")}</Label>
                  <Select
                    value={draft.center}
                    onValueChange={(v) => setDraft({ ...draft, center: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ownerCenters.map((c) => (
                        <SelectItem key={c.id} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="t-max">
                    {t("owner.tournaments.maxPlayers")}
                  </Label>
                  <Input
                    id="t-max"
                    type="number"
                    min={2}
                    max={512}
                    value={draft.maxPlayers}
                    onChange={(e) =>
                      setDraft({ ...draft, maxPlayers: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-prize">
                    {t("owner.tournaments.prize")}
                  </Label>
                  <Input
                    id="t-prize"
                    maxLength={20}
                    value={draft.prize}
                    onChange={(e) =>
                      setDraft({ ...draft, prize: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="t-entry">
                    {t("owner.tournaments.entry")}
                  </Label>
                  <Input
                    id="t-entry"
                    type="number"
                    min={0}
                    max={5000}
                    value={draft.entry}
                    onChange={(e) =>
                      setDraft({ ...draft, entry: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("common.status")}</Label>
                  <Select
                    value={draft.status}
                    onValueChange={(v) =>
                      setDraft({
                        ...draft,
                        status: v as OwnerTournament["status"],
                      })
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
                <div className="space-y-1.5">
                  <Label htmlFor="t-winner">
                    {t("owner.tournaments.winnerIfFinished")}
                  </Label>
                  <Input
                    id="t-winner"
                    maxLength={40}
                    value={draft.winner ?? ""}
                    onChange={(e) =>
                      setDraft({ ...draft, winner: e.target.value })
                    }
                  />
                </div>
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
                  {t("common.saveShort")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={t("owner.confirmDelete", { name: removing?.name ?? "" })}
        onConfirm={() => {
          setList((l) => l.filter((t2) => t2.id !== removing?.id));
          setRemoving(null);
          toast({ title: t("owner.tournaments.toastDeleted") });
        }}
      />
    </div>
  );
};
