"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Locale, Product } from "@/types/shop";
import { copy } from "@/data/siteContent";
import { formatPrice } from "@/lib/locale";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  return (
    <article className="productCard">
      <Link href={`/${locale}/products/${product.slug}`} aria-label={locale === "ar" ? product.nameAr : product.nameEn}>
        <div className="productImage">
          <Image src={product.images[0]} alt={locale === "ar" ? product.nameAr : product.nameEn} fill sizes="(min-width: 760px) 33vw, 50vw" style={{ objectFit: "cover" }} />
          {(product.badgeAr || product.badgeEn) && <span className="badge">{locale === "ar" ? product.badgeAr : product.badgeEn}</span>}
        </div>
      </Link>
      <div className="productInfo">
        <h3>{locale === "ar" ? product.nameAr : product.nameEn}</h3>
        <div className="benefit">{locale === "ar" ? product.shortBenefitAr : product.shortBenefitEn}</div>
        <div className="swatches" aria-label="Colors">
          {product.colors.map((color) => <span className="swatch" key={color.id} style={{ background: color.value }} title={locale === "ar" ? color.nameAr : color.nameEn} />)}
        </div>
        <div className="priceRow">
          <span className="price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span className="oldPrice">{formatPrice(product.compareAtPrice)}</span>}
        </div>
        <div className="cardActions">
          <Link className="button secondary full" href={`/${locale}/products/${product.slug}`}>{copy[locale].viewDetails}</Link>
          <Link className="button full" href={`/${locale}/products/${product.slug}`}>
            <ShoppingBag size={16} /> {copy[locale].addToCart}
          </Link>
        </div>
      </div>
    </article>
  );
}
