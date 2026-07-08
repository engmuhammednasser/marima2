import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, PackageOpen, Ruler, Truck } from "lucide-react";
import type { Locale } from "@/types/shop";
import { banners, copy } from "@/data/siteContent";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function HomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const icons = [Truck, PackageOpen, BadgeCheck, Ruler];

  return (
    <main>
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

      <div className="trust">
        {c.trust.map((item, index) => {
          const Icon = icons[index];
          return <div className="trustItem" key={item}><Icon size={20} /> <span>{item}</span></div>;
        })}
      </div>

      <section className="section" id="products">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">UNFOLDED SS26</div>
              <h2>{c.featured}</h2>
            </div>
          </div>
          <div className="grid">
            {products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid">
          {banners.slice(1).map((banner, index) => (
            <div className="productImage" key={banner} style={{ aspectRatio: index === 1 ? "4 / 3" : "4 / 5" }}>
              <Image src={banner} alt={`Mariam Fathy campaign ${index + 2}`} fill sizes="(min-width: 760px) 33vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
