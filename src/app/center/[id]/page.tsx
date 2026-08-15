"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Clock,
  ChevronRight,
  Trophy,
  Zap,
  Tag,
  Users,
  Check,
  Wifi,
  Sofa,
  Snowflake,
  Crown,
  Lock,
  Car,
  Coffee,
} from "lucide-react";
import {
  centers,
  devices,
  tournaments,
  sessions,
  offers,
  centerFeatures,
  centerHighlights,
  centerServices,
} from "@/data/mock";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gradient-surface border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors ${className}`}
  >
    {children}
  </div>
);

const DeviceRow = ({ d, mode, onAdd }: any) => {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0">
      <div className="min-w-0">
        <p className="font-semibold truncate">{d.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {d.type} · {d.qty} {t("centerDetails.device.available")} · {mode}
        </p>
      </div>
      <div className="text-end shrink-0">
        <p className="font-mono font-semibold text-primary">
          ${d.pricePerHour}
          <span className="text-xs text-muted-foreground">
            {t("centerDetails.device.perHour")}
          </span>
        </p>
      </div>
      <Button size="sm" variant="outline" onClick={onAdd}>
        {t("centerDetails.book")}
      </Button>
    </div>
  );
};

const SectionDevices = ({
  title,
  items,
  kind,
}: {
  title: string;
  items: typeof devices;
  kind: "VIP" | "Normal";
}) => {
  const { t } = useI18n();
  const modes = [
    t("centerDetails.mode.solo"),
    t("centerDetails.mode.duo"),
    t("centerDetails.mode.group"),
  ];
  const [mode, setMode] = useState<string>(modes[0]);
  return (
    <Card>
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <span
            className={`h-9 w-9 grid place-items-center rounded-xl ${kind === "VIP" ? "bg-secondary/20 text-secondary" : "bg-primary/15 text-primary"}`}
          >
            {kind === "VIP" ? (
              <Trophy className="h-4 w-4" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
          </span>
          <h3 className="font-display text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex gap-1 p-1 rounded-full bg-muted text-xs">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-full transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-border">
        {items.map((d) => (
          <DeviceRow key={d.id} d={d} mode={mode} />
        ))}
      </div>
    </Card>
  );
};

const featureIcons: Record<string, typeof Wifi> = {
  internet: Wifi,
  lounge: Sofa,
  climate: Snowflake,
  vip: Crown,
  storage: Lock,
  parking: Car,
  cafeteria: Coffee,
};

const CenterDetails = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { t } = useI18n();
  const center = centers.find((c) => c.id === id) ?? centers[0];
  const configuredServices = centerServices[center.id] ?? [];
  const features =
    configuredServices.length > 0
      ? configuredServices.map((service) => ({
          key: service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          label: service.name,
          Icon: featureIcons[service.icon] ?? Zap,
        }))
      : (
          centerFeatures[center.id] ?? [
            "internet",
            "lounge",
            "climate",
            "cafeteria",
          ]
        ).map((key) => ({
          key,
          label: t(`centerDetails.feature.${key}`),
          Icon: featureIcons[key] ?? Zap,
        }));
  const highlights = centerHighlights[center.id] ?? [];
  const gallery = [center, ...centers.filter((c) => c.id !== center.id)].slice(
    0,
    3,
  );

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [id]);

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={center.image}
          alt={center.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="container relative h-full flex flex-col justify-end pb-12 pt-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4"
          >
            <ChevronRight className="h-3 w-3 rotate-180 rtl:rotate-0" />{" "}
            {t("centerDetails.backToCenters")}
          </Link>
          <span className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
            {center.tag}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            {center.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {center.city}, {center.country}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {center.rating} ({center.reviews})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {t("centerDetails.openHours")}
            </span>
          </div>
        </div>
      </section>

      <section className="container py-16 space-y-12">
        {/* About + Gallery */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <h2 className="font-display text-2xl font-semibold mb-3">
                {t("centerDetails.about")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {center.description}
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                    {t("centerDetails.keyFeatures")}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {features.slice(0, 4).map((f) => (
                      <li key={f.key} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0" />{" "}
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                    {t("centerDetails.resourceHighlights")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-full bg-surface-elevated border border-border text-xs"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Facilities & services feature cards */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                {t("centerDetails.facilities")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {features.map(({ key, label, Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 rounded-2xl bg-gradient-surface border border-border p-4 hover:border-primary/30 transition-colors"
                  >
                    <span className="h-9 w-9 grid place-items-center rounded-xl bg-primary/15 text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={t("centerDetails.gallery.eyebrow")}
              title={t("centerDetails.gallery.title")}
            />
            <div className="mt-6 space-y-3">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden group border border-border">
                <img
                  src={gallery[0].image}
                  alt={gallery[0].name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {gallery.slice(1, 3).map((c) => (
                  <div
                    key={c.id}
                    className="aspect-[4/3] rounded-2xl overflow-hidden group border border-border"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Programs grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-9 w-9 grid place-items-center rounded-xl bg-secondary/20 text-secondary">
                <Trophy className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                {t("centerDetails.tournaments")}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {tournaments.map((tItem) => (
                <div
                  key={tItem.id}
                  className="flex items-center justify-between py-4 first:pt-0"
                >
                  <div>
                    <p className="font-semibold">{tItem.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("centerDetails.tournaments.prizeSlots", {
                        prize: tItem.prize,
                        slots: tItem.slots,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-primary">
                      ${tItem.entry}
                    </span>
                    <Button size="sm" variant="hero">
                      {t("centerDetails.join")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-9 w-9 grid place-items-center rounded-xl bg-primary/15 text-primary">
                <Users className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                {t("centerDetails.sessions")}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-4 first:pt-0"
                >
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("centerDetails.sessions.joined", { count: s.players })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-primary">${s.price}</span>
                    <Button size="sm" variant="outline">
                      {t("centerDetails.join")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-9 w-9 grid place-items-center rounded-xl bg-accent/20 text-accent">
                <Tag className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                {t("centerDetails.offers")}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {offers.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated border border-border"
                >
                  <div>
                    <p className="font-semibold">{o.name}</p>
                    <p className="text-xs text-primary mt-0.5">{o.discount}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-primary">${o.price}</span>
                    <Button size="sm" variant="outline">
                      {t("centerDetails.offers.get")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <SectionDevices
          title={t("centerDetails.section.vip")}
          items={devices.filter((d) => d.section === "VIP")}
          kind="VIP"
        />
        <SectionDevices
          title={t("centerDetails.section.normal")}
          items={devices.filter((d) => d.section === "Normal")}
          kind="Normal"
        />

        <div className="flex justify-end">
          <Button
            size="xl"
            variant="hero"
            onClick={() => router.push("/booking")}
          >
            {t("centerDetails.continueBooking")}{" "}
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default CenterDetails;
