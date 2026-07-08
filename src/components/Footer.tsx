import Image from "next/image";
import type { Locale } from "@/types/shop";
import { brand, copy } from "@/data/siteContent";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <Image src={brand.logo} alt={brand.name} width={105} height={68} style={{ filter: "invert(1)" }} />
          <p style={{ color: "rgba(255,255,255,.68)", maxWidth: 440 }}>{copy[locale].footerText}</p>
        </div>
        <div style={{ color: "rgba(255,255,255,.5)", fontSize: 13 }}>© 2026 {brand.name} · InstaPay</div>
      </div>
    </footer>
  );
}
