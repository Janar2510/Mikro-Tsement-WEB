import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { ContactUI } from "@/components/contact/ContactUI";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/contact`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/contact`])),
    },
    openGraph: { title: dict.contact.title, description: dict.contact.subtitle, url: `${BASE_URL}/${lang}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      <Navbar 
        lang={lang} 
        navDict={dict.navigation} 
        aiDict={dict.ai_assistant}
        isDark={true}
      />
      <SectionHero 
        title={dict.contact.title} 
        subtitle={dict.contact.subtitle}
        backgroundImage="/assets/pages/contact/hero-bg.png"
      />
      
      <ContactUI dict={dict} lang={lang} />

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
