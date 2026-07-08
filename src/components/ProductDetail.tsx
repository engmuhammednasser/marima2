"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Locale, Product } from "@/types/shop";
import { copy, sizeChart } from "@/data/siteContent";
import { formatPrice } from "@/lib/locale";
import { useCart } from "@/components/CartProvider";

export function ProductDetail({ product, locale }: { product: Product; locale: Locale }) {
  const [image, setImage] = useState(product.images[0]);
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
      <section>
        <div className="galleryMain">
          <Image src={image} alt={locale === "ar" ? product.nameAr : product.nameEn} fill priority sizes="(min-width: 760px) 55vw, 100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="thumbs">
          {product.images.map((src) => (
            <button className="thumb" key={src} type="button" onClick={() => setImage(src)}>
              <Image src={src} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      </section>

      <section className="detailPanel">
        <div className="eyebrow">{product.category}</div>
        <h1>{locale === "ar" ? product.nameAr : product.nameEn}</h1>
        <div className="priceRow"><span className="price">{formatPrice(product.price)}</span>{product.compareAtPrice && <span className="oldPrice">{formatPrice(product.compareAtPrice)}</span>}</div>
        <p className="detailText">{locale === "ar" ? product.descriptionAr : product.descriptionEn}</p>
        <div className="notice">{locale === "ar" ? "دفعة مقدمة ١٠٪ لتأكيد الطلب. تُخصم عند الاستلام وتُرد كاملة عند الإرجاع." : "10% deposit to confirm order. Deducted on delivery and fully refunded if returned."}</div>

        <div className="optionGroup">
          <span className="optionLabel">{locale === "ar" ? "المقاس" : "Size"}</span>
          <div className="chips">
            {product.sizes.map((item) => <button className={`chip ${size === item ? "active" : ""}`} type="button" key={item} onClick={() => setSize(item)}>{item}</button>)}
          </div>
        </div>

        <div className="optionGroup">
          <span className="optionLabel">{locale === "ar" ? "اللون" : "Color"}</span>
          <div className="chips">
            {product.colors.map((color) => (
              <button className={`chip ${colorId === color.id ? "active" : ""}`} type="button" key={color.id} onClick={() => setColorId(color.id)}>
                <span className="swatch" style={{ background: color.value, display: "inline-block", verticalAlign: "middle", marginInlineEnd: 6 }} />
                {locale === "ar" ? color.nameAr : color.nameEn}
              </button>
            ))}
          </div>
        </div>

        <div className="optionGroup">
          <span className="optionLabel">{locale === "ar" ? "الكمية" : "Quantity"}</span>
          <div className="quantity">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

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
