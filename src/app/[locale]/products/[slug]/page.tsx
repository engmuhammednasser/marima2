import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/data/products";
import type { Locale } from "@/types/shop";

export function generateStaticParams() {
  return products.flatMap((product) => [{ locale: "ar", slug: product.slug }, { locale: "en", slug: product.slug }]);
}

export default function ProductPage({ params }: { params: { locale: Locale; slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale={params.locale} />;
}
