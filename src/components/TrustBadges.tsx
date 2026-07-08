import { BadgeCheck, PackageOpen, Ruler, Truck } from "lucide-react";
import type { Locale } from "@/types/shop";
import { copy } from "@/data/siteContent";

export function TrustBadges({ locale }: { locale: Locale }) {
  const icons = [Truck, PackageOpen, BadgeCheck, Ruler];

  return (
    <div className="trust">
      {copy[locale].trust.map((item, index) => {
        const Icon = icons[index];
        return <div className="trustItem" key={item}><Icon size={20} /> <span>{item}</span></div>;
      })}
    </div>
  );
}
