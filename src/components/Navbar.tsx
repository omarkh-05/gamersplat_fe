"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Gamepad2,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRole, type Role } from "@/hooks/useRole";
import { useI18n, languages } from "@/hooks/useI18n";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { role, signOut } = useRole();
  const { t, lang, setLang } = useI18n();

  const publicLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/tournaments", label: t("nav.tournaments") },
    { to: "/about", label: t("nav.about") },
    { to: "/contactUs", label: "Contact Us" },
  ];

  const roleLinks: Record<Role, { to: string; label: string }[]> = {
    guest: publicLinks,
    owner: publicLinks,
    player: publicLinks,
    admin: publicLinks,
  };
  const roleHome: Record<Role, string> = {
    guest: "/login",
    owner: "/owner",
    // Hidden from the dashboard role switcher in the web UI.
    // player: "/profile",
    // admin: "/admin",
    player: "",
    admin: "",
  };

  const roleLabel: Record<Role, string> = {
    guest: t("role.guest", {}, "Guest"),
    owner: t("role.owner", {}, "Center Owner"),
    player: t("role.player", {}, "Player"),
    admin: t("role.admin", {}, "Administrator"),
  };

  const links = roleLinks[role];
  const otherLang = languages.find((l) => l.value !== lang) ?? languages[0];
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    router.push("/");
  };

  if (isLoginPage) return null;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/65 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent",
      )}
    >
      <nav
        dir="ltr"
        className="container flex h-16 items-center justify-between gap-3"
        aria-label={t("nav.main")}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-105 transition-transform">
            <Gamepad2
              className="h-5 w-5 text-primary-foreground"
              strokeWidth={2.5}
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Gamers<span className="text-primary">Plat</span>
          </span>
        </Link>

        <ul className="hidden md:flex flex-1 items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                href={l.to}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  pathname === l.to ||
                    (l.to !== "/" && pathname.startsWith(l.to))
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {role === "guest" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                aria-label={t("nav.language")}
                onClick={() => setLang(otherLang.value)}
              >
                <Languages className="h-4 w-4" /> {otherLang.short}
              </Button>
              <Button asChild size="sm" variant="hero">
                <Link href="/login?tab=signup">Join Us</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="h-6 w-6 rounded-lg bg-gradient-primary grid place-items-center text-[11px] font-bold text-primary-foreground">
                    O
                  </span>
                  {roleLabel[role]}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {t("nav.signedInAs")} {roleLabel[role]}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(roleHome[role])}>
                  <LayoutDashboard className="h-4 w-4" /> {t("nav.myDashboard")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang(otherLang.value)}>
                  <Languages className="h-4 w-4" /> {otherLang.short}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" /> {t("nav.signout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          dir="ltr"
          className="md:hidden glass border-t border-border animate-fade-in"
        >
          <ul className="container py-4 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-lg text-sm font-medium",
                    pathname === l.to ||
                      (l.to !== "/" && pathname.startsWith(l.to))
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-muted",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex gap-2">
              {role === "guest" ? (
                <>
                  <Button asChild variant="hero" className="flex-1">
                    <Link href="/login?tab=signup">Join Us</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/owner" onClick={() => setOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" />{" "}
                      {t("nav.myDashboard")}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="h-4 w-4" /> {t("nav.signout")}
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
