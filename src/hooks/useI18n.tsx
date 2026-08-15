"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translate, translations, languages, type Lang } from "@/i18n";

export type { Lang };
export { languages };

/** @deprecated import from "@/i18n" instead — kept for backwards compatibility. */
export const dict = translations;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** t("some.key") — optional {vars} interpolation and English fallback text. */
  t: (
    key: string,
    vars?: Record<string, string | number>,
    fallback?: string,
  ) => string;
  dir: "ltr" | "rtl";
  isRTL: boolean;
};

const I18nContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
  isRTL: false,
});

const STORAGE_KEY = "gamersplat.lang";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? ((window.localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "en")
        : "en";
    setLangState(saved);
    setHydrated(true);
  }, []);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir, hydrated]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>, fallback?: string) =>
      translate(lang, key, vars, fallback),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t, dir, isRTL: dir === "rtl" }),
    [lang, setLang, t, dir],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
