export type Lang = "en" | "ar";

/** A translation namespace: flat map of key -> { en, ar }. */
export type Namespace = Record<string, { en: string; ar: string }>;
