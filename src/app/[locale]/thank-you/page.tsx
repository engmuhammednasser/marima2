import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/shop";
import { brand } from "@/data/siteContent";

export default function ThankYouPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { order?: string };
}) {
  const locale = params.locale;
  const order = searchParams.order || "MF-PLACEHOLDER";
  return (
    <main className="container thankyou">
      <section className="thankyouBox">
        <Image src={brand.logo} alt={brand.name} width={120} height={78} priority />
        <div className="eyebrow" style={{ marginTop: 16 }}>{order}</div>
        <h1 style={{ fontSize: 34, margin: "8px 0 12px" }}>{locale === "ar" ? "تم استلام الأوردر" : "Order received"}</h1>
        <p className="detailText">{locale === "ar" ? "شكراً لكِ. سنراجع بيانات الطلب وإيصال الدفع ثم نتواصل معكِ للتأكيد." : "Thank you. We will review your order details and payment receipt, then contact you to confirm."}</p>
        <Link className="button" href={`/${locale}`} style={{ marginTop: 18 }}>{locale === "ar" ? "العودة للتسوق" : "Continue shopping"}</Link>
      </section>
    </main>
  );
}
