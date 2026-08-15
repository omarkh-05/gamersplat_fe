"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  ownerEmployees,
  ownerCenters,
  allPermissions,
  type OwnerEmployee,
} from "@/data/ownerMock";

const statuses: OwnerEmployee["status"][] = ["Active", "On leave", "Suspended"];

export const Employees = ({
  centerId,
  centerName,
}: {
  centerId?: string;
  centerName?: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(ownerEmployees);
  const empty: OwnerEmployee = {
    id: "",
    centerId: centerId ?? ownerCenters[0].id,
    name: "",
    phone: "",
    role: "",
    center: centerName ?? ownerCenters[0].name,
    permissions: [],
    status: "Active",
  };
  const scoped = centerId ? list.filter((e) => e.centerId === centerId) : list;
  const [draft, setDraft] = useState<OwnerEmployee | null>(null);
  const [removing, setRemoving] = useState<OwnerEmployee | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setList((l) =>
      draft.id
        ? l.map((x) => (x.id === draft.id ? draft : x))
        : [...l, { ...draft, id: `em${Date.now()}` }],
    );
    toast({
      title: draft.id
        ? t("owner.employees.toastUpdatedTitle")
        : t("owner.employees.toastAddedTitle"),
      description: draft.name,
    });
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.employees.title")}
        description={
          centerName
            ? t("owner.employees.descriptionCenter", { center: centerName })
            : t("owner.employees.description")
        }
        action={
          <Button variant="hero" onClick={() => setDraft({ ...empty })}>
            <Plus className="h-4 w-4" /> {t("owner.employees.add")}
          </Button>
        }
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.employees.tableCaption")}
            </caption>
            <thead>
              <tr>
                <Th>{t("owner.employees.name")}</Th>
                <Th>{t("owner.employees.role")}</Th>
                <Th>{t("owner.employees.center")}</Th>
                <Th>{t("owner.employees.phone")}</Th>
                <Th>{t("owner.employees.permissions")}</Th>
                <Th>{t("owner.employees.status")}</Th>
                <Th className="text-end">{t("common.actions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scoped.map((e) => (
                <tr key={e.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{e.name}</td>
                  <td className="py-3 pe-3 text-muted-foreground">{e.role}</td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {e.center}
                  </td>
                  <td className="py-3 pe-3 font-mono text-xs text-muted-foreground">
                    {e.phone}
                  </td>
                  <td className="py-3 pe-3 text-xs text-muted-foreground max-w-[200px]">
                    {e.permissions.join(", ") || "—"}
                  </td>
                  <td className="py-3 pe-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDraft(e)}
                    >
                      <Pencil className="h-3.5 w-3.5" /> {t("common.edit")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setRemoving(e)}
                      aria-label={t("owner.employees.removeName", {
                        name: e.name,
                      })}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {draft?.id
                ? t("owner.employees.editTitle")
                : t("owner.employees.addTitle")}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="e-name">{t("owner.employees.name")}</Label>
                  <Input
                    id="e-name"
                    required
                    maxLength={60}
                    value={draft.name}
                    onChange={(ev) =>
                      setDraft({ ...draft, name: ev.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-phone">{t("owner.employees.phone")}</Label>
                  <Input
                    id="e-phone"
                    type="tel"
                    maxLength={24}
                    value={draft.phone}
                    onChange={(ev) =>
                      setDraft({ ...draft, phone: ev.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="e-role">
                    {t("owner.employees.roleLabel")}
                  </Label>
                  <Input
                    id="e-role"
                    maxLength={40}
                    value={draft.role}
                    onChange={(ev) =>
                      setDraft({ ...draft, role: ev.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("owner.employees.center")}</Label>
                  <Select
                    value={draft.center}
                    onValueChange={(v) => setDraft({ ...draft, center: v })}
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
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium mb-1">
                  {t("owner.employees.permissionsLegend")}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allPermissions.map((p) => (
                    <label
                      key={p}
                      className="flex items-center gap-2 text-sm rounded-lg bg-surface-elevated px-3 py-2"
                    >
                      <Checkbox
                        checked={draft.permissions.includes(p)}
                        onCheckedChange={(v) =>
                          setDraft({
                            ...draft,
                            permissions: v
                              ? [...draft.permissions, p]
                              : draft.permissions.filter((x) => x !== p),
                          })
                        }
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="space-y-1.5">
                <Label>{t("common.status")}</Label>
                <Select
                  value={draft.status}
                  onValueChange={(v) =>
                    setDraft({ ...draft, status: v as OwnerEmployee["status"] })
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
        title={t("owner.employees.removeTitle", { name: removing?.name ?? "" })}
        onConfirm={() => {
          setList((l) => l.filter((e) => e.id !== removing?.id));
          setRemoving(null);
          toast({ title: t("owner.employees.toastRemoved") });
        }}
      />
    </div>
  );
};
