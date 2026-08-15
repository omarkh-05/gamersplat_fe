import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminHead, Panel, chartTooltip } from "@/components/admin/shared";
import { useI18n } from "@/hooks/useI18n";
import {
  Users, UserCheck, UserPlus, UserX, Building2, CheckCircle2, Clock, Star,
  CalendarCheck, Timer, MonitorSmartphone, MapPin, Wallet, TrendingUp, CreditCard,
} from "lucide-react";
import {
  adminUsers, adminCenters, adminBookings, userGrowth, bookingGrowth, centerGrowth,
  platformRevenue, popularGamesPlatform, popularLocations, popularDevicesPlatform,
} from "@/data/adminMock";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip,
} from "recharts";

export const AdminOverview = () => {
  const { t } = useI18n();
  const topCenters = [...adminCenters].sort((a, b) => b.revenue - a.revenue).slice(0, 3);

  return (
    <div className="space-y-8">
      <AdminHead title={t("admin.overview.title")} description={t("admin.overview.description")} />

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">{t("admin.overview.usersHeading")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard Icon={Users} label={t("admin.overview.totalUsers")} value="12,438" hint={t("admin.overview.allRoles")} />
          <StatCard Icon={UserCheck} label={t("admin.overview.activeUsers")} value="9,204" hint={t("admin.overview.last30Days")} />
          <StatCard Icon={UserPlus} label={t("admin.overview.newRegistrations")} value="1,912" hint={t("admin.overview.thisMonth")} />
          <StatCard Icon={UserX} label={t("admin.overview.blockedUsers")} value={adminUsers.filter((u) => u.status === "Suspended").length * 12} hint={t("admin.overview.suspendedAccounts")} />
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">{t("admin.overview.centersHeading")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard Icon={Building2} label={t("admin.overview.totalCenters")} value={44} hint={t("admin.overview.acrossCountries")} />
          <StatCard Icon={CheckCircle2} label={t("admin.overview.activeCenters")} value={38} hint={t("admin.overview.acceptingBookings")} />
          <StatCard Icon={Clock} label={t("admin.overview.pendingApproval")} value={adminCenters.filter((c) => c.status === "Pending").length} hint={t("admin.overview.awaitingReview")} />
          <StatCard Icon={Star} label={t("admin.overview.topRated")} value="4.9" hint="Dune Esports" />
        </div>
      </div>

      <Panel title={t("admin.overview.topPerformingCenters")}>
        <ul className="divide-y divide-border">
          {topCenters.map((c) => (
            <li key={c.id} className="py-3 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[180px]">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.city} · {c.owner}</p>
              </div>
              <span className="text-xs text-muted-foreground">{c.bookings.toLocaleString()} {t("admin.overview.bookingsSuffix")}</span>
              <StatusBadge status={c.status} />
              <span className="font-mono text-sm text-primary">${c.revenue.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">{t("admin.overview.activityHeading")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard Icon={CalendarCheck} label={t("admin.overview.totalBookings")} value="23,410" hint={t("admin.overview.allTime")} />
          <StatCard Icon={Timer} label={t("admin.overview.totalSessions")} value="19,870" hint={t("admin.overview.completed")} />
          <StatCard Icon={MonitorSmartphone} label={t("admin.overview.popularDevice")} value="PC" hint={t("admin.overview.ofSessions", { value: 46 })} />
          <StatCard Icon={MapPin} label={t("admin.overview.popularLocation")} value="Cairo" hint={t("admin.overview.ofBookings", { value: 38 })} />
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold mb-4">{t("admin.overview.financialHeading")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard Icon={Wallet} label={t("admin.overview.totalRevenue")} value="$106k" hint={t("admin.overview.last6Months")} />
          <StatCard Icon={TrendingUp} label={t("admin.overview.revenueGrowth")} value="+19.6%" hint={t("admin.overview.vsPreviousPeriod")} />
          <StatCard Icon={CreditCard} label={t("admin.overview.activeSubscriptions")} value={26} hint={t("admin.overview.ownerPlans")} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("admin.overview.userGrowthChart")}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={userGrowth}>
              <defs>
                <linearGradient id="adUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="url(#adUsers)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.overview.bookingGrowthChart")}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bookingGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="bookings" stroke="hsl(var(--secondary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--secondary))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.overview.centerGrowthChart")}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={centerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="centers" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.overview.revenueTrends")}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={platformRevenue}>
              <defs>
                <linearGradient id="adRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--secondary))" fill="url(#adRev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.overview.popularGames")}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={popularGamesPlatform} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={90} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title={t("admin.overview.popularLocations")}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={popularLocations}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title={t("admin.overview.popularDevices")} action={<span className="text-xs text-muted-foreground">{t("admin.overview.shareOfSessions")}</span>}>
        <div className="grid gap-4 sm:grid-cols-4">
          {popularDevicesPlatform.map((d) => (
            <div key={d.name} className="rounded-xl bg-surface-elevated p-4">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{d.name}</p>
              <p className="mt-2 font-display text-2xl font-bold">{d.value}%</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={t("admin.overview.latestBookings")}>
        <ul className="divide-y divide-border">
          {adminBookings.slice(0, 4).map((b) => (
            <li key={b.id} className="py-3 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[180px]">
                <p className="font-semibold">{b.player}</p>
                <p className="text-xs text-muted-foreground">{b.resource} · {b.center}</p>
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
