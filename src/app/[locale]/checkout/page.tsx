import { CheckoutForm } from "@/components/CheckoutForm";
import type { Locale } from "@/types/shop";

export default function CheckoutPage({ params }: { params: { locale: Locale } }) {
  return <CheckoutForm locale={params.locale} />;
}
