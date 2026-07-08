import { ContactPage } from "@/components/ContactPage";
import type { Locale } from "@/types/shop";

export default function Page({ params }: { params: { locale: Locale } }) {
  return <ContactPage locale={params.locale} />;
}
