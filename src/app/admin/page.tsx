"use client";

import { useState, type ReactNode } from "react";
import {
  AdminSidebar,
  type AdminSectionId,
} from "@/components/admin/AdminSidebar";
import { AdminOverview } from "@/components/admin/sections/Overview";
import { UsersManagement } from "@/components/admin/sections/Users";
import { CentersManagement } from "@/components/admin/sections/Centers";
import { BookingsManagement } from "@/components/admin/sections/Bookings";
import { TournamentsManagement } from "@/components/admin/sections/Tournaments";
import { OffersManagement } from "@/components/admin/sections/Offers";
import { ReviewsManagement } from "@/components/admin/sections/Reviews";
import { Reports } from "@/components/admin/sections/Reports";
import { PlatformSettings } from "@/components/admin/sections/Settings";
import { AdminProfile } from "@/components/admin/sections/Profile";

const sections: Record<AdminSectionId, ReactNode> = {
  overview: <AdminOverview />,
  users: <UsersManagement />,
  centers: <CentersManagement />,
  bookings: <BookingsManagement />,
  tournaments: <TournamentsManagement />,
  offers: <OffersManagement />,
  reviews: <ReviewsManagement />,
  reports: <Reports />,
  settings: <PlatformSettings />,
  profile: <AdminProfile />,
};

const Admin = () => {
  const [active, setActive] = useState<AdminSectionId>("overview");

  return (
    <section className="container pt-24 md:pt-28 pb-16">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <AdminSidebar active={active} onSelect={setActive} />
        <div className="min-w-0">{sections[active]}</div>
      </div>
    </section>
  );
};

export default Admin;
