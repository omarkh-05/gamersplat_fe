"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import {
  Gamepad2,
  Users,
  Trophy,
  Building2,
  Target,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/images/hero.jpg";
import { useI18n } from "@/hooks/useI18n";

const About = () => {
  const { t } = useI18n();

  const values = [
    {
      Icon: Target,
      title: t("about.value.playerFirst.title"),
      text: t("about.value.playerFirst.text"),
    },
    {
      Icon: HeartHandshake,
      title: t("about.value.fairOwners.title"),
      text: t("about.value.fairOwners.text"),
    },
    {
      Icon: ShieldCheck,
      title: t("about.value.safe.title"),
      text: t("about.value.safe.text"),
    },
    {
      Icon: Rocket,
      title: t("about.value.esports.title"),
      text: t("about.value.esports.text"),
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: t("about.timeline.2024.title"),
      text: t("about.timeline.2024.text"),
    },
    {
      year: "2025",
      title: t("about.timeline.2025.title"),
      text: t("about.timeline.2025.text"),
    },
    {
      year: "2026",
      title: t("about.timeline.2026.title"),
      text: t("about.timeline.2026.text"),
    },
  ];

  return (
    <>
      <section className="relative pt-28 pb-16 overflow-hidden">
        <img
          src={heroImg.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="container relative">
          <SectionHeader
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            description={t("about.description")}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link href="/">
                {t("about.exploreCenters")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login?tab=signup">{t("about.listCenter")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            Icon={Building2}
            label={t("about.stats.centers")}
            value="180+"
            hint={t("about.stats.centersHint")}
          />
          <StatCard
            Icon={Users}
            label={t("about.stats.players")}
            value="42k"
            hint={t("about.stats.playersHint")}
          />
          <StatCard
            Icon={Trophy}
            label={t("about.stats.tournaments")}
            value="1,200"
            hint={t("about.stats.tournamentsHint")}
          />
          <StatCard
            Icon={Gamepad2}
            label={t("about.stats.sessions")}
            value="310k"
            hint={t("about.stats.sessionsHint")}
          />
        </div>
      </section>

      <section className="container pb-16">
        <SectionHeader
          eyebrow={t("about.mission.eyebrow")}
          title={t("about.mission.title")}
          description={t("about.mission.description")}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {values.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="bg-gradient-surface border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/15 grid place-items-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <SectionHeader
          eyebrow={t("about.journey.eyebrow")}
          title={t("about.journey.title")}
        />
        <ol className="mt-8 relative border-s border-border ps-6 space-y-8">
          {timeline.map((tl) => (
            <li key={tl.year} className="relative">
              <span
                className="absolute -start-[31px] top-1 h-3 w-3 rounded-full bg-primary shadow-glow"
                aria-hidden
              />
              <p className="font-mono text-xs uppercase tracking-wider text-primary">
                {tl.year}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                {tl.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {tl.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-4">
        <div className="bg-gradient-surface border border-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            {t("about.cta.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t("about.cta.description")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link href="/login?tab=signup">{t("about.cta.getStarted")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tournaments">
                {t("about.cta.browseTournaments")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
