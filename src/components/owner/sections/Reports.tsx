"use client";

import { Panel, PageHead, Th, chartTooltip } from "@/components/owner/shared";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Download, Star, Activity, Gauge, Trophy } from "lucide-react";
import {
  peakHours,
  ratingTrend,
  popularGames,
  ownerDevices,
  ownerOffers,
  ownerTournaments,
} from "@/data/ownerMock";
import { useI18n } from "@/hooks/useI18n";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Reports = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const utilised = ownerDevices.filter((d) => d.status === "Reserved").length;

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.reports.title")}
        description={t("owner.reports.description")}
        action={
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: t("owner.reports.toastExportedTitle"),
                description: t("owner.reports.toastExportedDesc"),
              })
            }
          >
            <Download className="h-4 w-4" /> {t("owner.reports.export")}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Gauge}
          label={t("owner.reports.deviceUtilisation")}
          value={`${Math.round((utilised / ownerDevices.length) * 100)}%`}
          hint={t("owner.reports.currentlyReserved")}
        />
        <StatCard
          Icon={Activity}
          label={t("owner.reports.peakHour")}
          value="20:00"
          hint={t("owner.reports.bookingsCount", { count: 76 })}
        />
        <StatCard
          Icon={Star}
          label={t("owner.reports.avgRating")}
          value="4.8"
          hint={t("owner.reports.trendingUp")}
        />
        <StatCard
          Icon={Trophy}
          label={t("owner.reports.tournamentsRun")}
          value={ownerTournaments.length}
          hint={t("owner.reports.thisSeason")}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("owner.reports.activityByHour")}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakHours}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="hour"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip {...chartTooltip} />
              <Bar
                dataKey="bookings"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("owner.reports.ratingTrend")}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ratingTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                domain={[4, 5]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip {...chartTooltip} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title={t("owner.reports.utilisationReport")}>
        <ul className="space-y-4">
          {ownerDevices.map((d) => {
            const pct = {
              Reserved: 92,
              Available: 54,
              Maintenance: 12,
              Disabled: 0,
            }[d.status];
            return (
              <li key={d.id}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{d.name}</span>
                  <span className="font-mono text-muted-foreground">
                    {pct}%
                  </span>
                </div>
                <Progress value={pct} className="h-1.5" />
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("owner.reports.popularGames")}>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("owner.reports.popularGames")}
              </caption>
              <thead>
                <tr>
                  <Th>{t("owner.reports.game")}</Th>
                  <Th className="text-right">{t("owner.reports.players")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {popularGames.map((g) => (
                  <tr key={g.name}>
                    <td className="py-3 font-medium">{g.name}</td>
                    <td className="py-3 text-right font-mono text-primary">
                      {g.players}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title={t("owner.reports.offersTournamentsPerf")}>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("owner.reports.offersTournamentsPerf")}
              </caption>
              <thead>
                <tr>
                  <Th>{t("owner.reports.item")}</Th>
                  <Th>{t("owner.reports.type")}</Th>
                  <Th className="text-right">
                    {t("owner.reports.engagement")}
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ownerOffers.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 font-medium">{o.title}</td>
                    <td className="py-3 text-muted-foreground">
                      {t("owner.reports.offer")}
                    </td>
                    <td className="py-3 text-right font-mono text-primary">
                      {t("owner.reports.uses", { count: o.used })}
                    </td>
                  </tr>
                ))}
                {ownerTournaments.map((tr) => (
                  <tr key={tr.id}>
                    <td className="py-3 font-medium">{tr.name}</td>
                    <td className="py-3 text-muted-foreground">
                      {t("owner.reports.tournament")}
                    </td>
                    <td className="py-3 text-right font-mono text-primary">
                      {t("owner.reports.playersCount", { count: tr.joined })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
};
