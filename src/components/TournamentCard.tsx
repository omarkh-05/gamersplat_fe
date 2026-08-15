import Link from "next/link";
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Progress } from "@/components/ui/progress";
import type { Tournament } from "@/data/mock";
import { useI18n } from "@/hooks/useI18n";

export const TournamentCard = ({ t }: { t: Tournament }) => {
  const { t: translate } = useI18n();
  return (
    <Link
      href={`/tournaments/${t.id}`}
      className="group bg-gradient-surface border border-border rounded-2xl p-6 flex flex-col hover:border-primary/40 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-primary">
            {t.game}
          </span>
          <h3 className="font-display text-lg font-semibold leading-tight mt-1 group-hover:text-primary transition-colors">
            {t.name}
          </h3>
        </div>
        <StatusBadge status={t.status} />
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {t.description}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">{t.date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">{t.center}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Trophy className="h-4 w-4 text-primary shrink-0" />
          <span>
            {t.prize} {translate("card.prizePool")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4 text-primary shrink-0" />
          <span>
            {translate("card.joined", { joined: t.joined, max: t.maxPlayers })}
          </span>
        </div>
      </dl>

      <div className="mt-5 mt-auto pt-5">
        <Progress value={(t.joined / t.maxPlayers) * 100} className="h-1.5" />
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {translate("card.entryFee")}
          </span>
          <span className="font-mono font-semibold text-primary">
            ${t.entry}
          </span>
        </div>
      </div>
    </Link>
  );
};
