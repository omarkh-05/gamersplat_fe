"use client";

import Link from "next/link";
import { Gamepad2, Globe, Sparkles } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary">
              <Gamepad2
                className="h-5 w-5 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display font-bold text-lg">
              Gamers<span className="text-primary">Plat</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 flex gap-2">
            {[Globe, Sparkles, Gamepad2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={t("footer.social")}
                className="h-9 w-9 grid place-items-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4">
            {t("footer.quickLinks")}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">
                {t("nav.centers")}
              </Link>
            </li>
            <li>
              <Link href="/tournaments" className="hover:text-primary">
                {t("nav.tournaments")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                {t("nav.about")}
              </Link>
            </li>
            {/*
            <li>
              <Link href="/profile" className="hover:text-primary">
                {t("nav.myProfile")}
              </Link>
            </li>
            */}
            <li>
              <Link href="/login" className="hover:text-primary">
                {t("nav.login")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4">
            {t("footer.about")}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("footer.aboutText")}
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} GamersPlat. {t("footer.rights")}
          </p>
          <p className="font-mono">
            {t("footer.madeBy")} <span className="text-primary">Omar/Bahaa</span> —{" "}
            {t("footer.enjoy")}
          </p>
        </div>
      </div>
    </footer>
  );
};
