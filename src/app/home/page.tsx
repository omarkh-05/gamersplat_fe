"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, Trophy, Users, Zap } from "lucide-react";
import heroImg from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CenterCard } from "@/components/CenterCard";
import { CenterCardSkeleton } from "@/components/Skeletons";
import { FilterModal, type Filters } from "@/components/FilterModal";
import { SectionHeader } from "@/components/SectionHeader";
import { centers as ALL } from "@/data/mock";
import { useI18n } from "@/hooks/useI18n";

const PAGE_SIZE = 6;

const Home = () => {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    country: "any",
    city: "any",
    status: "any",
    rating: 0,
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return ALL.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (filters.country !== "any" && c.country !== filters.country)
        return false;
      if (filters.city !== "any" && c.city !== filters.city) return false;
      if (filters.status !== "any" && c.status !== filters.status) return false;
      if (c.rating < filters.rating) return false;
      return true;
    });
  }, [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={heroImg.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full glass mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("home.hero.badge")}
            </span>
            <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight">
              {t("home.hero.title")}{" "}
              <span className="text-gradient">GamersPlat</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="xl" variant="hero" asChild>
                <a href="#centers">
                  {t("home.hero.bookNow")} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="xl" variant="glass" asChild>
                <Link href="/login">{t("home.hero.login")}</Link>
              </Button>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { Icon: Users, k: "12K+", v: t("home.stats.gamers") },
                { Icon: Trophy, k: "320+", v: t("home.stats.tournaments") },
                { Icon: Zap, k: "180+", v: t("home.stats.centers") },
              ].map(({ Icon, k, v }) => (
                <div key={v}>
                  <Icon className="h-5 w-5 text-primary mb-2" />
                  <dt className="font-display text-2xl font-bold">{k}</dt>
                  <dd className="text-xs text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CENTERS */}
      <section id="centers" className="container py-20 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow={t("home.centers.eyebrow")}
            title={t("home.centers.title")}
            description={t("home.centers.description")}
          />
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("home.centers.searchPlaceholder")}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="ps-10 h-11 rounded-full bg-surface border-border"
                aria-label={t("home.centers.searchAria")}
              />
            </div>
            <FilterModal
              filters={filters}
              onApply={(f) => {
                setFilters(f);
                setPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CenterCardSkeleton key={i} />
            ))}
          </div>
        ) : paged.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl">
            <p className="font-display text-xl mb-1">
              {t("home.centers.empty.title")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("home.centers.empty.description")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((c, i) => (
              <div
                key={c.id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-fade-up"
              >
                <CenterCard center={c} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t("home.pagination.prev")}
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                size="sm"
                variant={page === i + 1 ? "hero" : "ghost"}
                className="w-9 h-9 p-0"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              {t("home.pagination.next")}
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
