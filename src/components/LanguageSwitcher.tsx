import Link from "next/link";
import type { Locale } from "@/types/shop";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <Link className="langButton" href={`/${nextLocale}`} aria-label="Switch language">
      {nextLocale.toUpperCase()}
    </Link>
  );
}
