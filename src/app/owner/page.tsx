"use client";

import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import {
  OwnerSidebar,
  ownerNav,
  type OwnerSectionId,
} from "@/components/owner/OwnerSidebar";
import { OwnerOverview } from "@/components/owner/sections/Overview";
import {
  MyCenters,
  CenterManagement,
} from "@/components/owner/sections/Centers";
import { CenterWorkspace } from "@/components/owner/sections/CenterWorkspace";
import { Bookings } from "@/components/owner/sections/Bookings";
import { Offers } from "@/components/owner/sections/Offers";
import { Tournaments } from "@/components/owner/sections/Tournaments";
import { Requests } from "@/components/owner/sections/Requests";
import { Employees } from "@/components/owner/sections/Employees";
import { Revenue } from "@/components/owner/sections/Revenue";
import { Reports } from "@/components/owner/sections/Reports";
import {
  OwnerProfile,
  OwnerSettings,
  type OwnerProfileData,
} from "@/components/owner/sections/ProfileSettings";
import type { OwnerCenter } from "@/data/ownerMock";

const Owner = () => {
  const [section, setSection] = useState<OwnerSectionId>("overview");
  const [activeCenter, setActiveCenter] = useState<OwnerCenter | null>(null);
  const [profile, setProfile] = useState<OwnerProfileData>({
    name: "Omar Wahid",
    email: "owner@gamersplat.io",
    phone: "+20 100 555 7788",
    company: "Wahid Gaming Group",
  });

  const { t } = useI18n();
  const current = ownerNav.find((n) => n.id === section);

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          {t("owner.pageTitle")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("owner.pageSubtitle")}</p>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <OwnerSidebar active={section} onSelect={setSection} />

        <main
          aria-label={current ? t(current.labelKey) : undefined}
          className="min-w-0"
        >
          {section === "overview" && <OwnerOverview owner={profile} />}
          {section === "my-centers" && (
            <MyCenters
              onManage={() => setSection("center-management")}
              onOpenCenter={(c) => {
                setActiveCenter(c);
                setSection("center-workspace");
              }}
            />
          )}
          {section === "center-workspace" && activeCenter && (
            <CenterWorkspace
              center={activeCenter}
              onBack={() => setSection("my-centers")}
            />
          )}
          {section === "center-management" && <CenterManagement />}
          {section === "bookings" && <Bookings />}
          {section === "offers" && <Offers />}
          {section === "tournaments" && <Tournaments />}
          {section === "requests" && <Requests />}
          {section === "employees" && <Employees />}
          {section === "revenue" && <Revenue />}
          {section === "reports" && <Reports />}
          {section === "profile" && (
            <OwnerProfile profile={profile} onSave={setProfile} />
          )}
          {section === "settings" && <OwnerSettings />}
        </main>
      </div>
    </div>
  );
};

export default Owner;
