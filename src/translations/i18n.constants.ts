export const TAB_BAR_NS = "tabBar";
export const AUTH_NS = "auth";

export const supportedLngs = ["it"] as const;

export type SupportedLanguages = (typeof supportedLngs)[number];

export const FALLBACK_LNG = "it";
export const namespaces = [TAB_BAR_NS, AUTH_NS];
