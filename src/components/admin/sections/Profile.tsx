"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminHead, Panel } from "@/components/admin/shared";
import { StatCard } from "@/components/StatCard";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { Shield, Users, Building2, CheckCircle2 } from "lucide-react";
import { adminCenters } from "@/data/adminMock";

export const AdminProfile = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [profile, setProfile] = useState({
    name: "Omar Admin",
    email: "admin@gamersplat.io",
    phone: "+20 100 000 1111",
    role: t("admin.profile.roleSuperAdmin"),
  });
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const fieldLabels: Record<keyof typeof profile, string> = {
    name: t("admin.profile.fieldFullName"),
    email: t("admin.profile.fieldEmail"),
    phone: t("admin.profile.fieldPhone"),
    role: t("admin.profile.fieldRole"),
  };

  const pwLabels: Record<keyof typeof pw, string> = {
    current: t("admin.profile.fieldCurrentPassword"),
    next: t("admin.profile.fieldNewPassword"),
    confirm: t("admin.profile.fieldConfirmPassword"),
  };

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.profile.title")}
        description={t("admin.profile.description")}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          Icon={Building2}
          label={t("admin.profile.centersManaged")}
          value={adminCenters.length}
        />
        <StatCard
          Icon={Users}
          label={t("admin.profile.usersOverseen")}
          value="12.4k"
        />
        <StatCard
          Icon={CheckCircle2}
          label={t("admin.profile.actionsThisMonth")}
          value={184}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-1">
          <div className="h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center">
            <Shield className="h-7 w-7 text-primary-foreground" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">
            {profile.name}
          </h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="mt-1 text-xs font-mono uppercase tracking-wider text-primary">
            {profile.role}
          </p>
        </Panel>

        <Panel
          title={t("admin.profile.personalInfo")}
          className="lg:col-span-2"
        >
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: t("admin.profile.updatedToast"),
                description: t("common.demoNote"),
              });
            }}
          >
            {(Object.keys(profile) as (keyof typeof profile)[]).map((key) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={`ap-${key}`}>{fieldLabels[key]}</Label>
                <Input
                  id={`ap-${key}`}
                  maxLength={80}
                  value={profile[key]}
                  onChange={(e) =>
                    setProfile({ ...profile, [key]: e.target.value })
                  }
                />
              </div>
            ))}
            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit" variant="hero">
                {t("common.save")}
              </Button>
            </div>
          </form>
        </Panel>

        <Panel title={t("admin.profile.security")} className="lg:col-span-3">
          <form
            className="grid gap-4 sm:grid-cols-3"
            onSubmit={(e) => {
              e.preventDefault();
              setPw({ current: "", next: "", confirm: "" });
              toast({
                title: t("admin.profile.passwordUpdatedToast"),
                description: t("common.demoNote"),
              });
            }}
          >
            {(Object.keys(pw) as (keyof typeof pw)[]).map((key) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={`pw-${key}`}>{pwLabels[key]}</Label>
                <Input
                  id={`pw-${key}`}
                  type="password"
                  value={pw[key]}
                  onChange={(e) => setPw({ ...pw, [key]: e.target.value })}
                />
              </div>
            ))}
            <div className="sm:col-span-3 flex justify-end">
              <Button type="submit" variant="outline">
                {t("admin.profile.updatePassword")}
              </Button>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
};
