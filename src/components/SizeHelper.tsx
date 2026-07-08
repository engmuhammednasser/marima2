"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/types/shop";
import { sizeChart } from "@/data/siteContent";

export function SizeHelper({ locale, onSelectSize }: { locale: Locale; onSelectSize: (size: string) => void }) {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [fit, setFit] = useState<"regular" | "relaxed">("regular");

  const recommendation = useMemo(() => {
    const bustValue = Number(bust);
    const waistValue = Number(waist);
    if (!bustValue || !waistValue) return "";

    const ease = fit === "relaxed" ? 4 : 0;
    const match = sizeChart.find((row) => row.bust >= bustValue + ease && row.waist >= waistValue + ease);
    return match?.size || sizeChart[sizeChart.length - 1].size;
  }, [bust, waist, fit]);

  return (
    <div className="helperBox">
      <div className="helperHead">
        <strong>{locale === "ar" ? "مساعدة سريعة للمقاس" : "Quick size helper"}</strong>
        <span>{locale === "ar" ? "إرشادي" : "Guide"}</span>
      </div>
      <div className="helperGrid">
        <label>
          <span>{locale === "ar" ? "الصدر سم" : "Bust cm"}</span>
          <input value={bust} onChange={(event) => setBust(event.target.value)} inputMode="numeric" placeholder="96" />
        </label>
        <label>
          <span>{locale === "ar" ? "الخصر سم" : "Waist cm"}</span>
          <input value={waist} onChange={(event) => setWaist(event.target.value)} inputMode="numeric" placeholder="80" />
        </label>
      </div>
      <div className="fitToggle" aria-label={locale === "ar" ? "اختيار الفت" : "Fit preference"}>
        <button className={fit === "regular" ? "active" : ""} type="button" onClick={() => setFit("regular")}>
          {locale === "ar" ? "مظبوط" : "Regular"}
        </button>
        <button className={fit === "relaxed" ? "active" : ""} type="button" onClick={() => setFit("relaxed")}>
          {locale === "ar" ? "واسع" : "Relaxed"}
        </button>
      </div>
      {recommendation ? (
        <button className="helperResult" type="button" onClick={() => onSelectSize(recommendation)}>
          {locale === "ar" ? `المقاس الأقرب: ${recommendation} - اضغطي لاختياره` : `Suggested size: ${recommendation} - tap to select`}
        </button>
      ) : (
        <p className="helperNote">{locale === "ar" ? "اكتبي مقاساتك بالسنتيمتر لاقتراح مقاس مناسب." : "Enter your measurements in centimeters for a suggested size."}</p>
      )}
    </div>
  );
}
