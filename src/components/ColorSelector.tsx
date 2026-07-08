"use client";

import type { Locale, ProductColor } from "@/types/shop";

export function ColorSelector({
  colors,
  value,
  onChange,
  locale
}: {
  colors: ProductColor[];
  value: string;
  onChange: (colorId: string) => void;
  locale: Locale;
}) {
  return (
    <div className="optionGroup">
      <span className="optionLabel">{locale === "ar" ? "اللون" : "Color"}</span>
      <div className="chips">
        {colors.map((color) => (
          <button className={`chip ${value === color.id ? "active" : ""}`} type="button" key={color.id} onClick={() => onChange(color.id)}>
            <span className="swatch" style={{ background: color.value, display: "inline-block", verticalAlign: "middle", marginInlineEnd: 6 }} />
            {locale === "ar" ? color.nameAr : color.nameEn}
          </button>
        ))}
      </div>
    </div>
  );
}
