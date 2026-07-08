"use client";

import { useState } from "react";
import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Locale } from "@/types/shop";
import { brand } from "@/data/siteContent";

export function ContactPage({ locale }: { locale: Locale }) {
  const [sent, setSent] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="contactPage">
      <section className="contactHero">
        <div className="container">
          <div className="eyebrow">Mariam Fathy Shop</div>
          <h1>{locale === "ar" ? "تواصلي معنا" : "Get in Touch"}</h1>
          <p>
            {locale === "ar"
              ? "للاستفسارات، مساعدة المقاسات، أو متابعة الأوردر، تواصلي معنا وسنرد خلال ٢٤ ساعة."
              : "For order questions, sizing help, or general inquiries, send us a message and we will reply within 24 hours."}
          </p>
        </div>
      </section>

      <section className="container contactLayout">
        <aside className="contactInfoPanel">
          <h2>{locale === "ar" ? "بيانات التواصل" : "Contact details"}</h2>
          <ContactDetail icon={<MapPin size={20} />} label={locale === "ar" ? "الموقع" : "Location"} value={locale === "ar" ? brand.locationAr : brand.locationEn} />
          <ContactDetail icon={<Instagram size={20} />} label="Instagram" value={brand.instagram} />
          <ContactDetail icon={<Phone size={20} />} label={locale === "ar" ? "الخط الإلكتروني" : "E-Hotline"} value={brand.hotlineLabel} href={brand.hotlineUrl} />
          <ContactDetail
            icon={<Clock size={20} />}
            label={locale === "ar" ? "ساعات العمل" : "Working hours"}
            value={locale === "ar" ? "السبت - الخميس، رد خلال ٢٤ ساعة" : "Sat - Thu, replies within 24hrs"}
          />
          <a className="button gold full" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            {locale === "ar" ? "تواصلي واتساب" : "Chat on WhatsApp"}
          </a>
        </aside>

        <form className="contactFormPanel" onSubmit={submit}>
          <h2>{locale === "ar" ? "أرسلي رسالة" : "Send a Message"}</h2>
          <div className="formGrid two">
            <div className="field">
              <label>{locale === "ar" ? "الاسم" : "Name"}</label>
              <input required name="name" placeholder={locale === "ar" ? "سارة أحمد" : "Sara Ahmed"} />
            </div>
            <div className="field">
              <label>{locale === "ar" ? "رقم الموبايل" : "Mobile"}</label>
              <input required name="mobile" inputMode="tel" placeholder="01X XXXX XXXX" />
            </div>
          </div>
          <div className="field">
            <label>{locale === "ar" ? "الموضوع" : "Subject"}</label>
            <select name="subject" defaultValue="order">
              <option value="order">{locale === "ar" ? "استفسار طلب" : "Order Inquiry"}</option>
              <option value="size">{locale === "ar" ? "مساعدة مقاسات" : "Size Help"}</option>
              <option value="general">{locale === "ar" ? "عام" : "General"}</option>
            </select>
          </div>
          <div className="field">
            <label>{locale === "ar" ? "الرسالة" : "Message"}</label>
            <textarea required name="message" placeholder={locale === "ar" ? "اكتبي رسالتك هنا..." : "Write your message here..."} />
          </div>
          {sent && <div className="successMessage">{locale === "ar" ? "تم استلام رسالتك. سنرد خلال ٢٤ ساعة." : "Message received. We reply within 24 hours."}</div>}
          <button className="button full" type="submit">{locale === "ar" ? "إرسال الرسالة" : "Send Message"}</button>
        </form>
      </section>
    </main>
  );
}

function ContactDetail({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = href ? <a href={href} target="_blank" rel="noreferrer">{value}</a> : value;

  return (
    <div className="contactDetail">
      <span className="contactIcon">{icon}</span>
      <div>
        <span>{label}</span>
        <strong>{content}</strong>
      </div>
    </div>
  );
}
