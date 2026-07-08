"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/types/shop";
import { copy } from "@/data/siteContent";
import { checkoutConfig } from "@/data/checkoutConfig";
import { formatPrice } from "@/lib/locale";
import { useCart } from "@/components/CartProvider";
import { OrderSummary } from "@/components/OrderSummary";

export function CheckoutForm({ locale }: { locale: Locale }) {
  const { items, deposit, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [payment, setPayment] = useState("instapay");
  const orderNumber = useMemo(() => `MF-${Math.floor(100000 + Math.random() * 899999)}`, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (items.length === 0) {
      setError(locale === "ar" ? "لا يمكن تأكيد أوردر والسلة فارغة." : "You cannot submit an order with an empty cart.");
      return;
    }
    if (items.some((item) => !item.size || !item.colorId)) {
      setError(locale === "ar" ? "كل منتج يجب أن يحتوي على مقاس ولون قبل تأكيد الأوردر." : "Every item must include a selected size and color before checkout.");
      return;
    }
    if (checkoutConfig.requiredFields.some((field) => !String(data.get(field) || "").trim())) {
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
          <div className="field">
            <label>{locale === "ar" ? "طريقة الدفع" : "Payment method"}</label>
            <select value={payment} onChange={(event) => setPayment(event.target.value)}>
              {checkoutConfig.paymentMethods.map((method) => <option key={method.id} value={method.id}>{locale === "ar" ? method.labelAr : method.labelEn}</option>)}
            </select>
          </div>

          {payment === "instapay" && (
            <div className="notice">
              <strong>{locale === "ar" ? "حوّلي إلى" : "Transfer to"}: {checkoutConfig.instapayHandle}</strong><br />
              {locale === "ar" ? "الدفعة المطلوبة الآن" : "Deposit due now"}: {formatPrice(deposit)}
              <div className="field" style={{ marginTop: 12 }}><label>{locale === "ar" ? "رفع إيصال الدفع Placeholder" : "Payment screenshot upload placeholder"}</label><input type="file" accept="image/*" /></div>
            </div>
          )}

          <div className="field"><label>{locale === "ar" ? "ملاحظات" : "Notes"}</label><textarea name="notes" /></div>
          <label className="checkbox"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> <span>{locale === "ar" ? checkoutConfig.confirmationAr : checkoutConfig.confirmationEn}</span></label>
          {error && <div className="error">{error}</div>}
          <button className="button full" type="submit">{c.confirmOrder}</button>
        </div>
      </form>

      <OrderSummary locale={locale} />
    </main>
  );
}
