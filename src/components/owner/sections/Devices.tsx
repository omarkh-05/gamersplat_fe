"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import {
  Pencil,
  Plus,
  Trash2,
  MonitorSmartphone,
  CalendarCheck,
  Wrench,
  Ban,
} from "lucide-react";
import {
  ownerDevices,
  ownerCenters,
  serviceTypes,
  type OwnerDevice,
} from "@/data/ownerMock";

const statuses: OwnerDevice["status"][] = [
  "Available",
  "Reserved",
  "Maintenance",
  "Disabled",
];

export const Devices = ({
  centerId,
  centerName,
}: {
  centerId?: string;
  centerName?: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(ownerDevices);
  const [center, setCenter] = useState("all");
  const empty: OwnerDevice = {
    id: "",
    centerId: centerId ?? ownerCenters[0].id,
    name: "",
    type: "Gaming PC",
    serial: "",
    center: centerName ?? ownerCenters[0].name,
    status: "Available",
    pricePerHour: 0,
  };
  const scoped = useMemo(
    () => (centerId ? list.filter((d) => d.centerId === centerId) : list),
    [list, centerId],
  );
  const [status, setStatus] = useState("all");
  const [draft, setDraft] = useState<OwnerDevice | null>(null);
  const [removing, setRemoving] = useState<OwnerDevice | null>(null);

  const filtered = useMemo(
    () =>
      scoped.filter(
        (d) =>
          (centerId || center === "all" || d.center === center) &&
          (status === "all" || d.status === status),
      ),
    [scoped, center, status, centerId],
  );

  const count = (s: OwnerDevice["status"]) =>
    scoped.filter((d) => d.status === s).length;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setList((l) =>
      draft.id
        ? l.map((d) => (d.id === draft.id ? draft : d))
        : [...l, { ...draft, id: `dv${Date.now()}` }],
    );
    toast({
      title: draft.id
        ? t("owner.devices.toastUpdatedTitle")
        : t("owner.devices.toastAddedTitle"),
      description: draft.name,
    });
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.devices.title")}
        description={
          centerName
            ? t("owner.devices.descriptionCenter", { center: centerName })
            : t("owner.devices.description")
        }
        action={
          <Button variant="hero" onClick={() => setDraft({ ...empty })}>
            <Plus className="h-4 w-4" /> {t("owner.devices.addDevice")}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={MonitorSmartphone}
          label={t("owner.devices.available")}
          value={count("Available")}
        />
        <StatCard
          Icon={CalendarCheck}
          label={t("owner.devices.reserved")}
          value={count("Reserved")}
        />
        <StatCard
          Icon={Wrench}
          label={t("owner.devices.maintenance")}
          value={count("Maintenance")}
        />
        <StatCard
          Icon={Ban}
          label={t("owner.devices.disabled")}
          value={count("Disabled")}
        />
      </div>

      <Panel
        title={t("owner.devices.allDevices")}
        action={
          <div className="flex flex-wrap gap-2">
            {!centerId && (
              <Select value={center} onValueChange={setCenter}>
                <SelectTrigger
                  className="w-[170px]"
                  aria-label={t("owner.devices.filterByCenter")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("owner.devices.allCenters")}
                  </SelectItem>
                  {ownerCenters.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger
                className="w-[150px]"
                aria-label={t("owner.devices.filterByStatus")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("owner.devices.anyStatus")}
                </SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.devices.tableCaption")}
            </caption>
            <thead>
              <tr>
                <Th>{t("owner.devices.device")}</Th>
                <Th>{t("owner.devices.type")}</Th>
                <Th>{t("owner.devices.serial")}</Th>
                {!centerId && <Th>{t("owner.devices.center")}</Th>}
                <Th>{t("owner.devices.pricePerHour")}</Th>
                <Th>{t("owner.devices.status")}</Th>
                <Th className="text-end">{t("common.actions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{d.name}</td>
                  <td className="py-3 pe-3 text-muted-foreground">{d.type}</td>
                  <td className="py-3 pe-3 font-mono text-xs text-muted-foreground">
                    {d.serial}
                  </td>
                  {!centerId && (
                    <td className="py-3 pe-3 text-muted-foreground">
                      {d.center}
                    </td>
                  )}
                  <td className="py-3 pe-3 font-mono text-primary">
                    ${d.pricePerHour}
                  </td>
                  <td className="py-3 pe-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDraft(d)}
                    >
                      <Pencil className="h-3.5 w-3.5" /> {t("common.edit")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setRemoving(d)}
                      aria-label={t("owner.devices.deleteName", {
                        name: d.name,
                      })}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={centerId ? 6 : 7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    {t("owner.devices.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {draft?.id
                ? t("owner.devices.editTitle")
                : t("owner.devices.addTitle")}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form onSubmit={save} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="d-name">{t("owner.devices.deviceName")}</Label>
                <Input
                  id="d-name"
                  required
                  maxLength={60}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("owner.devices.type")}</Label>
                  <Select
                    value={draft.type}
                    onValueChange={(v) => setDraft({ ...draft, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes
                        .filter((s) => !centerId || s.centerId === centerId)
                        .map((s) => (
                          <SelectItem key={s.id} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="d-serial">
                    {t("owner.devices.serialNumber")}
                  </Label>
                  <Input
                    id="d-serial"
                    maxLength={40}
                    value={draft.serial}
                    onChange={(e) =>
                      setDraft({ ...draft, serial: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {!centerId && (
                  <div className="space-y-1.5">
                    <Label>{t("owner.devices.center")}</Label>
                    <Select
                      value={draft.center}
                      onValueChange={(v) =>
                        setDraft({
                          ...draft,
                          center: v,
                          centerId:
                            ownerCenters.find((c) => c.name === v)?.id ??
                            draft.centerId,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ownerCenters.map((c) => (
                          <SelectItem key={c.id} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label>{t("owner.devices.status")}</Label>
                  <Select
                    value={draft.status}
                    onValueChange={(v) =>
                      setDraft({ ...draft, status: v as OwnerDevice["status"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="d-price">
                  {t("owner.devices.pricePerHour")} ($)
                </Label>
                <Input
                  id="d-price"
                  type="number"
                  min={0}
                  max={10000}
                  value={draft.pricePerHour}
                  onChange={(e) =>
                    setDraft({ ...draft, pricePerHour: Number(e.target.value) })
                  }
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDraft(null)}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit" variant="hero">
                  {t("common.saveShort")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={t("owner.confirmDelete", { name: removing?.name ?? "" })}
        onConfirm={() => {
          setList((l) => l.filter((d) => d.id !== removing?.id));
          setRemoving(null);
          toast({ title: t("owner.devices.toastDeleted") });
        }}
      />
    </div>
  );
};
