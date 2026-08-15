"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import {
  Eye,
  Pencil,
  Plus,
  Settings2,
  Star,
  MapPin,
  Phone,
  Clock,
  Images,
  Trash2,
} from "lucide-react";
import {
  ownerCenters,
  ownerDevices,
  serviceTypes,
  type OwnerCenter,
} from "@/data/ownerMock";

const emptyCenter: OwnerCenter = {
  id: "",
  name: "",
  description: "",
  country: "",
  city: "",
  address: "",
  coords: "",
  phone: "",
  hours: "",
  status: "Pending",
  devices: 0,
  rating: 0,
  services: [],
  branches: [],
  gallery: 0,
  image: "",
};

const CenterForm = ({
  value,
  onChange,
}: {
  value: OwnerCenter;
  onChange: (c: OwnerCenter) => void;
}) => {
  const { t } = useI18n();
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pe-1">
      <div className="space-y-1.5">
        <Label htmlFor="c-name">{t("owner.centers.name")}</Label>
        <Input
          id="c-name"
          required
          maxLength={80}
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Neon Arena"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-desc">{t("owner.centers.description")}</Label>
        <Textarea
          id="c-desc"
          rows={3}
          maxLength={300}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder={t("owner.centers.descriptionPlaceholder")}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="c-country">{t("owner.centers.country")}</Label>
          <Input
            id="c-country"
            maxLength={40}
            value={value.country}
            onChange={(e) => onChange({ ...value, country: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-city">{t("owner.centers.city")}</Label>
          <Input
            id="c-city"
            maxLength={40}
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-address">{t("owner.centers.address")}</Label>
        <Input
          id="c-address"
          maxLength={120}
          value={value.address}
          onChange={(e) => onChange({ ...value, address: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="c-coords">{t("owner.centers.coords")}</Label>
          <Input
            id="c-coords"
            maxLength={40}
            placeholder="30.0444, 31.2357"
            value={value.coords}
            onChange={(e) => onChange({ ...value, coords: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-phone">{t("owner.centers.phone")}</Label>
          <Input
            id="c-phone"
            type="tel"
            maxLength={24}
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="c-hours">{t("owner.centers.hours")}</Label>
          <Input
            id="c-hours"
            maxLength={40}
            placeholder="10:00 – 02:00"
            value={value.hours}
            onChange={(e) => onChange({ ...value, hours: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-gallery">{t("owner.centers.galleryImages")}</Label>
          <Input
            id="c-gallery"
            type="number"
            min={0}
            max={40}
            value={value.gallery}
            onChange={(e) =>
              onChange({ ...value, gallery: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-services">{t("owner.centers.servicesCsv")}</Label>
        <Input
          id="c-services"
          value={value.services.join(", ")}
          onChange={(e) =>
            onChange({
              ...value,
              services: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          placeholder="Gaming PC, PlayStation 5, VIP Rooms"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-branches">{t("owner.centers.branchesCsv")}</Label>
        <Input
          id="c-branches"
          value={value.branches.join(", ")}
          onChange={(e) =>
            onChange({
              ...value,
              branches: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          placeholder="Downtown, Nasr City"
        />
      </div>
    </div>
  );
};

const CenterView = ({ center }: { center: OwnerCenter }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{center.description}</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          {center.address}, {center.city}
        </p>
        <p className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 text-primary shrink-0" />
          {center.phone}
        </p>
        <p className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 text-primary shrink-0" />
          {center.hours}
        </p>
        <p className="flex items-center gap-2 text-muted-foreground">
          <Images className="h-4 w-4 text-primary shrink-0" />
          {t("owner.centers.galleryImagesCount", { count: center.gallery })}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded-xl bg-surface-elevated p-3">
          <p className="font-display font-bold">{center.rating}</p>
          <p className="text-xs text-muted-foreground">
            {t("owner.centers.rating")}
          </p>
        </div>
        <div className="rounded-xl bg-surface-elevated p-3">
          <p className="font-display font-bold">{center.devices}</p>
          <p className="text-xs text-muted-foreground">
            {t("owner.centers.devices")}
          </p>
        </div>
        <div className="rounded-xl bg-surface-elevated p-3">
          <p className="font-display font-bold">{center.branches.length}</p>
          <p className="text-xs text-muted-foreground">
            {t("owner.centers.branches")}
          </p>
        </div>
      </div>
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
          {t("owner.centers.services")}
        </p>
        <div className="flex flex-wrap gap-2">
          {center.services.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-full bg-surface-elevated ring-1 ring-border"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MyCenters = ({
  onManage,
  onOpenCenter,
}: {
  onManage: () => void;
  onOpenCenter: (c: OwnerCenter) => void;
}) => {
  const { t } = useI18n();
  const [view, setView] = useState<OwnerCenter | null>(null);

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.centers.myTitle")}
        description={t("owner.centers.myDescription")}
        action={
          <Button variant="hero" onClick={onManage}>
            <Settings2 className="h-4 w-4" /> {t("owner.centers.manageCenters")}
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {ownerCenters.map((c) => (
          <div
            key={c.id}
            className="bg-gradient-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors"
          >
            <div className="relative h-36">
              <img
                src={c.image}
                alt={`${c.name} cover`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute top-3 end-3">
                <StatusBadge status={c.status} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold">{c.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {c.city}, {c.country}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-xl bg-surface-elevated p-3">
                  <p className="font-display font-bold">
                    {ownerDevices.filter((d) => d.centerId === c.id).length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("owner.centers.devices")}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-elevated p-3">
                  <p className="font-display font-bold">
                    {serviceTypes.filter((s) => s.centerId === c.id).length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("owner.centers.services")}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-elevated p-3">
                  <p className="font-display font-bold flex items-center justify-center gap-1">
                    {c.rating}
                    <Star className="h-3 w-3 text-primary" />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("owner.centers.rating")}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setView(c)}
                  aria-label={t("owner.centers.viewName", { name: c.name })}
                >
                  <Eye className="h-3.5 w-3.5" /> {t("owner.centers.view")}
                </Button>
                <Button
                  size="sm"
                  variant="hero"
                  className="flex-1"
                  onClick={() => onOpenCenter(c)}
                >
                  <Settings2 className="h-3.5 w-3.5" />{" "}
                  {t("owner.centers.manageCenter")}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{view?.name}</DialogTitle>
          </DialogHeader>
          {view && <CenterView center={view} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const CenterManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState(ownerCenters);
  const [view, setView] = useState<OwnerCenter | null>(null);
  const [draft, setDraft] = useState<OwnerCenter | null>(null);
  const [removing, setRemoving] = useState<OwnerCenter | null>(null);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    if (draft.id) {
      setList((l) => l.map((c) => (c.id === draft.id ? draft : c)));
      toast({
        title: t("owner.centers.toastUpdatedTitle"),
        description: t("owner.centers.toastUpdatedDesc", { name: draft.name }),
      });
    } else {
      setList((l) => [...l, { ...draft, id: `oc${Date.now()}` }]);
      toast({
        title: t("owner.centers.toastSubmittedTitle"),
        description: t("owner.centers.toastSubmittedDesc"),
      });
    }
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title={t("owner.centers.managementTitle")}
        description={t("owner.centers.managementDescription")}
        action={
          <Button variant="hero" onClick={() => setDraft({ ...emptyCenter })}>
            <Plus className="h-4 w-4" /> {t("owner.centers.addCenter")}
          </Button>
        }
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              {t("owner.centers.tableCaption")}
            </caption>
            <thead>
              <tr>
                <Th>{t("common.center")}</Th>
                <Th>{t("owner.centers.location")}</Th>
                <Th>{t("common.status")}</Th>
                <Th>{t("owner.centers.devices")}</Th>
                <Th>{t("owner.centers.rating")}</Th>
                <Th className="text-end">{t("common.actions")}</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{c.name}</td>
                  <td className="py-3 pe-3 text-muted-foreground">
                    {c.city}, {c.country}
                  </td>
                  <td className="py-3 pe-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3 pe-3 font-mono">{c.devices}</td>
                  <td className="py-3 pe-3 font-mono text-primary">
                    {c.rating}★
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setView(c)}
                    >
                      <Eye className="h-3.5 w-3.5" /> {t("common.view")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDraft(c)}
                    >
                      <Pencil className="h-3.5 w-3.5" /> {t("common.edit")}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setRemoving(c)}
                      aria-label={t("owner.confirmDelete", { name: c.name })}
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

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{view?.name}</DialogTitle>
          </DialogHeader>
          {view && <CenterView center={view} />}
        </DialogContent>
      </Dialog>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {draft?.id
                ? t("owner.centers.editName")
                : t("owner.centers.addTitle")}
            </DialogTitle>
            <DialogDescription>
              {t("owner.centers.reviewNote")}
            </DialogDescription>
          </DialogHeader>
          {draft && (
            <form onSubmit={save} className="space-y-4">
              <CenterForm value={draft} onChange={setDraft} />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDraft(null)}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit" variant="hero">
                  {draft.id ? t("common.save") : t("owner.centers.submit")}
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
          setList((l) => l.filter((c) => c.id !== removing?.id));
          setRemoving(null);
          toast({ title: t("owner.centers.toastDeleted") });
        }}
      />
    </div>
  );
};
