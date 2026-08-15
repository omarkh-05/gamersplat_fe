"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Panel, PageHead } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { Pencil, KeyRound } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export type OwnerProfileData = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

export const OwnerProfile = ({
  profile,
  onSave,
}: {
  profile: OwnerProfileData;
  onSave: (p: OwnerProfileData) => void;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [draft, setDraft] = useState<OwnerProfileData | null>(null);
  const [pw, setPw] = useState(false);
  const fieldLabels: Record<"name" | "email" | "phone" | "company", string> = {
    name: t("owner.profile.fullName"),
    email: t("owner.profile.email"),
    phone: t("owner.profile.phone"),
    company: t("owner.profile.company"),
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.profile.title")}
        description={t("owner.profile.description")}
        action={
          <Button variant="hero" onClick={() => setDraft(profile)}>
            <Pencil className="h-4 w-4" /> {t("owner.profile.edit")}
          </Button>
        }
      />

      <Panel title={t("owner.profile.personalInfo")}>
        <dl className="grid gap-4 sm:grid-cols-2 text-sm">
          {(
            [
              [t("owner.profile.fullName"), profile.name],
              [t("owner.profile.email"), profile.email],
              [t("owner.profile.phone"), profile.phone],
              [t("owner.profile.company"), profile.company],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="rounded-xl bg-surface-elevated p-4">
              <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {k}
              </dt>
              <dd className="mt-1.5 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel
        title={t("owner.profile.security")}
        action={
          <Button variant="outline" onClick={() => setPw(true)}>
            <KeyRound className="h-4 w-4" /> {t("owner.profile.changePassword")}
          </Button>
        }
      >
        <p className="text-sm text-muted-foreground">
          {t("owner.profile.passwordNote")}
        </p>
      </Panel>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("owner.profile.editTitle")}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSave(draft);
                setDraft(null);
                toast({ title: t("owner.profile.toastUpdated") });
              }}
            >
              {(["name", "email", "phone", "company"] as const).map((key) => (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={`p-${key}`}>{fieldLabels[key]}</Label>
                  <Input
                    id={`p-${key}`}
                    maxLength={80}
                    value={draft[key]}
                    onChange={(e) =>
                      setDraft({ ...draft, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDraft(null)}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit" variant="hero">
                  {t("common.save")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={pw} onOpenChange={setPw}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("owner.profile.changePassword")}
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setPw(false);
              toast({ title: t("owner.profile.toastPasswordUpdated") });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="pw-old">
                {t("owner.profile.currentPassword")}
              </Label>
              <Input id="pw-old" type="password" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw-new">{t("owner.profile.newPassword")}</Label>
              <Input id="pw-new" type="password" required minLength={8} />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPw(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit" variant="hero">
                {t("owner.profile.update")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const OwnerSettings = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [prefs, setPrefs] = useState({
    email: true,
    sms: false,
    autoAccept: false,
    maintenance: false,
  });

  const rows: { key: keyof typeof prefs; label: string; desc: string }[] = [
    {
      key: "email",
      label: t("owner.settings.emailNotifications"),
      desc: t("owner.settings.emailNotificationsDesc"),
    },
    {
      key: "sms",
      label: t("owner.settings.smsAlerts"),
      desc: t("owner.settings.smsAlertsDesc"),
    },
    {
      key: "autoAccept",
      label: t("owner.settings.autoAccept"),
      desc: t("owner.settings.autoAcceptDesc"),
    },
    {
      key: "maintenance",
      label: t("owner.settings.maintenanceMode"),
      desc: t("owner.settings.maintenanceModeDesc"),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.settings.title")}
        description={t("owner.settings.description")}
      />
      <Panel title={t("owner.settings.preferences")}>
        <ul className="divide-y divide-border">
          {rows.map((r) => (
            <li
              key={r.key}
              className="py-4 flex items-center justify-between gap-6"
            >
              <div>
                <p className="font-medium text-sm">{r.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
              </div>
              <Switch
                checked={prefs[r.key]}
                aria-label={r.label}
                onCheckedChange={(v) => {
                  setPrefs({ ...prefs, [r.key]: v });
                  toast({
                    title: v
                      ? t("owner.settings.toastEnabled", { label: r.label })
                      : t("owner.settings.toastDisabled", { label: r.label }),
                  });
                }}
              />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
};
