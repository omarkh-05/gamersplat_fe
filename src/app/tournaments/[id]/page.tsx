"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tournamentList } from "@/data/mock";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Trophy,
  Users,
  Ticket,
} from "lucide-react";

const TournamentDetails = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { t } = useI18n();
  const tour = tournamentList.find((x) => x.id === id);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  if (!tour) {
    return (
      <section className="container pt-24 md:pt-28 pb-16">
        <SectionHeader eyebrow="404" title={t("tournament.notFound")} />
        <Button asChild variant="outline" className="mt-6">
          <Link href="/tournaments">{t("tournament.backToTournaments")}</Link>
        </Button>
      </section>
    );
  }

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: t("tournament.toast.title"),
      description: t("tournament.toast.description", { name: tour.name }),
    });
  };

  return (
    <section className="container pt-24 md:pt-28 pb-16">
      <Link
        href="/tournaments"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />{" "}
        {t("tournament.allTournaments")}
      </Link>

      <div className="mt-6 bg-gradient-surface border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
              {tour.game}
            </span>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              {tour.name}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
              {tour.description}
            </p>
          </div>
          <StatusBadge status={tour.status} />
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: CalendarDays, k: t("tournament.field.date"), v: tour.date },
            { Icon: MapPin, k: t("tournament.field.location"), v: tour.center },
            { Icon: Trophy, k: t("tournament.field.prizePool"), v: tour.prize },
            {
              Icon: Ticket,
              k: t("tournament.field.entryFee"),
              v: `$${tour.entry}`,
            },
          ].map(({ Icon, k, v }) => (
            <div key={k} className="rounded-xl bg-surface-elevated p-4">
              <Icon className="h-4 w-4 text-primary" />
              <dt className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                {k}
              </dt>
              <dd className="font-display font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />{" "}
              {t("tournament.slotsFilled")}
            </span>
            <span className="font-mono">
              {tour.joined} / {tour.maxPlayers}
            </span>
          </div>
          <Progress
            value={(tour.joined / tour.maxPlayers) * 100}
            className="mt-3 h-2"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            variant="hero"
            size="lg"
            disabled={tour.status === "Closed"}
            onClick={() => setOpen(true)}
          >
            {tour.status === "Closed"
              ? t("tournament.registrationClosed")
              : t("tournament.registerNow")}
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/booking">{t("tournament.bookStation")}</Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="bg-gradient-surface border border-border rounded-2xl p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">
            {t("tournament.rules")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {tour.rules.map((r) => (
              <li key={r} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                  aria-hidden
                />
                {r}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-lg font-semibold">
            {t("tournament.schedule")}
          </h2>
          <ul className="mt-4 divide-y divide-border">
            {tour.schedule.map((s) => (
              <li key={s.time} className="py-3 flex items-center gap-4">
                <span className="font-mono text-sm text-primary w-16">
                  {s.time}
                </span>
                <span className="text-sm">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-surface border border-border rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">
            {t("tournament.registered")}
          </h2>
          <ul className="mt-4 space-y-3">
            {tour.participants.map((p) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">
                  {p.tag}
                </span>
                <span className="text-sm font-medium">{p.name}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("tournament.moreRegistered", {
              count: Math.max(tour.joined - tour.participants.length, 0),
            })}
          </p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("tournament.registerFor", { name: tour.name })}
            </DialogTitle>
            <DialogDescription>
              {t("tournament.entryFeeNote", { entry: tour.entry })}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onRegister} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="tname">{t("tournament.form.playerOrTeam")}</Label>
              <Input id="tname" required placeholder="Zero Ping" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="temail">{t("tournament.form.email")}</Label>
              <Input
                id="temail"
                type="email"
                required
                placeholder="you@email.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tphone">{t("tournament.form.phone")}</Label>
              <Input
                id="tphone"
                type="tel"
                required
                placeholder="+20 100 000 0000"
              />
            </div>
            <DialogFooter>
              <Button type="submit" variant="hero" className="w-full">
                {t("tournament.form.confirm")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TournamentDetails;
