"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Locale } from "@/types/shop";
import { brand, copy } from "@/data/siteContent";
import { formatPrice } from "@/lib/locale";
import { useCart } from "@/components/CartProvider";

export function CheckoutForm({ locale }: { locale: Locale }) {
  const { items, subtotal, deposit, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [payment, setPayment] = useState("instapay");
  const orderNumber = useMemo(() => `MF-${Math.floor(100000 + Math.random() * 899999)}`, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const required = ["fullName", "mobile", "governorate", "city", "address"];

    if (items.length === 0) {
      setError(locale === "ar" ? "لا يمكن تأكيد أوردر والسلة فارغة." : "You cannot submit an order with an empty cart.");
      return;
    }
    if (items.some((item) => !item.size || !item.colorId)) {
      setError(locale === "ar" ? "كل منتج يجب أن يحتوي على مقاس ولون قبل تأكيد الأوردر." : "Every item must include a selected size and color before checkout.");
      return;
    }
    if (required.some((field) => !String(data.get(field) || "").trim())) {
      setError(locale === "ar" ? "كملي كل البيانات المطلوبة قبل التأكيد." : "Complete all required fields before confirming.");
      return;
    }
    if (!confirmed) {
      setError(locale === "ar" ? "يجب تأكيد أن المقاس واللون صحيحان." : "Please confirm that the selected size and color are correct.");
      return;
    }

    setError("");
    clearCart();
    router.push(`/${locale}/thank-you?order=${orderNumber}`);
  }

  const c = copy[locale];

  return (
    <main className="container checkoutLayout">
      <form className="formPanel" onSubmit={submit}>
        <div className="eyebrow">{c.checkout}</div>
        <h1 style={{ fontSize: 34, margin: "8px 0 20px" }}>{locale === "ar" ? "بيانات الأوردر" : "Order details"}</h1>

        <div className="formGrid">
          <div className="field"><label>{locale === "ar" ? "الاسم الكامل *" : "Full name *"}</label><input name="fullName" placeholder={locale === "ar" ? "سارة أحمد" : "Sara Ahmed"} /></div>
          <div className="formGrid two">
            <div className="field"><label>{locale === "ar" ? "رقم الموبايل *" : "Mobile number *"}</label><input name="mobile" inputMode="tel" placeholder="01X XXXX XXXX" /></div>
            <div className="field"><label>{locale === "ar" ? "واتساب اختياري" : "WhatsApp optional"}</label><input name="whatsapp" inputMode="tel" placeholder="01X XXXX XXXX" /></div>
          </div>
          <div className="formGrid two">
            <div className="field"><label>{locale === "ar" ? "المحافظة *" : "Governorate *"}</label><input name="governorate" placeholder={locale === "ar" ? "القاهرة" : "Cairo"} /></div>
            <div className="field"><label>{locale === "ar" ? "المدينة / المنطقة *" : "City / Area *"}</label><input name="city" placeholder={locale === "ar" ? "مدينة نصر" : "Nasr City"} /></div>
          </div>
          <div className="field"><label>{locale === "ar" ? "العنوان الكامل *" : "Full address *"}</label><textarea name="address" placeholder={locale === "ar" ? "الشارع، العمارة، الدور، الشقة" : "Street, building, floor, apartment"} /></div>
          <div className="field"><label>{locale === "ar" ? "طريقة الدفع" : "Payment method"}</label><select value={payment} onChange={(event) => setPayment(event.target.value)}><option value="instapay">{locale === "ar" ? "دفعة مقدمة عبر انستاباي" : "InstaPay deposit"}</option><option value="cod">{locale === "ar" ? "الدفع عند الاستلام إذا متاح" : "Cash on delivery if available"}</option></select></div>

          {payment === "instapay" && (
            <div className="notice">
              <strong>{locale === "ar" ? "حوّلي إلى" : "Transfer to"}: {brand.instapay}</strong><br />
              {locale === "ar" ? "الدفعة المطلوبة الآن" : "Deposit due now"}: {formatPrice(deposit)}
              <div className="field" style={{ marginTop: 12 }}><label>{locale === "ar" ? "رفع إيصال الدفع Placeholder" : "Payment screenshot upload placeholder"}</label><input type="file" accept="image/*" /></div>
            </div>
          )}

          <div className="field"><label>{locale === "ar" ? "ملاحظات" : "Notes"}</label><textarea name="notes" /></div>
          <label className="checkbox"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> <span>{locale === "ar" ? "أؤكد أن المقاس واللون صحيحان" : "I confirm that the selected size and color are correct"}</span></label>
          {error && <div className="error">{error}</div>}
          <button className="button full" type="submit">{c.confirmOrder}</button>
        </div>
      </form>

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
    </main>
  );
}
