import type { Locale } from "@/types/shop";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";

export function ShopPage({ locale }: { locale: Locale }) {
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <main>
      <section className="shopHero">
        <div className="container shopHeroInner">
          <div>
            <div className="eyebrow">UNFOLDED SS26</div>
            <h1>{locale === "ar" ? "المجموعة الكاملة" : "The Full Collection"}</h1>
            <p>
              {locale === "ar"
                ? "كل القطع المتاحة من مريم فتحي شوب في مكان واحد، بنفس الأسعار والبيانات الموجودة في التصميم المرجعي."
                : "All available Mariam Fathy Shop pieces in one focused collection page, using the same verified product data from the reference design."}
            </p>
          </div>
          <div className="shopStats">
            <strong>{products.length}</strong>
            <span>{locale === "ar" ? "قطع متاحة" : "available pieces"}</span>
          </div>
        </div>
      </section>

      <section className="section productsSection">
        <div className="container">
          <div className="shopToolbar" aria-label={locale === "ar" ? "تصنيفات المجموعة" : "Collection categories"}>
            <span className="shopChip active">{locale === "ar" ? "الكل" : "All"}</span>
            {categories.map((category) => <span className="shopChip" key={category}>{category}</span>)}
          </div>
          <ProductGrid products={products} locale={locale} />
        </div>
      </section>
    </main>
  );
}
