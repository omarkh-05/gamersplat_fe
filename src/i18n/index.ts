import type { Lang, Namespace } from "./types";
import { common } from "./locales/common";
import { nav } from "./locales/nav";
import { pages } from "./locales/pages";
import { account } from "./locales/account";
import { owner } from "./locales/owner";
import { admin } from "./locales/admin";

export type { Lang, Namespace };

/** Merged translation catalog. Keys are namespaced by prefix (nav.*, common.*, …). */
export const translations: Namespace = {
  ...common,
  ...nav,
  ...pages,
  ...account,
  ...owner,
  ...admin,
};

export const languages: { value: Lang; label: string; short: string }[] = [
  { value: "en", label: "English", short: "EN" },
  { value: "ar", label: "العربية", short: "AR" },
];

/**
 * Translate a key. Falls back to `fallback`, then to the key itself.
 * Supports {placeholder} interpolation via `vars`.
 */
export const translate = (
  lang: Lang,
  key: string,
  vars?: Record<string, string | number>,
  fallback?: string,
): string => {
  let out = translations[key]?.[lang] ?? fallback ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.split(`{${k}}`).join(String(v));
    }
  }
  return out;
};
