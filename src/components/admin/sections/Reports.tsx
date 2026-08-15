"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/StatCard";
import { AdminHead, Panel, Th, chartTooltip } from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { Download, TrendingUp, Users, Building2, Wallet } from "lucide-react";
import {
  userGrowth,
  bookingGrowth,
  centerGrowth,
  platformRevenue,
  popularGamesPlatform,
  popularLocations,
  adminCenters,
} from "@/data/adminMock";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export const Reports = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [period, setPeriod] = useState("6m");

  const download = (format: string) => () =>
    toast({
      title: t("admin.reports.exportToast", { format }),
      description: t("common.demoNote"),
    });

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.reports.title")}
        description={t("admin.reports.description")}
        action={
          <div className="flex flex-wrap gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger
                className="w-36"
                aria-label={t("admin.reports.periodAria")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">
                  {t("admin.reports.last30Days")}
                </SelectItem>
                <SelectItem value="6m">
                  {t("admin.reports.last6Months")}
                </SelectItem>
                <SelectItem value="12m">
                  {t("admin.reports.last12Months")}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={download(t("admin.reports.exportCsv"))}
            >
              <Download className="h-4 w-4" /> {t("admin.reports.exportCsv")}
            </Button>
            <Button
              variant="hero"
              onClick={download(t("admin.reports.exportPdf"))}
            >
              <Download className="h-4 w-4" /> {t("admin.reports.exportPdf")}
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Users}
          label={t("admin.reports.userGrowth")}
          value="+18.1%"
          hint={t("admin.reports.vsPreviousPeriod")}
        />
        <StatCard
          Icon={TrendingUp}
          label={t("admin.reports.bookingGrowth")}
          value="+13.5%"
          hint={t("admin.reports.vsPreviousPeriod")}
        />
        <StatCard
          Icon={Building2}
          label={t("admin.reports.newCenters")}
          value="+6"
          hint={t("admin.reports.thisPeriod")}
        />
        <StatCard
          Icon={Wallet}
          label={t("admin.reports.revenue")}
          value="$106k"
          hint={t("admin.reports.thisPeriod")}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("admin.reports.usersOverTime")}>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={userGrowth}>
              <defs>
                <linearGradient id="repUsers" x1="0" y1="0" x2="0" y2="1">
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
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip {...chartTooltip} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                fill="url(#repUsers)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.reports.revenueOverTime")}>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={platformRevenue}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip {...chartTooltip} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--secondary))"
                strokeWidth={2.5}
                dot={{ fill: "hsl(var(--secondary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.reports.bookingsByMonth")}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={bookingGrowth}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
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

        <Panel title={t("admin.reports.centersOnboarded")}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={centerGrowth}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              />
              <Tooltip {...chartTooltip} />
              <Bar
                dataKey="centers"
                fill="hsl(var(--secondary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title={t("admin.reports.centerPerformance")}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("admin.reports.tableCaption")}
            </caption>
            <thead>
              <tr className="border-b border-border">
                <Th>{t("admin.reports.colCenter")}</Th>
                <Th>{t("admin.reports.colCity")}</Th>
                <Th>{t("admin.reports.colBookings")}</Th>
                <Th>{t("admin.reports.colRating")}</Th>
                <Th className="text-end">{t("admin.reports.colRevenue")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...adminCenters]
                .sort((a, b) => b.revenue - a.revenue)
                .map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30">
                    <td className="py-3 pe-3 font-medium">{c.name}</td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {c.city}
                    </td>
                    <td className="py-3 pe-3 font-mono text-xs">
                      {c.bookings.toLocaleString()}
                    </td>
                    <td className="py-3 pe-3 font-mono text-xs">
                      {c.rating > 0 ? c.rating : "—"}
                    </td>
                    <td className="py-3 text-end font-mono text-primary">
                      ${c.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("admin.reports.topGames")}>
          <ul className="space-y-3">
            {popularGamesPlatform.map((g) => (
              <li key={g.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{g.name}</span>
                  <span className="font-mono text-muted-foreground">
                    {g.value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary"
                    style={{ width: `${g.value * 2.5}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={t("admin.reports.topLocations")}>
          <ul className="space-y-3">
            {popularLocations.map((l) => (
              <li key={l.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{l.name}</span>
                  <span className="font-mono text-muted-foreground">
                    {l.value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${l.value * 2.5}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};
