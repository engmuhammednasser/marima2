"use client";

import type { Locale } from "@/types/shop";

export function QuantitySelector({
  value,
  onChange,
  locale
}: {
  value: number;
  onChange: (quantity: number) => void;
  locale: Locale;
}) {
  return (
    <div className="optionGroup">
      <span className="optionLabel">{locale === "ar" ? "الكمية" : "Quantity"}</span>
      <div className="quantity">
        <button type="button" onClick={() => onChange(Math.max(1, value - 1))}>-</button>
        <span>{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}
