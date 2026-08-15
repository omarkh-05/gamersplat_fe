import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Panel, PageHead, chartTooltip } from "@/components/owner/shared";
import { useI18n } from "@/hooks/useI18n";
import {
  Building2, CalendarCheck, CalendarClock, CheckCircle2, XCircle, Wallet, Star,
  Boxes, MonitorSmartphone, BadgePercent, Trophy,
} from "lucide-react";
import { ownerCenters, ownerBookingRows, ownerOffers, ownerTournaments, ownerDevices, serviceTypes, revenueByPeriod } from "@/data/ownerMock";
import { analyticsBookings, analyticsDevices } from "@/data/mock";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, AreaChart, Area } from "recharts";

export const OwnerOverview = ({ owner }: { owner: { name: string; email: string; phone: string } }) => {
  const { t } = useI18n();
  const count = (s: string) => ownerBookingRows.filter((b) => b.status === s).length;

  return (
    <div className="space-y-8">
      <PageHead title={t("owner.overview.title")} description={t("owner.overview.description")} />

      <Panel title={t("owner.overview.centerInfo")}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-surface-elevated p-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{t("owner.overview.personalInfo")}</p>
            <p className="mt-2 font-display text-lg font-semibold">{owner.name}</p>
            <p className="text-sm text-muted-foreground">{owner.email}</p>
            <p className="text-sm text-muted-foreground">{owner.phone}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-surface-elevated p-4 text-center">
              <p className="font-display text-2xl font-bold">{ownerCenters.length}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("owner.overview.centers")}</p>
            </div>
            <div className="rounded-xl bg-surface-elevated p-4 text-center">
              <p className="font-display text-2xl font-bold">{ownerCenters.filter((c) => c.status !== "Pending" && c.status !== "Closed").length}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("owner.overview.active")}</p>
            </div>
            <div className="rounded-xl bg-surface-elevated p-4 text-center flex flex-col items-center justify-center gap-2">
              <StatusBadge status="Open" />
              <p className="text-xs text-muted-foreground">{t("owner.overview.status")}</p>
            </div>
          </div>
        </div>
      </Panel>

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">{t("owner.overview.performance")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard Icon={CalendarCheck} label={t("owner.overview.totalBookings")} value={ownerBookingRows.length * 42} hint={t("owner.overview.allTime")} />
          <StatCard Icon={CalendarClock} label={t("owner.overview.upcoming")} value={count("Pending") + count("Confirmed")} hint={t("owner.overview.next7Days")} />
          <StatCard Icon={CheckCircle2} label={t("owner.overview.completedSessions")} value={1284} hint={t("owner.overview.vsLastMonth")} />
          <StatCard Icon={XCircle} label={t("owner.overview.cancelled")} value={37} hint={t("owner.overview.pctOfBookings")} />
          <StatCard Icon={Wallet} label={t("owner.overview.totalRevenue")} value="$204,900" hint={t("owner.overview.last12Months")} />
          <StatCard Icon={Star} label={t("owner.overview.avgRating")} value="4.7" hint={t("owner.overview.acrossReviews")} />
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">{t("owner.overview.activityOverview")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard Icon={Boxes} label={t("owner.overview.activeServices")} value={serviceTypes.filter((s) => s.active).length} />
          <StatCard Icon={MonitorSmartphone} label={t("owner.overview.activeDevices")} value={ownerDevices.filter((d) => d.status !== "Disabled").length} />
          <StatCard Icon={BadgePercent} label={t("owner.overview.activeOffers")} value={ownerOffers.filter((o) => o.status === "Active").length} />
          <StatCard Icon={Trophy} label={t("owner.overview.activeTournaments")} value={ownerTournaments.filter((t2) => t2.status === "Published" || t2.status === "Live").length} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel title={t("owner.overview.bookingTrends")}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analyticsBookings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title={t("owner.overview.revenueTrends")}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={[...revenueByPeriod["12m"]]}>
              <defs>
                <linearGradient id="ovrev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#ovrev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title={t("owner.overview.deviceUsage")}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsDevices}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title={t("owner.overview.recentBookings")} action={<span className="text-xs text-muted-foreground flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-primary" /> {t("owner.overview.allCenters")}</span>}>
        <ul className="divide-y divide-border">
          {ownerBookingRows.slice(0, 4).map((b) => (
            <li key={b.id} className="py-3 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[180px]">
                <p className="font-semibold">{b.player}</p>
                <p className="text-xs text-muted-foreground">{b.device} · {b.center}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{b.date} · {b.time}</span>
              <StatusBadge status={b.status} />
              <span className="font-mono text-sm text-primary">${b.total}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
};
