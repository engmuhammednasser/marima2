import type { Locale } from "@/types/shop";

export function FAQ({ locale }: { locale: Locale }) {
  return (
    <section className="section">
      <div className="container">
        <div className="sectionHead">
          <h2>{locale === "ar" ? "أسئلة مهمة" : "FAQ"}</h2>
        </div>
        <div className="accordion">
          <details>
            <summary>{locale === "ar" ? "هل الشحن مجاني؟" : "Is shipping free?"}</summary>
            <p className="detailText">{locale === "ar" ? "الشحن مجاني عند طلب قطعتين أو أكثر." : "Shipping is free when ordering 2 or more pieces."}</p>
          </details>
          <details>
            <summary>{locale === "ar" ? "هل يمكن المعاينة عند الاستلام؟" : "Can I inspect on delivery?"}</summary>
            <p className="detailText">{locale === "ar" ? "نعم، المعاينة متاحة عند الاستلام حسب الرسائل الموجودة في التصميم الحالي." : "Yes, open and inspect on delivery is preserved from the current design."}</p>
          </details>
          <details>
            <summary>{locale === "ar" ? "هل يوجد دعم مقاسات؟" : "Is sizing support available?"}</summary>
            <p className="detailText">{locale === "ar" ? "نعم، دعم المقاسات متاح عبر واتساب." : "Yes, WhatsApp sizing support is available."}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
