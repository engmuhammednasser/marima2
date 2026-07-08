import { HomePage } from "@/components/HomePage";
import type { Locale } from "@/types/shop";

export default function Page({ params }: { params: { locale: Locale } }) {
  return <HomePage locale={params.locale} />;
}
