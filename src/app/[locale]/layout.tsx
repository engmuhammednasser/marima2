import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  return (
    <body lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <CartProvider>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        <WhatsAppButton />
      </CartProvider>
    </body>
  );
}
