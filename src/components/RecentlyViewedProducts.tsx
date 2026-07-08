"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale, Product } from "@/types/shop";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const storageKey = "mariam-recent-products";

export function RecentlyViewedProducts({ currentProduct, locale }: { currentProduct: Product; locale: Locale }) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const previous = stored ? (JSON.parse(stored) as string[]) : [];
    const next = [currentProduct.id, ...previous.filter((id) => id !== currentProduct.id)].slice(0, 4);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setRecentIds(next);
  }, [currentProduct.id]);

  const recentProducts = useMemo(() => {
    return recentIds
      .filter((id) => id !== currentProduct.id)
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));
  }, [currentProduct.id, recentIds]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="sectionHead">
          <h2>{locale === "ar" ? "شوفتِ مؤخراً" : "Recently viewed"}</h2>
        </div>
        <div className="grid compactGrid">
          {recentProducts.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}
        </div>
      </div>
    </section>
  );
}
