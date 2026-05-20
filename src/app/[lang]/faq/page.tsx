import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedText } from "@/components/ui/animated-text";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.faq.title,
    description: dict.faq.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/faq`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/faq`])),
    },
    openGraph: { title: dict.faq.title, description: dict.faq.subtitle, url: `${BASE_URL}/${lang}/faq` },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dict.faq.items.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} isDark={true} />

      <SectionHero 
        title={dict.faq.title} 
        subtitle={dict.faq.subtitle} 
        backgroundImage="/assets/pages/faq/hero-bg.png"
      />

      <section className="py-24 bg-background border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <Accordion items={dict.faq.items} />
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
