import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/shop";
import { banners, copy } from "@/data/siteContent";

export function HeroSection({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <section className="hero">
      <div className="heroMedia">
        <Image src={banners[0]} alt={c.heroTitle} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="heroCopy">
        <div className="eyebrow">Mariam Fathy Shop</div>
        <h1>{c.heroTitle}</h1>
        <p>{c.heroText}</p>
        <Link className="button gold" href="#products">{c.shopNow}</Link>
      </div>
    </section>
  );
}
