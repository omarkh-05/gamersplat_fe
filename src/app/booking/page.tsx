"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/SectionHeader";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/hooks/useI18n";

type Item = {
  id: string;
  name: string;
  type: string;
  price: number;
  qty: number;
};

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

const Booking = () => {
  const { t } = useI18n();
  const router = useRouter();
  const { toast } = useToast();

  const initial: Item[] = [
    {
      id: "d1",
      name: `PS5 Pro · 2 ${t("booking.hoursUnit")}`,
      type: t("booking.deviceType"),
      price: 60,
      qty: 2,
    },
    {
      id: "t1",
      name: "Valorant Open Cup",
      type: t("booking.tournamentType"),
      price: 25,
      qty: 1,
    },
    {
      id: "s1",
      name: "5v5 Apex Night",
      type: t("booking.sessionType"),
      price: 30,
      qty: 1,
    },
  ];

  const [items, setItems] = useState<Item[]>(initial);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const next = new Date();
    next.setHours(0, 0, 0, 0);
    next.setDate(next.getDate() + 1);
    return next;
  });
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const summaryDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const updateQty = (id: string, delta: number) =>
    setItems((arr) =>
      arr.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );

  const remove = (id: string) =>
    setItems((arr) => arr.filter((item) => item.id !== id));

  const onConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    setConfirmed(true);
    toast({
      title: t("booking.toastConfirmedTitle"),
      description: t("booking.toastConfirmedDesc"),
    });
    setTimeout(() => router.push("/profile"), 1400);
  };

  return (
    <section className="container pt-24 pb-16 md:pt-28">
      <SectionHeader
        eyebrow={t("booking.eyebrow")}
        title={t("booking.title")}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-border bg-gradient-surface p-4 sm:p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">
            {t("booking.yourSelection")}
          </h3>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
              {t("booking.noItems")}
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center gap-3 py-4 sm:gap-4"
                >
                  <div className="min-w-0 w-full sm:flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-muted p-1">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      className="grid h-7 w-7 place-items-center rounded-full hover:bg-background"
                      aria-label={t("booking.decrease")}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      className="grid h-7 w-7 place-items-center rounded-full hover:bg-background"
                      aria-label={t("booking.increase")}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <span className="font-mono ms-auto text-end sm:ms-0 sm:w-20">
                    ${item.price * item.qty}
                  </span>

                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="p-2 text-muted-foreground transition-colors hover:text-destructive"
                    aria-label={t("booking.remove")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Booking date</Label>
              <div className="rounded-md border border-input bg-background p-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="mx-auto w-full"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Booking time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <form
          onSubmit={onConfirm}
          className="h-fit space-y-5 rounded-2xl border border-border bg-gradient-surface p-4 sm:p-6 lg:sticky lg:top-24"
        >
          <h3 className="font-display text-lg font-semibold">
            {t("booking.yourDetails")}
          </h3>

          <div className="space-y-1.5">
            <Label htmlFor="name">{t("booking.fullName")}</Label>
            <Input id="name" required placeholder="Omar Ahmed" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">{t("booking.email")}</Label>
            <Input
              id="email"
              required
              type="email"
              placeholder="you@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">{t("booking.phone")}</Label>
            <Input id="phone" required placeholder="+20 100 000 0000" />
          </div>

          <div className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{t("booking.items")}</span>
              <span>{items.length}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>{t("booking.serviceFee")}</span>
              <span>$0</span>
            </div>
            {selectedDate && selectedTime ? (
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Booking</span>
                <span className="text-right">
                  {summaryDate}
                  <br />
                  {selectedTime}
                </span>
              </div>
            ) : null}
            <div className="flex items-center justify-between pt-2 text-base font-semibold">
              <span>{t("booking.total")}</span>
              <span className="font-mono text-primary">${total}</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={
              confirmed || items.length === 0 || !selectedDate || !selectedTime
            }
          >
            {confirmed ? (
              <>
                <Check className="h-4 w-4" />
                {t("booking.confirmed")}
              </>
            ) : (
              t("booking.confirmBooking")
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
