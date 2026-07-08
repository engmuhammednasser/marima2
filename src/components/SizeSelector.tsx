"use client";

import type { Locale } from "@/types/shop";

export function SizeSelector({
  sizes,
  value,
  onChange,
  locale
}: {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
  locale: Locale;
}) {
  return (
    <div className="optionGroup">
      <span className="optionLabel">{locale === "ar" ? "المقاس" : "Size"}</span>
      <div className="chips">
        {sizes.map((item) => <button className={`chip ${value === item ? "active" : ""}`} type="button" key={item} onClick={() => onChange(item)}>{item}</button>)}
      </div>
    </div>
  );
}
