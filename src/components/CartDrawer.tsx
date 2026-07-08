"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2 } from "lucide-react";
import type { Locale } from "@/types/shop";
import { copy } from "@/data/siteContent";
import { cartKey, useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/locale";

export function CartDrawer({ locale }: { locale: Locale }) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, deposit } = useCart();
  if (!isOpen) return null;
  const c = copy[locale];

  return (
    <div className="drawerBackdrop" role="dialog" aria-modal="true">
      <aside className="drawer">
        <div className="drawerHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <strong>{c.cart}</strong>
          <Image src="/assets/logo/logo.png" alt="Mariam Fathy Shop" width={68} height={44} />
          <button className="iconButton" type="button" onClick={closeCart} aria-label="Close cart"><X size={18} /></button>
        </div>
        <div className="drawerItems">
          {items.length === 0 ? (
            <p className="detailText">{locale === "ar" ? "سلتك فارغة حالياً." : "Your cart is currently empty."}</p>
          ) : items.map((item) => {
            const key = cartKey(item);
            return (
              <div className="cartItem" key={key}>
                <div className="cartImg"><Image src={item.image} alt={locale === "ar" ? item.nameAr : item.nameEn} fill sizes="70px" style={{ objectFit: "cover" }} /></div>
                <div>
                  <strong>{locale === "ar" ? item.nameAr : item.nameEn}</strong>
                  <div className="cartMeta">
                    {item.size} · {locale === "ar" ? item.colorNameAr : item.colorNameEn}<br />
                    {formatPrice(item.unitPrice)} · {locale === "ar" ? "الإجمالي" : "Subtotal"} {formatPrice(item.subtotal)}
                  </div>
                  <div className="quantity" style={{ marginTop: 8 }}>
                    <button type="button" onClick={() => updateQuantity(key, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(key, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="iconButton" type="button" onClick={() => removeItem(key)} aria-label="Remove item"><Trash2 size={16} /></button>
              </div>
            );
          })}
        </div>
        <div className="drawerFooter">
          <div className="totals">
            <div className="totalLine"><span>{locale === "ar" ? "المجموع الفرعي" : "Subtotal"}</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="notice" style={{ margin: 0 }}>{locale === "ar" ? "دفعة مقدمة ١٠٪ عبر انستاباي، تُخصم عند الاستلام وتُرد كاملة عند الإرجاع." : "10% deposit via InstaPay, deducted on delivery and fully refunded if returned."}<br /><strong>{formatPrice(deposit)}</strong></div>
          </div>
          <Link className="button full" href={`/${locale}/checkout`} onClick={closeCart}>{c.checkout}</Link>
        </div>
      </aside>
    </div>
  );
}
