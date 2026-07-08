"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import type { Locale } from "@/types/shop";

const governorates = [
  { id: "cairo", ar: "القاهرة", en: "Cairo" },
  { id: "giza", ar: "الجيزة", en: "Giza" },
  { id: "alexandria", ar: "الإسكندرية", en: "Alexandria" },
  { id: "other", ar: "محافظة أخرى", en: "Other governorate" }
];

export function DeliveryEstimator({ locale }: { locale: Locale }) {
  const [governorate, setGovernorate] = useState(governorates[0].id);
  const selected = governorates.find((item) => item.id === governorate) || governorates[0];

  return (
    <div className="deliveryBox">
      <div className="deliveryIcon"><Truck size={18} /></div>
      <div>
        <strong>{locale === "ar" ? "تقدير الشحن" : "Delivery estimate"}</strong>
        <select value={governorate} onChange={(event) => setGovernorate(event.target.value)}>
          {governorates.map((item) => <option key={item.id} value={item.id}>{locale === "ar" ? item.ar : item.en}</option>)}
        </select>
        <p>
          {locale === "ar"
            ? `${selected.ar}: التوصيل ٢-٤ أيام حسب رسالة الشحن في التصميم المرجعي.`
            : `${selected.en}: delivery is 2-4 days according to the reference shipping message.`}
        </p>
      </div>
    </div>
  );
}
