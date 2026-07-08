import Image from "next/image";
import type { Locale } from "@/types/shop";
import { banners, copy } from "@/data/siteContent";
import { products } from "@/data/products";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewCard } from "@/components/ReviewCard";
import { FAQ } from "@/components/FAQ";

export function HomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];

  return (
    <main>
      <HeroSection locale={locale} />

      <TrustBadges locale={locale} />

      <section className="section" id="products">
        <div className="container">
          <div className="sectionHead">
            <div>
              <div className="eyebrow">UNFOLDED SS26</div>
              <h2>{c.featured}</h2>
            </div>
          </div>
          <ProductGrid products={products} locale={locale} />
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

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <h2>{locale === "ar" ? "آراء العميلات" : "Customer reviews"}</h2>
          </div>
          <div className="reviewGrid">
            <ReviewCard text="القماش ناعم جداً والمقاس جه تمام. طولي 163 واخدت M وكان مثالي." author="NOUR M. · Egypt" />
            <ReviewCard text="The fabric quality is exceptional. Worth every penny. Will order again." author="SARA K. · Egypt" />
            <ReviewCard text="اللون جه أجمل من الصور. الشحن كان سريع وجاي في باكيدج أنيق." author="DINA H. · Egypt" stars="★★★★☆" />
          </div>
        </div>
      </section>

      <FAQ locale={locale} />
    </main>
  );
}
