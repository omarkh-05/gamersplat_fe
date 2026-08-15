"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ConfirmDialog,
  Empty,
} from "@/components/admin/shared";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";
import {
  Search,
  Check,
  EyeOff,
  Trash2,
  Star,
  MessageSquare,
  Flag,
  ThumbsUp,
} from "lucide-react";
import { adminReviews, type AdminReview } from "@/data/adminMock";

export const ReviewsManagement = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [list, setList] = useState<AdminReview[]>(adminReviews);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [pending, setPending] = useState<{
    item: AdminReview;
    action: "publish" | "hide" | "delete";
  } | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (r) =>
          (status === "all" || r.status === status) &&
          (!q ||
            r.player.toLowerCase().includes(q.toLowerCase()) ||
            r.center.toLowerCase().includes(q.toLowerCase())),
      ),
    [list, status, q],
  );

  const actionLabel = (action: "publish" | "hide" | "delete") =>
    action === "publish"
      ? t("admin.reviews.actionPublish")
      : action === "hide"
        ? t("admin.reviews.actionHide")
        : t("admin.reviews.actionDelete");

  const actionPastLabel = (action: "publish" | "hide" | "delete") =>
    action === "publish"
      ? t("admin.reviews.actionPublished")
      : action === "hide"
        ? t("admin.reviews.actionHidden")
        : t("admin.reviews.actionDeleted");

  const apply = () => {
    if (!pending) return;
    const { item, action } = pending;
    setList((prev) =>
      action === "delete"
        ? prev.filter((r) => r.id !== item.id)
        : prev.map((r) =>
            r.id === item.id
              ? { ...r, status: action === "publish" ? "Published" : "Hidden" }
              : r,
          ),
    );
    toast({
      title: t("admin.reviews.confirmToast", {
        id: item.id,
        action: actionPastLabel(action),
      }),
      description: t("common.demoNote"),
    });
    setPending(null);
  };

  const avg = list.length
    ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1)
    : "—";

  return (
    <div className="space-y-8">
      <AdminHead
        title={t("admin.reviews.title")}
        description={t("admin.reviews.description")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={MessageSquare}
          label={t("admin.reviews.total")}
          value={list.length}
        />
        <StatCard
          Icon={ThumbsUp}
          label={t("admin.reviews.published")}
          value={list.filter((r) => r.status === "Published").length}
        />
        <StatCard
          Icon={Flag}
          label={t("admin.reviews.pending")}
          value={list.filter((r) => r.status === "Pending").length}
        />
        <StatCard
          Icon={Star}
          label={t("admin.reviews.avgRating")}
          value={avg}
        />
      </div>

      <Panel>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="ps-9"
              placeholder={`${t("common.search")}…`}
              aria-label={t("admin.reviews.searchAria")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label={t("admin.reviews.statusFilterAria")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("common.anyStatus")}</SelectItem>
              {["Published", "Pending", "Hidden"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Panel>

      <Panel title={t("admin.reviews.all")}>
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((r) => (
              <li key={r.id} className="py-4 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{r.player}</p>
                    <span className="text-xs text-muted-foreground">
                      · {r.center}
                    </span>
                  </div>
                  <div
                    className="mt-1 flex items-center gap-1"
                    aria-label={t("admin.reviews.ratingLabel", {
                      rating: r.rating,
                    })}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < r.rating
                            ? "h-3.5 w-3.5 fill-primary text-primary"
                            : "h-3.5 w-3.5 text-muted-foreground/40"
                        }
                      />
                    ))}
                    <span className="ms-2 text-xs text-muted-foreground">
                      {r.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {r.text}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <StatusBadge status={r.status} />
                  {r.status !== "Published" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={t("admin.reviews.publish", {
                        name: r.player,
                      })}
                      onClick={() => setPending({ item: r, action: "publish" })}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {r.status !== "Hidden" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={t("admin.reviews.hide", { name: r.player })}
                      onClick={() => setPending({ item: r, action: "hide" })}
                    >
                      <EyeOff className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={t("admin.reviews.delete", { name: r.player })}
                    onClick={() => setPending({ item: r, action: "delete" })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <ConfirmDialog
        open={!!pending}
        onOpenChange={(o) => !o && setPending(null)}
        title={t("admin.reviews.confirmTitle", {
          action: pending
            ? actionLabel(pending.action)
            : t("admin.reviews.update"),
        })}
        onConfirm={apply}
      />
    </div>
  );
};
