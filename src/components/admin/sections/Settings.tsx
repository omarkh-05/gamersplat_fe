"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminHead, Panel } from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n, type Lang } from "@/hooks/useI18n";
import { Shield } from "lucide-react";

export const PlatformSettings = () => {
  const { toast } = useToast();
  const { t, lang, setLang } = useI18n();
  const [commission, setCommission] = useState("12");
  const [currency, setCurrency] = useState("USD");
  const [toggles, setToggles] = useState({
    autoApproveCenters: false,
    allowGuestBrowsing: true,
    maintenanceMode: false,
    emailNotifications: true,
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("admin.settings.savedToast"),
      description: t("common.demoNote"),
    });
  };

  const toggleLabels: Record<
    keyof typeof toggles,
    { label: string; hint: string }
  > = {
    autoApproveCenters: {
      label: t("admin.settings.autoApproveCenters"),
      hint: t("admin.settings.autoApproveCentersHint"),
    },
    allowGuestBrowsing: {
      label: t("admin.settings.allowGuestBrowsing"),
      hint: t("admin.settings.allowGuestBrowsingHint"),
    },
    maintenanceMode: {
      label: t("admin.settings.maintenanceMode"),
      hint: t("admin.settings.maintenanceModeHint"),
    },
    emailNotifications: {
      label: t("admin.settings.emailNotifications"),
      hint: t("admin.settings.emailNotificationsHint"),
    },
  };

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.settings.title")}
        description={t("admin.settings.description")}
      />

      <form onSubmit={save} className="grid lg:grid-cols-2 gap-6">
        <Panel title={t("admin.settings.general")}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="commission">
                {t("admin.settings.commission")}
              </Label>
              <Input
                id="commission"
                type="number"
                min={0}
                max={100}
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="currency">
                {t("admin.settings.defaultCurrency")}
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["USD", "EGP", "SAR", "AED"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="deflang">
                {t("admin.settings.defaultLanguage")}
              </Label>
              <Select value={lang} onValueChange={(v) => setLang(v as Lang)}>
                <SelectTrigger id="deflang">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    {t("admin.settings.langEnglish")}
                  </SelectItem>
                  <SelectItem value="ar">
                    {t("admin.settings.langArabic")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Panel>

        <Panel title={t("admin.settings.behaviour")}>
          <ul className="space-y-4">
            {(Object.keys(toggles) as (keyof typeof toggles)[]).map((key) => {
              const { label, hint } = toggleLabels[key];
              return (
                <li
                  key={key}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{hint}</p>
                  </div>
                  <Switch
                    checked={toggles[key]}
                    aria-label={label}
                    onCheckedChange={(v) =>
                      setToggles((p) => ({ ...p, [key]: v }))
                    }
                  />
                </li>
              );
            })}
          </ul>
        </Panel>

        <div className="lg:col-span-2 flex justify-end">
          <Button type="submit" variant="hero">
            <Shield className="h-4 w-4" /> {t("common.save")}
          </Button>
        </div>
      </form>
    </div>
  );
};
