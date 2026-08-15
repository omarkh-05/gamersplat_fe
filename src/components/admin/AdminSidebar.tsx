"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  Trophy,
  BadgePercent,
  Star,
  BarChart3,
  Settings,
  UserCog,
  Menu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type AdminSectionId =
  | "overview"
  | "users"
  | "centers"
  | "bookings"
  | "tournaments"
  | "offers"
  | "reviews"
  | "reports"
  | "settings"
  | "profile";

export const adminNav: { id: AdminSectionId; key: string; icon: LucideIcon }[] =
  [
    { id: "overview", key: "admin.nav.overview", icon: LayoutDashboard },
    { id: "users", key: "admin.nav.users", icon: Users },
    { id: "centers", key: "admin.nav.centers", icon: Building2 },
    { id: "bookings", key: "admin.nav.bookings", icon: CalendarCheck },
    { id: "tournaments", key: "admin.nav.tournaments", icon: Trophy },
    { id: "offers", key: "admin.nav.offers", icon: BadgePercent },
    { id: "reviews", key: "admin.nav.reviews", icon: Star },
    { id: "reports", key: "admin.nav.reports", icon: BarChart3 },
    { id: "settings", key: "admin.nav.settings", icon: Settings },
    { id: "profile", key: "admin.nav.profile", icon: UserCog },
  ];

const NavList = ({
  active,
  onSelect,
}: {
  active: AdminSectionId;
  onSelect: (id: AdminSectionId) => void;
}) => {
  const { t } = useI18n();
  return (
    <ul className="space-y-1">
      {adminNav.map(({ id, key, icon: Icon }) => (
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
            <span className="truncate">{t(key)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export const AdminSidebar = ({
  active,
  onSelect,
}: {
  active: AdminSectionId;
  onSelect: (id: AdminSectionId) => void;
}) => {
  const { t, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const current = adminNav.find((n) => n.id === active);

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Menu className="h-4 w-4" />
              <span className="truncate">
                {current ? t(current.key) : t("admin.manage")}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side={dir === "rtl" ? "right" : "left"}
            className="w-[85vw] max-w-xs overflow-y-auto p-4"
          >
            <p className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              {t("admin.manage")}
            </p>
            <nav aria-label={t("admin.nav.sectionsLabel")}>
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

      <nav
        aria-label={t("admin.nav.sectionsLabel")}
        className="hidden lg:block bg-gradient-surface border border-border rounded-2xl p-3 lg:sticky lg:top-24"
      >
        <p className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {t("admin.manage")}
        </p>
        <NavList active={active} onSelect={onSelect} />
      </nav>
    </>
  );
};
