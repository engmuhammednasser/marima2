"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, MessageCircle } from "lucide-react";
import type { Locale } from "@/types/shop";
import { brand, copy } from "@/data/siteContent";
import { navigation } from "@/data/navigation";
import { useCart } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";

export function Header({ locale }: { locale: Locale }) {
  const { openCart, count } = useCart();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const c = copy[locale];

  return (
    <>
      <div className="announcement">{c.announcement}</div>
      <header className="header">
        <Link className="logoWrap" href={`/${locale}`} aria-label={brand.name}>
          <Image src={brand.logo} alt={brand.name} width={96} height={62} priority />
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={`/${locale}${item.href === "/" ? "" : item.href}`}>
              {locale === "ar" ? item.labelAr : item.labelEn}
            </Link>
          ))}
        </nav>
        <div className="actions">
          <Link className="langButton" href={`/${otherLocale}`} aria-label="Switch language">
            {otherLocale.toUpperCase()}
          </Link>
          <a className="iconButton" href={`https://wa.me/${brand.whatsapp}`} aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <button className="iconButton" type="button" aria-label={c.cart} onClick={openCart}>
            <ShoppingBag size={20} />
            {count > 0 && <span className="cartCount">{count}</span>}
          </button>
          <button className="iconButton" type="button" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </header>
      <CartDrawer locale={locale} />
    </>
  );
}
