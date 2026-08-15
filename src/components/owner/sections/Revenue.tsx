"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Panel, PageHead, Th, chartTooltip } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Wallet,
  TrendingUp,
  CalendarCheck,
  Percent,
} from "lucide-react";
import {
  revenueByPeriod,
  revenueByDevice,
  profitableSessions,
  ownerCenters,
} from "@/data/ownerMock";
import { useI18n } from "@/hooks/useI18n";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Period = "7d" | "30d" | "12m";

export const Revenue = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const labels: Record<Period, string> = {
    "7d": t("owner.revenue.period7d"),
    "30d": t("owner.revenue.period30d"),
    "12m": t("owner.revenue.period12m"),
  };
  const [period, setPeriod] = useState<Period>("30d");
  const data = [...revenueByPeriod[period]];
  const total = data.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.revenue.title")}
        description={t("owner.revenue.description")}
        action={
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: t("owner.revenue.toastExportedTitle"),
                description: t("owner.revenue.toastExportedDesc"),
              })
            }
          >
            <Download className="h-4 w-4" /> {t("owner.revenue.export")}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Wallet}
          label={labels[period]}
          value={`$${total.toLocaleString()}`}
        />
        <StatCard
          Icon={TrendingUp}
          label={t("owner.revenue.avgPerSession")}
          value="$68"
          hint={t("owner.revenue.vsPrevious")}
        />
        <StatCard
          Icon={CalendarCheck}
          label={t("owner.revenue.paidBookings")}
          value={1284}
        />
        <StatCard
          Icon={Percent}
          label={t("owner.revenue.offerDiscounts")}
          value="$4,120"
          hint={t("owner.revenue.givenThisPeriod")}
        />
      </div>

      <Panel
        title={t("owner.revenue.overTime")}
        action={
          <div className="flex gap-1 rounded-xl bg-surface-elevated p-1">
            {(Object.keys(labels) as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                aria-pressed={period === p}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${period === p ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {p}
              </button>
            ))}
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revgrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="label"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip {...chartTooltip} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              fill="url(#revgrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("owner.revenue.byDevice")}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByDevice}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip {...chartTooltip} />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("owner.revenue.mostProfitable")}>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("owner.revenue.mostProfitable")}
              </caption>
              <thead>
                <tr>
                  <Th>{t("owner.revenue.session")}</Th>
                  <Th>{t("owner.revenue.sessions")}</Th>
                  <Th className="text-right">
                    {t("owner.revenue.revenueCol")}
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {profitableSessions.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3 pr-3 font-medium">{s.label}</td>
                    <td className="py-3 pr-3 font-mono text-muted-foreground">
                      {s.sessions}
                    </td>
                    <td className="py-3 text-right font-mono text-primary">
                      ${s.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <Panel title={t("owner.revenue.byCenter")}>
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-sm">
            <caption className="sr-only">{t("owner.revenue.byCenter")}</caption>
            <thead>
              <tr>
                <Th>{t("owner.centers.name")}</Th>
                <Th>{t("owner.revenue.city")}</Th>
                <Th>{t("owner.revenue.bookings")}</Th>
                <Th className="text-right">{t("owner.revenue.revenueCol")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ownerCenters.map((c, i) => (
                <tr key={c.id}>
                  <td className="py-3 pr-3 font-medium">{c.name}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{c.city}</td>
                  <td className="py-3 pr-3 font-mono">
                    {[624, 388, 272][i] ?? 120}
                  </td>
                  <td className="py-3 text-right font-mono text-primary">
                    $
                    {[
                      (24800).toLocaleString(),
                      (14200).toLocaleString(),
                      (9600).toLocaleString(),
                    ][i] ?? "4,000"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
};
