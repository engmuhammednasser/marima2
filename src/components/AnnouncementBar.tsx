import type { Locale } from "@/types/shop";
import { copy } from "@/data/siteContent";

export function AnnouncementBar({ locale }: { locale: Locale }) {
  return <div className="announcement">{copy[locale].announcement}</div>;
}
