"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import {
  playerBookings,
  rewardHistory,
  availableRewards,
  playerReviews,
  tournamentList,
  type PlayerBooking,
} from "@/data/mock";
import {
  Pencil,
  Trophy,
  Coins,
  Calendar,
  Gamepad2,
  Star,
  Gift,
  ArrowRight,
  X,
} from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const Profile = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [selected, setSelected] = useState<PlayerBooking | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [bookingDraft, setBookingDraft] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [bookings, setBookings] = useState(playerBookings);
  const [profile, setProfile] = useState({
    name: "Omar Ahmed",
    email: "omar@gamersplat.io",
    phone: "+20 100 123 4567",
    city: "Cairo",
    bio: "Valorant duelist. Weekend grinder. Always up for a 5v5.",
  });
  const [draft, setDraft] = useState(profile);

  const points = 2480;
  const nextTier = 3000;

  const upcomingBookings = useMemo(
    () => bookings.filter((booking) => booking.status === "Upcoming"),
    [bookings],
  );

  const openEditBooking = (booking: PlayerBooking) => {
    setSelected(booking);
    setBookingDraft({ date: booking.date, time: booking.time.split(" – ")[0] });
  };

  const rescheduleBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected || !bookingDraft) return;
    setBookings((items) =>
      items.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              date: bookingDraft.date,
              time: `${bookingDraft.time} – ${bookingDraft.time}`,
            }
          : item,
      ),
    );
    setSelected(null);
    setBookingDraft(null);
    toast({
      title: "Booking updated",
      description: "Your booking time has been updated.",
    });
  };

  const cancelBooking = () => {
    if (!selected) return;
    setBookings((items) =>
      items.map((item) =>
        item.id === selected.id ? { ...item, status: "Cancelled" } : item,
      ),
    );
    setCancelOpen(false);
    setSelected(null);
    toast({
      title: "Booking cancelled",
      description: "The booking was cancelled and the slot was released.",
    });
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(draft);
    setEditOpen(false);
    toast({
      title: t("profile.toastUpdatedTitle"),
      description: t("profile.toastUpdatedDesc"),
    });
  };

  const redeem = (name: string, cost: number) => {
    if (cost > points) {
      toast({
        title: t("profile.toastNotEnoughTitle"),
        description: t("profile.toastNotEnoughDesc", { count: cost - points }),
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t("profile.toastRedeemedTitle"),
      description: t("profile.toastRedeemedDesc", { name }),
    });
  };

  return (
    <section className="container pt-24 md:pt-28 pb-16">
      <SectionHeader
        eyebrow={t("profile.eyebrow")}
        title={t("profile.title")}
        description={t("profile.description")}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Coins}
          label={t("profile.points")}
          value={points.toLocaleString()}
          hint={t("profile.pointsToGold", { count: nextTier - points })}
        />
        <StatCard
          Icon={Calendar}
          label={t("profile.sessions")}
          value={34}
          hint={t("profile.hoursBooked", { count: 78 })}
        />
        <StatCard
          Icon={Trophy}
          label={t("profile.tournamentWins")}
          value={12}
          hint={t("profile.outOfEntries", { count: 27 })}
        />
        <StatCard
          Icon={Gamepad2}
          label={t("profile.favouriteGame")}
          value="Valorant"
          hint={t("profile.sessionsPercent", { count: 41 })}
        />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="bg-gradient-surface border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="h-20 w-20 rounded-2xl bg-gradient-primary grid place-items-center font-display text-3xl font-bold text-primary-foreground shadow-glow">
              {profile.name.charAt(0)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDraft(profile);
                setEditOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" /> {t("profile.edit")}
            </Button>
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">
            {profile.name}
          </h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-sm text-muted-foreground">
            {profile.phone} · {profile.city}
          </p>
          <p className="mt-4 text-sm leading-relaxed">{profile.bio}</p>

          <div className="mt-6">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("profile.silverTier")}</span>
              <span>
                {points} / {nextTier}
              </span>
            </div>
            <Progress value={(points / nextTier) * 100} className="mt-2 h-2" />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-surface border border-border rounded-2xl p-6 lg:col-span-2">
          <Tabs defaultValue="bookings">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="bookings">
                {t("profile.tabBookings")}
              </TabsTrigger>
              <TabsTrigger value="rewards">
                {t("profile.tabRewards")}
              </TabsTrigger>
              <TabsTrigger value="tournaments">
                {t("profile.tabEvents")}
              </TabsTrigger>
              <TabsTrigger value="reviews">
                {t("profile.tabReviews")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-6">
              <ul className="divide-y divide-border">
                {bookings.map((b) => (
                  <li
                    key={b.id}
                    className="py-4 flex flex-wrap items-center gap-4"
                  >
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-semibold">{b.center}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {b.date} · {b.time}
                      </p>
                    </div>
                    <StatusBadge status={b.status} />
                    {b.status === "Upcoming" ? (
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(b)}
                        >
                          {t("profile.show")}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditBooking(b)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelected(b);
                            setCancelOpen(true);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelected(b)}
                      >
                        {t("profile.show")}
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="rewards" className="mt-6 space-y-6">
              <div>
                <h4 className="font-display font-semibold mb-3">
                  {t("profile.redeemPoints")}
                </h4>
                <ul className="grid sm:grid-cols-3 gap-3">
                  {availableRewards.map((r) => (
                    <li
                      key={r.id}
                      className="rounded-xl bg-surface-elevated p-4 flex flex-col"
                    >
                      <Gift className="h-4 w-4 text-primary" />
                      <p className="mt-2 text-sm font-semibold leading-tight">
                        {r.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground flex-1">
                        {r.desc}
                      </p>
                      <p className="mt-3 font-mono text-sm text-primary">
                        {r.cost} {t("profile.pts")}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={() => redeem(r.name, r.cost)}
                      >
                        {t("profile.redeem")}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-display font-semibold mb-3">
                  {t("profile.pointsHistory")}
                </h4>
                <ul className="divide-y divide-border">
                  {rewardHistory.map((h) => (
                    <li key={h.id} className="py-3 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {h.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {h.date}
                        </p>
                      </div>
                      <StatusBadge status={h.type} />
                      <span
                        className={`font-mono text-sm ${h.points > 0 ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {h.points > 0 ? "+" : ""}
                        {h.points}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="tournaments" className="mt-6">
              <ul className="divide-y divide-border">
                {tournamentList.slice(0, 3).map((t2) => (
                  <li
                    key={t2.id}
                    className="py-4 flex flex-wrap items-center gap-4"
                  >
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-semibold">{t2.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t2.date} · {t2.center}
                      </p>
                    </div>
                    <StatusBadge status={t2.status} />
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/tournaments/${t2.id}`}>
                        {t("profile.view")}{" "}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ul className="space-y-4">
                {playerReviews.map((r) => (
                  <li key={r.id} className="rounded-xl bg-surface-elevated p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{r.center}</p>
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-mono">{r.rating}.0</span>
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {r.text}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {r.date}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Booking details modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {selected?.center}
            </DialogTitle>
            <DialogDescription>
              {t("profile.bookingRef", {
                id: selected?.id.toUpperCase() ?? "",
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("profile.date")}</span>
              <span>{selected?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("profile.time")}</span>
              <span>{selected?.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("profile.setup")}
              </span>
              <span>{selected?.device}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {t("profile.status")}
              </span>
              {selected && <StatusBadge status={selected.status} />}
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-semibold">
              <span>{t("profile.total")}</span>
              <span className="text-primary font-mono">${selected?.total}</span>
            </div>
            {selected?.status === "Upcoming" && (
              <div className="grid gap-2 pt-2 sm:grid-cols-2">
                <Button
                  variant="outline"
                  onClick={() => openEditBooking(selected)}
                >
                  Edit booking
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCancelOpen(true);
                  }}
                >
                  Cancel booking
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!bookingDraft}
        onOpenChange={(open) => !open && setBookingDraft(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              Reschedule booking
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={rescheduleBooking} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="booking-date">Date</Label>
              <Input
                id="booking-date"
                type="date"
                value={bookingDraft?.date ?? ""}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setBookingDraft((prev) =>
                    prev ? { ...prev, date: e.target.value } : prev,
                  )
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="booking-time">Time</Label>
              <Input
                id="booking-time"
                type="time"
                value={bookingDraft?.time ?? ""}
                onChange={(e) =>
                  setBookingDraft((prev) =>
                    prev ? { ...prev, time: e.target.value } : prev,
                  )
                }
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setBookingDraft(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Cancel booking?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to cancel this booking?
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCancelOpen(false)}
            >
              Keep booking
            </Button>
            <Button type="button" variant="hero" onClick={cancelBooking}>
              Confirm cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit profile modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {t("profile.editProfile")}
            </DialogTitle>
            <DialogDescription>
              {t("profile.editProfileDesc")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pname">{t("profile.fullName")}</Label>
              <Input
                id="pname"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                required
                maxLength={60}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pemail">{t("profile.email")}</Label>
              <Input
                id="pemail"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                required
                maxLength={120}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="pphone">{t("profile.phone")}</Label>
                <Input
                  id="pphone"
                  type="tel"
                  value={draft.phone}
                  onChange={(e) =>
                    setDraft({ ...draft, phone: e.target.value })
                  }
                  maxLength={20}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pcity">{t("profile.city")}</Label>
                <Input
                  id="pcity"
                  value={draft.city}
                  onChange={(e) => setDraft({ ...draft, city: e.target.value })}
                  maxLength={40}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pbio">{t("profile.bio")}</Label>
              <Textarea
                id="pbio"
                rows={3}
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                maxLength={200}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
              >
                {t("profile.cancel")}
              </Button>
              <Button type="submit" variant="hero">
                {t("profile.saveChanges")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Profile;
