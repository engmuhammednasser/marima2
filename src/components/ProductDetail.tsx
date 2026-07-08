"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Locale, Product } from "@/types/shop";
import { copy, sizeChart } from "@/data/siteContent";
import { formatPrice } from "@/lib/locale";
import { useCart } from "@/components/CartProvider";
import { ProductGallery } from "@/components/ProductGallery";
import { SizeSelector } from "@/components/SizeSelector";
import { ColorSelector } from "@/components/ColorSelector";
import { QuantitySelector } from "@/components/QuantitySelector";

export function ProductDetail({ product, locale }: { product: Product; locale: Locale }) {
  const [size, setSize] = useState("");
  const [colorId, setColorId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { addItem } = useCart();
  const selectedColor = product.colors.find((color) => color.id === colorId);
  const c = copy[locale];

  function add() {
    if (!size || !selectedColor) {
      setError(locale === "ar" ? "اختاري المقاس واللون قبل الإضافة للسلة." : "Choose size and color before adding to cart.");
      return;
    }
    setError("");
    addItem({ product, size, color: selectedColor, quantity });
  }

  return (
    <main className="container detail">
      <ProductGallery images={product.images} alt={locale === "ar" ? product.nameAr : product.nameEn} />

      <section className="detailPanel">
        <div className="eyebrow">{product.category}</div>
        <h1>{locale === "ar" ? product.nameAr : product.nameEn}</h1>
        <div className="priceRow"><span className="price">{formatPrice(product.price)}</span>{product.compareAtPrice && <span className="oldPrice">{formatPrice(product.compareAtPrice)}</span>}</div>
        <p className="detailText">{locale === "ar" ? product.descriptionAr : product.descriptionEn}</p>
        <div className="notice">{locale === "ar" ? "دفعة مقدمة ١٠٪ لتأكيد الطلب. تُخصم عند الاستلام وتُرد كاملة عند الإرجاع." : "10% deposit to confirm order. Deducted on delivery and fully refunded if returned."}</div>

        <SizeSelector sizes={product.sizes} value={size} onChange={setSize} locale={locale} />

        <ColorSelector colors={product.colors} value={colorId} onChange={setColorId} locale={locale} />

        <QuantitySelector value={quantity} onChange={setQuantity} locale={locale} />

        {product.colors.some((color) => color.isPlaceholder) && <div className="missing"><strong>{c.missingData}</strong><br />{locale === "ar" ? "أسماء الألوان الدقيقة غير موجودة في الملفات المرفوعة." : "Exact color names are not available in the uploaded files."}</div>}
        {error && <div className="error">{error}</div>}
        <button className="button full" type="button" onClick={add}><ShoppingBag size={18} /> {c.addToCart}</button>

        <div className="accordion">
          <details open>
            <summary>{locale === "ar" ? "القماش والقصّة" : "Fabric and fit"}</summary>
            <p className="detailText">{locale === "ar" ? product.fabricAr : product.fabricEn}</p>
            <p className="detailText">{locale === "ar" ? product.fitNotesAr : product.fitNotesEn}</p>
          </details>
          <details>
            <summary>{c.sizeGuide}</summary>
            <table className="sizeTable">
              <thead><tr><th>{locale === "ar" ? "المقاس" : "Size"}</th><th>{locale === "ar" ? "الصدر" : "Bust"}</th><th>{locale === "ar" ? "الخصر" : "Waist"}</th><th>{locale === "ar" ? "الأرداف" : "Hip"}</th></tr></thead>
              <tbody>{sizeChart.map((row) => <tr key={row.size}><td>{row.size}</td><td>{row.bust}</td><td>{row.waist}</td><td>{row.hip}</td></tr>)}</tbody>
            </table>
          </details>
          <details>
            <summary>{locale === "ar" ? "الشحن والاستبدال" : "Delivery and exchange"}</summary>
            <p className="detailText">{locale === "ar" ? "شحن مجاني عند طلب قطعتين أو أكثر. توصيل ٢-٤ أيام. معاينة عند الاستلام. الاستبدال متاح حسب السياسة." : "Free shipping when ordering 2+ pieces. Delivery 2-4 days. Open and inspect on delivery. Exchange available according to policy."}</p>
          </details>
        </div>
      </section>
    </main>
  );
}
