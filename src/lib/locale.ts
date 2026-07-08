import type { Locale } from "@/types/shop";

export const locales: Locale[] = ["ar", "en"];

export function isLocale(value: string): value is Locale {
  return value === "ar" || value === "en";
}

export function localized(locale: Locale, ar: string, en: string) {
  return locale === "ar" ? ar : en;
}

export function formatPrice(value: number) {
  return `${value.toLocaleString("en-US")} EGP`;
}
