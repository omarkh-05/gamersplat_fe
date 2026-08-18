"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Gamepad2, ArrowRight, Building2, User } from "lucide-react";
import heroImg from "@/assets/images/hero.jpg";
import { useToast } from "@/hooks/use-toast";
import { useRole, type Role } from "@/hooks/useRole";
import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/useI18n";

type Account = "player" | "owner";

const LoginContent = () => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(
    searchParams.get("tab") === "signup" ? "signup" : "login",
  );
  const [account, setAccount] = useState<Account>("owner");
  const router = useRouter();
  const { toast } = useToast();
  const { setRole } = useRole();
  const { t } = useI18n();

  const go = (role: Role, path: string, title: string) => {
    setRole(role);
    toast({ title, description: t("login.demoAuthDesc") });
    router.push(path);
  };

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (
      new FormData(e.target as HTMLFormElement).get("email")?.toString() ?? ""
    ).toLowerCase();

    if (email.startsWith("admin")) {
      return go("owner", "/owner", t("login.toastWelcomeAdmin"));
    }

    return go("owner", "/owner", t("login.toastWelcomeOwner"));
  };

  const onSignup = (e: React.FormEvent) => {
    e.preventDefault();
    return go("owner", "/owner", t("signup.toastOwnerCreated"));
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src={heroImg.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/90" />
        <div className="relative h-full flex flex-col justify-between p-12">
          <Link href="/" className="inline-flex items-center gap-2 w-fit">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-primary">
              <Gamepad2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              Gamers<span className="text-primary">Plat</span>
            </span>
          </Link>
          <div className="max-w-md">
            <h2 className="font-display text-4xl font-bold leading-tight">
              {t("login.tagline1")}{" "}
              <span className="text-gradient">{t("login.tagline2")}</span>
            </h2>
            <p className="mt-4 text-muted-foreground">{t("login.heroText")}</p>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            {t("login.copyright")}
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12 pt-24">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-2 mb-8"
          >
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-gradient-primary">
              <Gamepad2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              Gamers<span className="text-primary">Plat</span>
            </span>
          </Link>
          <h1 className="font-display text-3xl font-bold">
            {tab === "login"
              ? t("login.welcomeBack")
              : t("login.createAccount")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {tab === "login"
              ? t("login.signInSubtitle")
              : t("login.signupSubtitle")}
          </p>

          <Tabs value={tab} onValueChange={setTab} className="mt-8">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">{t("login.tabLogin")}</TabsTrigger>
              <TabsTrigger value="signup">{t("login.tabSignup")}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4 mt-6">
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t("login.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("login.emailPlaceholder")}
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label htmlFor="pass">{t("login.password")}</Label>
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline"
                    >
                      {t("login.forgot")}
                    </button>
                  </div>
                  <Input
                    id="pass"
                    type="password"
                    required
                    placeholder="••••••••"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {t("login.signIn")} <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {t("login.demoHint").split("{owner}")[0]}
                  <span className="font-mono text-primary">owner@…</span>
                  {t("login.demoHint").split("{owner}")[1]?.split("{admin}")[0]}
                  <span className="font-mono text-primary">admin@…</span>
                  {t("login.demoHint").split("{admin}")[1]}
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={onSignup} className="space-y-4 mt-6">
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium mb-2">
                    {t("signup.joiningAs")}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      {
                        key: "player" as const,
                        Icon: User,
                        label: t("signup.player"),
                        hint: t("signup.playerHint"),
                      },
                      {
                        key: "owner" as const,
                        Icon: Building2,
                        label: t("signup.owner"),
                        hint: t("signup.ownerHint"),
                      },
                    ].map(({ key, Icon, label, hint }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setAccount(key)}
                        aria-pressed={account === key}
                        className={cn(
                          "rounded-xl border p-3 text-start transition-colors",
                          account === key
                            ? "border-primary bg-primary/10"
                            : "border-border bg-surface-elevated hover:border-primary/40",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4 mb-2",
                            account === key
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                        <p className="text-sm font-semibold leading-tight">
                          {label}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {hint}
                        </p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-1.5">
                  <Label htmlFor="name">
                    {account === "owner"
                      ? t("signup.ownerFullName")
                      : t("signup.fullName")}
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder={t("signup.namePlaceholder")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email2">{t("login.email")}</Label>
                  <Input
                    id="email2"
                    type="email"
                    required
                    placeholder={t("login.emailPlaceholder")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{t("signup.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder={t("signup.phonePlaceholder")}
                  />
                </div>

                {account === "owner" && (
                  <div className="space-y-4 rounded-xl border border-border bg-surface-elevated p-4 animate-fade-in">
                    <p className="text-xs font-mono uppercase tracking-wider text-primary">
                      {t("signup.centerDetails")}
                    </p>
                    <div className="space-y-1.5">
                      <Label htmlFor="centerName">
                        {t("signup.centerName")}
                      </Label>
                      <Input
                        id="centerName"
                        required
                        placeholder={t("signup.centerNamePlaceholder")}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="city">{t("signup.city")}</Label>
                        <Input
                          id="city"
                          required
                          placeholder={t("signup.cityPlaceholder")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="country">{t("signup.country")}</Label>
                        <Input
                          id="country"
                          required
                          placeholder={t("signup.countryPlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="about">{t("signup.aboutCenter")}</Label>
                      <Textarea
                        id="about"
                        rows={3}
                        placeholder={t("signup.aboutPlaceholder")}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {t("signup.reviewNotice")}
                    </p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="pass2">{t("signup.password")}</Label>
                  <Input
                    id="pass2"
                    type="password"
                    required
                    placeholder={t("signup.passwordHint")}
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {account === "owner"
                    ? t("signup.createOwnerAccount")
                    : t("signup.createPlayerAccount")}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-xs text-center text-muted-foreground">
            {t("login.agreeTerms")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginContent />
    </Suspense>
  );
}
