"use client";

import Image from "next/image";
import type { Locale } from "@/types/shop";
import { formatPrice } from "@/lib/locale";
import { useCart } from "@/components/CartProvider";

export function OrderSummary({ locale }: { locale: Locale }) {
  const { items, subtotal } = useCart();

  return (
    <aside className="summaryPanel">
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>{locale === "ar" ? "ملخص الطلب" : "Order summary"}</h2>
      {items.length === 0 ? (
        <p className="detailText">{locale === "ar" ? "السلة فارغة. أضيفي منتجاً قبل الدفع." : "Your cart is empty. Add a product before checkout."}</p>
      ) : items.map((item) => (
        <div className="cartItem" key={`${item.productId}-${item.size}-${item.colorId}`}>
          <div className="cartImg"><Image src={item.image} alt={locale === "ar" ? item.nameAr : item.nameEn} fill sizes="70px" style={{ objectFit: "cover" }} /></div>
          <div>
            <strong>{locale === "ar" ? item.nameAr : item.nameEn}</strong>
            <div className="cartMeta">{item.size} · {locale === "ar" ? item.colorNameAr : item.colorNameEn}<br />{locale === "ar" ? "الكمية" : "Qty"}: {item.quantity}</div>
          </div>
          <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
        </div>
      ))}
      <div className="totals" style={{ marginTop: 16 }}>
        <div className="totalLine"><span>{locale === "ar" ? "المجموع الفرعي" : "Subtotal"}</span><strong>{formatPrice(subtotal)}</strong></div>
        <div className="totalLine"><span>{locale === "ar" ? "الشحن" : "Shipping"}</span><span>{locale === "ar" ? "مجاني عند قطعتين" : "Free on 2+ pieces"}</span></div>
        <div className="totalLine"><span>{locale === "ar" ? "الإجمالي" : "Total"}</span><strong>{formatPrice(subtotal)}</strong></div>
        <div className="notice" style={{ margin: 0 }}>{locale === "ar" ? "المتبقي يُدفع عند الاستلام." : "Remaining balance collected on delivery."}</div>
      </div>
    </aside>
  );
}
