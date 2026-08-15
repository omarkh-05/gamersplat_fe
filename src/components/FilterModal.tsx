"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { countries, cities } from "@/data/mock";
import { useI18n } from "@/hooks/useI18n";

export type Filters = {
  country: string;
  city: string;
  status: string;
  rating: number;
};

export const FilterModal = ({
  filters,
  onApply,
}: {
  filters: Filters;
  onApply: (f: Filters) => void;
}) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Filters>(filters);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {t("filter.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {t("filter.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>{t("filter.country")}</Label>
            <Select
              value={draft.country}
              onValueChange={(v) => setDraft({ ...draft, country: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("filter.anyCountry")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("filter.anyCountry")}</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("filter.city")}</Label>
            <Select
              value={draft.city}
              onValueChange={(v) => setDraft({ ...draft, city: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("filter.anyCity")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("filter.anyCity")}</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("filter.status")}</Label>
            <Select
              value={draft.status}
              onValueChange={(v) => setDraft({ ...draft, status: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("filter.anyStatus")}</SelectItem>
                <SelectItem value="Open">{t("filter.open")}</SelectItem>
                <SelectItem value="Busy">{t("filter.busy")}</SelectItem>
                <SelectItem value="Closed">{t("filter.closed")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>{t("filter.minRating")}</Label>
              <span className="text-sm font-mono text-primary">
                {draft.rating.toFixed(1)}★
              </span>
            </div>
            <Slider
              min={0}
              max={5}
              step={0.1}
              value={[draft.rating]}
              onValueChange={([v]) => setDraft({ ...draft, rating: v })}
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              const reset = {
                country: "any",
                city: "any",
                status: "any",
                rating: 0,
              };
              setDraft(reset);
              onApply(reset);
              setOpen(false);
            }}
          >
            {t("filter.reset")}
          </Button>
          <Button
            variant="hero"
            onClick={() => {
              onApply(draft);
              setOpen(false);
            }}
          >
            {t("filter.apply")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
