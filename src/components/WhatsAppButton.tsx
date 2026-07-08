import { MessageCircle } from "lucide-react";
import { brand } from "@/data/siteContent";

export function WhatsAppButton() {
  return (
    <a className="whatsapp" href={`https://wa.me/${brand.whatsapp}`} aria-label="WhatsApp sizing support">
      <MessageCircle />
    </a>
  );
}
