import type { Locale, Product } from "@/types/shop";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({ products, locale }: { products: Product[]; locale: Locale }) {
  return (
    <div className="grid">
      {products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
    </div>
  );
}
