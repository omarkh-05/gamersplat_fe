"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { TournamentCard } from "@/components/TournamentCard";
import { StatCard } from "@/components/StatCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tournamentList } from "@/data/mock";
import { Search, Trophy, Users, CalendarDays } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const Tournaments = () => {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [game, setGame] = useState("all");
  const [status, setStatus] = useState("all");

  const games = useMemo(
    () => Array.from(new Set(tournamentList.map((t) => t.game))),
    [],
  );

  const filtered = tournamentList.filter((t) => {
    const q = query.trim().toLowerCase();
    return (
      (!q ||
        t.name.toLowerCase().includes(q) ||
        t.center.toLowerCase().includes(q)) &&
      (game === "all" || t.game === game) &&
      (status === "all" || t.status === status)
    );
  });

  const totalPrize = tournamentList.reduce(
    (sum, t) => sum + Number(t.prize.replace(/[^0-9]/g, "")),
    0,
  );
  const totalPlayers = tournamentList.reduce((sum, t) => sum + t.joined, 0);

  return (
    <section className="container pt-24 md:pt-28 pb-16">
      <SectionHeader
        eyebrow={t("tournaments.eyebrow")}
        title={t("tournaments.title")}
        description={t("tournaments.description")}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          Icon={Trophy}
          label={t("tournaments.stats.prizePool")}
          value={`$${totalPrize.toLocaleString()}`}
          hint={t("tournaments.stats.prizePoolHint")}
        />
        <StatCard
          Icon={Users}
          label={t("tournaments.stats.playersRegistered")}
          value={totalPlayers}
          hint={t("tournaments.stats.playersRegisteredHint")}
        />
        <StatCard
          Icon={CalendarDays}
          label={t("tournaments.stats.upcomingEvents")}
          value={tournamentList.filter((t) => t.status !== "Closed").length}
          hint={t("tournaments.stats.upcomingEventsHint")}
        />
      </div>

      <div className="mt-8 bg-gradient-surface border border-border rounded-2xl p-5 grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="tsearch">{t("tournaments.filters.search")}</Label>
          <div className="relative">
            <Search
              className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="tsearch"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("tournaments.filters.searchPlaceholder")}
              className="ps-9"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tgame">{t("tournaments.filters.game")}</Label>
          <Select value={game} onValueChange={setGame}>
            <SelectTrigger id="tgame">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("tournaments.filters.allGames")}
              </SelectItem>
              {games.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tstatus">{t("tournaments.filters.status")}</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="tstatus">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("tournaments.filters.anyStatus")}
              </SelectItem>
              <SelectItem value="Open">
                {t("tournaments.filters.open")}
              </SelectItem>
              <SelectItem value="Almost Full">
                {t("tournaments.filters.almostFull")}
              </SelectItem>
              <SelectItem value="Closed">
                {t("tournaments.filters.closed")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {t("tournaments.empty")}
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Tournaments;
