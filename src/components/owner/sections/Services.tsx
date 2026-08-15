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
import { Panel, PageHead, Th, ConfirmDialog } from "@/components/owner/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import { ImagePlus, Pencil, Plus, Trash2, Eye } from "lucide-react";

export type CenterService = {
  id: string;
  centerId: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  status: "Active" | "Disabled";
};

const defaultServices: CenterService[] = [
  {
    id: "svc-1",
    centerId: "oc1",
    name: "10Gbps Fiber",
    description: "Ultra-fast fiber connectivity for tournaments and streaming.",
    icon: "internet",
    status: "Active",
  },
  {
    id: "svc-2",
    centerId: "oc1",
    name: "Gamer Lounge",
    description: "Comfortable lounge for teams, friends, and spectators.",
    icon: "lounge",
    status: "Active",
  },
  {
    id: "svc-3",
    centerId: "oc2",
    name: "Air Conditioning",
    description: "Comfortable, climate-controlled rooms throughout the day.",
    icon: "climate",
    status: "Active",
  },
];

const iconOptions = [
  "internet",
  "lounge",
  "climate",
  "vip",
  "storage",
  "parking",
  "cafeteria",
];

export const Services = ({
  centerId,
  centerName,
}: {
  centerId: string;
  centerName: string;
}) => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<CenterService[]>(defaultServices);
  const [draft, setDraft] = useState<CenterService | null>(null);
  const [viewing, setViewing] = useState<CenterService | null>(null);
  const [removing, setRemoving] = useState<CenterService | null>(null);

  const scoped = useMemo(
    () => list.filter((service) => service.centerId === centerId),
    [list, centerId],
  );

  const empty: CenterService = {
    id: "",
    centerId,
    name: "",
    description: "",
    icon: "internet",
    status: "Active",
  };

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft) return;
    setList((items) =>
      draft.id
        ? items.map((item) => (item.id === draft.id ? draft : item))
        : [...items, { ...draft, id: `svc-${Date.now()}` }],
    );
    toast({
      title: draft.id ? "Service updated" : "Service added",
      description: draft.name,
    });
    setDraft(null);
  };

  return (
    <div className="space-y-8">
      <PageHead
        title="Services"
        description={`Services available at ${centerName}.`}
        action={
          <Button variant="hero" onClick={() => setDraft({ ...empty })}>
            <Plus className="h-4 w-4" /> Add service
          </Button>
        }
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Service</Th>
                <Th>Description</Th>
                <Th>Icon</Th>
                <Th>Status</Th>
                <Th className="text-end">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scoped.map((service) => (
                <tr key={service.id} className="hover:bg-muted/30">
                  <td className="py-3 pe-3 font-medium">{service.name}</td>
                  <td className="py-3 pe-3 text-muted-foreground max-w-[280px]">
                    {service.description}
                  </td>
                  <td className="py-3 pe-3">{service.icon}</td>
                  <td className="py-3 pe-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[11px] font-mono uppercase tracking-wider ${service.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="py-3 text-end whitespace-nowrap space-x-2 rtl:space-x-reverse">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewing(service)}
                      aria-label="View service details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDraft(service)}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setRemoving(service)}
                      aria-label="Delete service"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {scoped.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No services yet for this center.
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
              {draft?.id ? "Edit service" : "Add service"}
            </DialogTitle>
          </DialogHeader>
          {draft && (
            <form
              onSubmit={save}
              className="space-y-4 max-h-[65vh] overflow-y-auto pe-1"
            >
              <div className="space-y-1.5">
                <Label htmlFor="service-name">Service name</Label>
                <Input
                  id="service-name"
                  required
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-desc">Description</Label>
                <Input
                  id="service-desc"
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({ ...draft, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-icon">Icon</Label>
                <select
                  id="service-icon"
                  value={draft.icon}
                  onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-elevated p-3">
                <Label htmlFor="service-status">Status</Label>
                <Switch
                  id="service-status"
                  checked={draft.status === "Active"}
                  onCheckedChange={(checked) =>
                    setDraft({
                      ...draft,
                      status: checked ? "Active" : "Disabled",
                    })
                  }
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDraft(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  Save
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
            <div className="space-y-4">
              <div className="rounded-xl bg-surface-elevated p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Description
                </p>
                <p className="mt-2 text-sm">{viewing.description}</p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Icon</dt>
                  <dd className="font-medium">{viewing.icon}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Status</dt>
                  <dd className="font-medium">{viewing.status}</dd>
                </div>
              </dl>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setViewing(null)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="hero"
                  onClick={() => {
                    setDraft(viewing);
                    setViewing(null);
                  }}
                >
                  Edit
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={`Delete ${removing?.name ?? "service"}?`}
        description="This service will be removed from the selected center."
        onConfirm={() => {
          setList((items) =>
            items.filter((service) => service.id !== removing?.id),
          );
          setRemoving(null);
          toast({ title: "Service deleted" });
        }}
      />
    </div>
  );
};
