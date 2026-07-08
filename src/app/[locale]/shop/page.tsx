import { ShopPage } from "@/components/ShopPage";
import type { Locale } from "@/types/shop";

export default function Page({ params }: { params: { locale: Locale } }) {
  return <ShopPage locale={params.locale} />;
}
