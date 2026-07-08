import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariam Fathy Shop | Modest Fashion Egypt",
  description: "Bilingual Arabic and English ecommerce experience for Mariam Fathy Shop modest womenswear in Egypt."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html suppressHydrationWarning>{children}</html>;
}
