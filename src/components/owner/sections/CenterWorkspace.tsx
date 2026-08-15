import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import { Panel } from "@/components/owner/shared";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Boxes,
  MonitorSmartphone,
  Star,
  MapPin,
  CalendarCheck,
  Wallet,
} from "lucide-react";
import { Resources } from "@/components/owner/sections/Resources";
import { Services } from "@/components/owner/sections/Services";
import { Bookings } from "@/components/owner/sections/Bookings";
import { Offers } from "@/components/owner/sections/Offers";
import { Tournaments } from "@/components/owner/sections/Tournaments";
import { Employees } from "@/components/owner/sections/Employees";
import { Reports } from "@/components/owner/sections/Reports";
import { OwnerSettings } from "@/components/owner/sections/ProfileSettings";
import { useI18n } from "@/hooks/useI18n";
import {
  serviceTypes,
  ownerDevices,
  ownerBookingRows,
  ownerOffers,
  ownerTournaments,
  ownerEmployees,
  type OwnerCenter,
} from "@/data/ownerMock";

const tabs = [
  "Overview",
  "Resources",
  "Services",
  "Bookings",
  "Offers",
  "Tournaments",
  "Employees",
  "Reports",
  "Settings",
] as const;
type Tab = (typeof tabs)[number];

const tabLabelKey: Record<Tab, string> = {
  Overview: "owner.workspace.tabOverview",
  Resources: "owner.workspace.tabResources",
  Services: "owner.workspace.tabServices",
  Bookings: "owner.workspace.tabBookings",
  Offers: "owner.workspace.tabOffers",
  Tournaments: "owner.workspace.tabTournaments",
  Employees: "owner.workspace.tabEmployees",
  Reports: "owner.workspace.tabReports",
  Settings: "owner.workspace.tabSettings",
};

const CenterOverview = ({ center }: { center: OwnerCenter }) => {
  const { t } = useI18n();
  const services = serviceTypes.filter((s) => s.centerId === center.id);
  const devices = ownerDevices.filter((d) => d.centerId === center.id);
  const bookings = ownerBookingRows.filter((b) => b.centerId === center.id);
  const revenue = bookings.reduce((sum, b) => sum + b.total, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          Icon={Boxes}
          label={t("owner.workspace.resourceTypes")}
          value={String(services.length)}
        />
        <StatCard
          Icon={MonitorSmartphone}
          label={t("owner.centers.devices")}
          value={String(devices.length)}
        />
        <StatCard
          Icon={CalendarCheck}
          label={t("owner.workspace.bookings")}
          value={String(bookings.length)}
        />
        <StatCard
          Icon={Wallet}
          label={t("owner.workspace.revenue")}
          value={`$${revenue.toLocaleString()}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={t("owner.workspace.resourceAvailability")}>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-surface-elevated p-3"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-xs text-muted-foreground">
                  <span className="text-success font-mono">{s.available}</span>{" "}
                  {t("owner.workspace.available")} ·{" "}
                  <span className="text-warning font-mono">{s.reserved}</span>{" "}
                  {t("owner.workspace.reserved")} · {s.total}{" "}
                  {t("owner.workspace.total")}
                </span>
              </li>
            ))}
            {services.length === 0 && (
              <li className="text-muted-foreground">
                {t("owner.workspace.noResources")}
              </li>
            )}
          </ul>
        </Panel>

        <Panel title={t("owner.workspace.centerDetails")}>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{center.description}</p>
            <p>
              {center.address}, {center.city}, {center.country}
            </p>
            <p>{t("owner.workspace.hoursLabel", { hours: center.hours })}</p>
            <p>{t("owner.workspace.phoneLabel", { phone: center.phone })}</p>
            <p>
              {t("owner.workspace.branchesLabel", {
                branches: center.branches.join(", ") || "—",
              })}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl bg-surface-elevated p-3">
              <p className="font-display font-bold">
                {ownerOffers.filter((o) => o.centerId === center.id).length}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("owner.workspace.offers")}
              </p>
            </div>
            <div className="rounded-xl bg-surface-elevated p-3">
              <p className="font-display font-bold">
                {
                  ownerTournaments.filter((t2) => t2.centerId === center.id)
                    .length
                }
              </p>
              <p className="text-xs text-muted-foreground">
                {t("owner.workspace.tournaments")}
              </p>
            </div>
            <div className="rounded-xl bg-surface-elevated p-3">
              <p className="font-display font-bold">
                {ownerEmployees.filter((e) => e.centerId === center.id).length}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("owner.workspace.employees")}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export const CenterWorkspace = ({
  center,
  onBack,
}: {
  center: OwnerCenter;
  onBack: () => void;
}) => {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("Overview");
  const scope = { centerId: center.id, centerName: center.name };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-surface border border-border rounded-2xl overflow-hidden">
        <div className="relative h-32 sm:h-40">
          <img
            src={center.image}
            alt={`${center.name} cover`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <Button
            size="sm"
            variant="outline"
            className="absolute top-3 start-3"
            onClick={onBack}
          >
            <ArrowLeft className="h-3.5 w-3.5" />{" "}
            {t("owner.workspace.backToCenters")}
          </Button>
        </div>
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {center.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />{" "}
              {t("owner.workspace.branchAndCity", {
                branch: center.branches[0] ?? center.city,
                city: center.city,
                country: center.country,
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-primary text-primary" />{" "}
              {center.rating}
            </span>
            <StatusBadge status={center.status} />
          </div>
        </div>
      </div>

      <nav
        aria-label={t("owner.workspace.tabsAriaLabel", { name: center.name })}
        className="flex gap-1 overflow-x-auto border-b border-border pb-px"
      >
        {tabs.map((tb) => (
          <button
            key={tb}
            type="button"
            onClick={() => setTab(tb)}
            aria-current={tab === tb ? "page" : undefined}
            className={cn(
              "whitespace-nowrap px-4 py-2.5 text-sm rounded-t-xl transition-colors border-b-2",
              tab === tb
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t(tabLabelKey[tb])}
          </button>
        ))}
      </nav>

      <div>
        {tab === "Overview" && <CenterOverview center={center} />}
        {tab === "Resources" && <Resources {...scope} />}
        {tab === "Services" && <Services {...scope} />}
        {tab === "Bookings" && <Bookings {...scope} />}
        {tab === "Offers" && <Offers {...scope} />}
        {tab === "Tournaments" && <Tournaments {...scope} />}
        {tab === "Employees" && <Employees {...scope} />}
        {tab === "Reports" && <Reports />}
        {tab === "Settings" && <OwnerSettings />}
      </div>
    </div>
  );
};
