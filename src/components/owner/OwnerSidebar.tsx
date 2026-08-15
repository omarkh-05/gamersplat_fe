"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Settings2,
  CalendarCheck,
  BadgePercent,
  Trophy,
  Inbox,
  Users2,
  Wallet,
  BarChart3,
  UserCog,
  Settings,
  Menu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/hooks/useI18n";

export type OwnerSectionId =
  | "overview"
  | "my-centers"
  | "center-management"
  | "center-workspace"
  | "bookings"
  | "offers"
  | "tournaments"
  | "requests"
  | "employees"
  | "revenue"
  | "reports"
  | "profile"
  | "settings";

export const ownerNav: {
  id: OwnerSectionId;
  labelKey: string;
  icon: LucideIcon;
}[] = [
  { id: "overview", labelKey: "owner.nav.overview", icon: LayoutDashboard },
  { id: "my-centers", labelKey: "owner.nav.myCenters", icon: Building2 },
  {
    id: "center-management",
    labelKey: "owner.nav.centerManagement",
    icon: Settings2,
  },
  { id: "bookings", labelKey: "owner.nav.bookings", icon: CalendarCheck },
  { id: "offers", labelKey: "owner.nav.offers", icon: BadgePercent },
  { id: "tournaments", labelKey: "owner.nav.tournaments", icon: Trophy },
  { id: "requests", labelKey: "owner.nav.requests", icon: Inbox },
  { id: "employees", labelKey: "owner.nav.employees", icon: Users2 },
  { id: "revenue", labelKey: "owner.nav.revenue", icon: Wallet },
  { id: "reports", labelKey: "owner.nav.reports", icon: BarChart3 },
  { id: "profile", labelKey: "owner.nav.profile", icon: UserCog },
  { id: "settings", labelKey: "owner.nav.settings", icon: Settings },
];

const NavList = ({
  active,
  onSelect,
}: {
  active: OwnerSectionId;
  onSelect: (id: OwnerSectionId) => void;
}) => {
  const { t } = useI18n();
  return (
    <ul className="space-y-1">
      {ownerNav.map(({ id, labelKey, icon: Icon }) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => onSelect(id)}
            aria-current={active === id ? "page" : undefined}
            className={cn(
              "w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-start transition-colors",
              active === id
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{t(labelKey)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export const OwnerSidebar = ({
  active,
  onSelect,
}: {
  active: OwnerSectionId;
  onSelect: (id: OwnerSectionId) => void;
}) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const current = ownerNav.find((n) => n.id === active);

  return (
    <>
      {/* Mobile / tablet drawer */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Menu className="h-4 w-4" />
              <span className="truncate">
                {current ? t(current.labelKey) : t("owner.manage")}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85vw] max-w-xs overflow-y-auto p-4"
          >
            <p className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              {t("owner.manage")}
            </p>
            <nav aria-label="Owner dashboard sections">
              <NavList
                active={active}
                onSelect={(id) => {
                  onSelect(id);
                  setOpen(false);
                }}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <nav
        aria-label="Owner dashboard sections"
        className="hidden lg:block bg-gradient-surface border border-border rounded-2xl p-3 lg:sticky lg:top-24"
      >
        <p className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {t("owner.manage")}
        </p>
        <NavList active={active} onSelect={onSelect} />
      </nav>
    </>
  );
};
