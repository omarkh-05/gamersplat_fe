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
import {
  AdminHead,
  Panel,
  Th,
  ConfirmDialog,
  Empty,
} from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import {
  Eye,
  Pencil,
  Search,
  Ban,
  Check,
  Users,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { adminUsers, type AdminUser } from "@/data/adminMock";

export const UsersManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<AdminUser[]>(adminUsers);
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<AdminUser | null>(null);
  const [edit, setEdit] = useState<AdminUser | null>(null);
  const [pending, setPending] = useState<{
    user: AdminUser;
    next: AdminUser["status"];
  } | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (u) =>
          (type === "all" || u.type === type) &&
          (status === "all" || u.status === status) &&
          (!q ||
            u.name.toLowerCase().includes(q.toLowerCase()) ||
            u.email.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, type, status, q],
  );

  const apply = () => {
    if (!pending) return;
    setList((prev) =>
      prev.map((u) =>
        u.id === pending.user.id ? { ...u, status: pending.next } : u,
      ),
    );
    toast({
      title: t("admin.users.confirmToast", {
        name: pending.user.name,
        status: pending.next,
      }),
      description: t("common.demoNote"),
    });
    setPending(null);
  };

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.users.title")}
        description={t("admin.users.description")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard Icon={Users} label={t("admin.users.total")} value="12,438" />
        <StatCard
          Icon={UserCheck}
          label={t("admin.users.active")}
          value={list.filter((u) => u.status === "Active").length}
          hint={t("admin.users.inThisView")}
        />
        <StatCard
          Icon={UserPlus}
          label={t("admin.users.pending")}
          value={list.filter((u) => u.status === "Pending").length}
        />
        <StatCard
          Icon={UserX}
          label={t("admin.users.blocked")}
          value={list.filter((u) => u.status === "Suspended").length}
        />
      </div>

      <Panel>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={`${t("common.search")}…`}
              aria-label={t("admin.users.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger aria-label={t("admin.users.typeFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyType")}</SelectItem>
              {["Player", "Owner", "Admin"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("admin.users.statusFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyStatus")}</SelectItem>
              {["Active", "Pending", "Suspended"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Panel>

      <Panel title={t("admin.users.all")}>
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {t("admin.users.tableCaption")}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <Th>{t("admin.users.colUser")}</Th>
                  <Th>{t("admin.users.colPhone")}</Th>
                  <Th>{t("admin.users.colType")}</Th>
                  <Th>{t("admin.users.colJoined")}</Th>
                  <Th>{t("admin.users.colStatus")}</Th>
                  <Th className="text-end">{t("common.actions")}</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30">
                    <td className="py-3 pe-3">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground font-mono text-xs">
                      {u.phone}
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {u.type}
                    </td>
                    <td className="py-3 pe-3 text-muted-foreground">
                      {u.joined}
                    </td>
                    <td className="py-3 pe-3">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="py-3 text-end whitespace-nowrap">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t("admin.users.view", { name: u.name })}
                        onClick={() => setView(u)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t("admin.users.editAria", { name: u.name })}
                        onClick={() => setEdit(u)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {u.status === "Suspended" ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.users.activate", {
                            name: u.name,
                          })}
                          onClick={() =>
                            setPending({ user: u, next: "Active" })
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label={t("admin.users.blockAria", {
                            name: u.name,
                          })}
                          onClick={() =>
                            setPending({ user: u, next: "Suspended" })
                          }
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{view?.name}</DialogTitle>
          </DialogHeader>
          {view && (
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              {(
                [
                  [t("admin.users.fieldEmail"), view.email],
                  [t("admin.users.fieldPhone"), view.phone],
                  [t("admin.users.fieldType"), view.type],
                  [t("admin.users.fieldCity"), view.city],
                  [t("admin.users.fieldRegistered"), view.joined],
                  [t("admin.users.fieldBookings"), String(view.bookings)],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-surface-elevated p-4">
                  <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-medium">{v}</dd>
                </div>
              ))}
              <div className="rounded-xl bg-surface-elevated p-4 sm:col-span-2 flex items-center justify-between">
                <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {t("common.status")}
                </dt>
                <dd>
                  <StatusBadge status={view.status} />
                </dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("admin.users.editTitle", { name: edit?.name ?? "" })}
            </DialogTitle>
          </DialogHeader>
          {edit && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setList((prev) =>
                  prev.map((u) => (u.id === edit.id ? edit : u)),
                );
                setEdit(null);
                toast({
                  title: t("admin.users.updatedToast"),
                  description: t("common.demoNote"),
                });
              }}
            >
              {(
                [
                  [t("admin.users.fieldFullName"), "name"],
                  [t("admin.users.fieldEmail"), "email"],
                  [t("admin.users.fieldPhone"), "phone"],
                  [t("admin.users.fieldCity"), "city"],
                ] as const
              ).map(([label, key]) => (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={`u-${key}`}>{label}</Label>
                  <Input
                    id={`u-${key}`}
                    maxLength={80}
                    value={edit[key]}
                    onChange={(e) =>
                      setEdit({ ...edit, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEdit(null)}
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

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={
          pending?.next === "Active"
            ? t("admin.users.confirmActivate")
            : t("admin.users.confirmBlock")
        }
        onConfirm={apply}
      />
    </div>
  );
};
