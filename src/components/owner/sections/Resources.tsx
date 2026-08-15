"use client";

import { useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { Eye, ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import {
  serviceTypes,
  resourceImageFor,
  type ServiceType,
} from "@/data/ownerMock";

const categories = ["PC", "Console", "VR", "Room", "Food"];

export const Resources = ({
  centerId,
  centerName,
}: {
  centerId: string;
  centerName: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(serviceTypes);
  const [draft, setDraft] = useState<ServiceType | null>(null);
  const [removing, setRemoving] = useState<ServiceType | null>(null);
  const [viewing, setViewing] = useState<ServiceType | null>(null);

  const imageOf = (s: ServiceType) =>
    s.image || resourceImageFor(s.name, s.category);

  const onPickImage = (file?: File | null) => {
    if (!file || !draft) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      toast({
        title: t("owner.resources.imageInvalid"),
        variant: "destructive",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setDraft((d) => (d ? { ...d, image: String(reader.result) } : d));
    reader.readAsDataURL(file);
  };

  const empty: ServiceType = {
    id: "",
    centerId,
    name: "",
    category: "PC",
    unit: "per hour",
    basePrice: 0,
    total: 0,
    available: 0,
    reserved: 0,
    maintenance: 0,
    active: true,
  };

  const scoped = useMemo(
    () => list.filter((s) => s.centerId === centerId),
    [list, centerId],
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setList((l) =>
      draft.id
        ? l.map((s) => (s.id === draft.id ? draft : s))
        : [...l, { ...draft, id: `sv${Date.now()}`, centerId }],
    );
    toast({
      title: draft.id
        ? t("owner.resources.toastUpdatedTitle")
        : t("owner.resources.toastAddedTitle"),
      description: draft.name,
    });
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.resources.title")}
        description={t("owner.resources.description", { center: centerName })}
        action={
          <Button variant="hero" onClick={() => setDraft({ ...empty })}>
            <Plus className="h-4 w-4" /> {t("owner.resources.addType")}
          </Button>
        }
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.resources.tableCaption", { center: centerName })}
            </caption>
            <thead>
              <tr>
                <Th>{t("owner.resources.resource")}</Th>
                <Th>{t("owner.resources.category")}</Th>
                <Th>{t("owner.resources.total")}</Th>
                <Th>{t("owner.resources.available")}</Th>
                <Th>{t("owner.resources.reservedCol")}</Th>
                <Th>{t("owner.resources.maintenance")}</Th>
                <Th>{t("owner.resources.price")}</Th>
                <Th>{t("owner.resources.activeCol")}</Th>
                <Th className="text-end">{t("common.actions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scoped.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">
                    <button
                      type="button"
                      onClick={() => setViewing(s)}
                      className="flex items-center gap-3 text-start hover:text-primary transition-colors"
                    >
                      <img
                        src={imageOf(s)}
                        alt={s.name}
                        loading="lazy"
                        className="h-10 w-10 rounded-lg object-cover border border-border shrink-0"
                      />
                      <span className="truncate">{s.name}</span>
                    </button>
                  </td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {s.category}
                  </td>
                  <td className="py-3 pe-3 font-mono">{s.total}</td>
                  <td className="py-3 pe-3 font-mono text-success">
                    {s.available}
                  </td>
                  <td className="py-3 pe-3 font-mono text-warning">
                    {s.reserved}
                  </td>
                  <td className="py-3 pe-3 font-mono text-muted-foreground">
                    {s.maintenance}
                  </td>
                  <td className="py-3 pe-3 font-mono text-primary">
                    ${s.basePrice}{" "}
                    <span className="text-[11px] text-muted-foreground">
                      / {s.unit.replace("per ", "")}
                    </span>
                  </td>
                  <td className="py-3 pe-3">
                    <Switch
                      checked={s.active}
                      aria-label={t("owner.resources.toggle", { name: s.name })}
                      onCheckedChange={(v) =>
                        setList((l) =>
                          l.map((x) =>
                            x.id === s.id ? { ...x, active: v } : x,
                          ),
                        )
                      }
                    />
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewing(s)}
                      aria-label={t("owner.resources.viewDetails")}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDraft(s)}
                    >
                      <Pencil className="h-3.5 w-3.5" /> {t("common.edit")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setRemoving(s)}
                      aria-label={t("owner.centers.viewName", { name: s.name })}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {scoped.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-muted-foreground"
                  >
                    {t("owner.resources.empty")}
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
                ? t("owner.resources.editTitle")
                : t("owner.resources.addTitle")}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form
              onSubmit={save}
              className="space-y-4 max-h-[65vh] overflow-y-auto pe-1"
            >
              <div className="space-y-1.5">
                <Label htmlFor="s-name">{t("owner.resources.nameLabel")}</Label>
                <Input
                  id="s-name"
                  required
                  maxLength={60}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Gaming PC"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s-image">
                  {t("owner.resources.imageLabel")}
                </Label>
                <div className="flex items-center gap-3 rounded-xl bg-surface-elevated p-3">
                  <img
                    src={
                      draft.image ||
                      resourceImageFor(draft.name || "", draft.category)
                    }
                    alt=""
                    className="h-16 w-16 rounded-lg object-cover border border-border shrink-0"
                  />
                  <div className="min-w-0 space-y-2">
                    <input
                      id="s-image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => onPickImage(e.target.files?.[0])}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("s-image")?.click()
                        }
                      >
                        <ImagePlus className="h-3.5 w-3.5" />{" "}
                        {t("owner.resources.uploadImage")}
                      </Button>
                      {draft.image && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setDraft({ ...draft, image: undefined })
                          }
                        >
                          {t("owner.resources.removeImage")}
                        </Button>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {t("owner.resources.imageHint")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>{t("owner.resources.category")}</Label>
                  <Select
                    value={draft.category}
                    onValueChange={(v) => setDraft({ ...draft, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-unit">
                    {t("owner.resources.pricingUnit")}
                  </Label>
                  <Input
                    id="s-unit"
                    maxLength={30}
                    value={draft.unit}
                    onChange={(e) =>
                      setDraft({ ...draft, unit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="s-total">
                    {t("owner.resources.totalUnits")}
                  </Label>
                  <Input
                    id="s-total"
                    type="number"
                    min={0}
                    max={1000}
                    value={draft.total}
                    onChange={(e) =>
                      setDraft({ ...draft, total: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-avail">
                    {t("owner.resources.availableUnits")}
                  </Label>
                  <Input
                    id="s-avail"
                    type="number"
                    min={0}
                    max={1000}
                    value={draft.available}
                    onChange={(e) =>
                      setDraft({ ...draft, available: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-res">
                    {t("owner.resources.reservedUnits")}
                  </Label>
                  <Input
                    id="s-res"
                    type="number"
                    min={0}
                    max={1000}
                    value={draft.reserved}
                    onChange={(e) =>
                      setDraft({ ...draft, reserved: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-maint">
                    {t("owner.resources.underMaintenance")}
                  </Label>
                  <Input
                    id="s-maint"
                    type="number"
                    min={0}
                    max={1000}
                    value={draft.maintenance}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        maintenance: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s-price">
                  {t("owner.resources.pricePerHour")}
                </Label>
                <Input
                  id="s-price"
                  type="number"
                  min={0}
                  max={10000}
                  value={draft.basePrice}
                  onChange={(e) =>
                    setDraft({ ...draft, basePrice: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-elevated p-3">
                <Label htmlFor="s-active">
                  {t("owner.resources.availableForBooking")}
                </Label>
                <Switch
                  id="s-active"
                  checked={draft.active}
                  onCheckedChange={(v) => setDraft({ ...draft, active: v })}
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

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{viewing?.name}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pe-1">
              <img
                src={imageOf(viewing)}
                alt={viewing.name}
                loading="lazy"
                className="w-full aspect-video rounded-xl object-cover border border-border"
              />
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.category")}
                  </dt>
                  <dd className="font-medium">{viewing.category}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.price")}
                  </dt>
                  <dd className="font-mono text-primary">
                    ${viewing.basePrice} / {viewing.unit.replace("per ", "")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.total")}
                  </dt>
                  <dd className="font-mono">{viewing.total}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.available")}
                  </dt>
                  <dd className="font-mono text-success">
                    {viewing.available}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.reservedCol")}
                  </dt>
                  <dd className="font-mono text-warning">{viewing.reserved}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.maintenance")}
                  </dt>
                  <dd className="font-mono text-muted-foreground">
                    {viewing.maintenance}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t("owner.resources.activeCol")}
                  </dt>
                  <dd className="font-medium">
                    {viewing.active ? t("common.yes") : t("common.no")}
                  </dd>
                </div>
              </dl>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setViewing(null)}
                >
                  {t("common.close")}
                </Button>
                <Button
                  type="button"
                  variant="hero"
                  onClick={() => {
                    setDraft(viewing);
                    setViewing(null);
                  }}
                >
                  {t("common.edit")}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={t("owner.confirmDelete", { name: removing?.name ?? "" })}
        onConfirm={() => {
          setList((l) => l.filter((s) => s.id !== removing?.id));
          setRemoving(null);
          toast({ title: t("owner.resources.toastDeleted") });
        }}
      />
    </div>
  );
};
