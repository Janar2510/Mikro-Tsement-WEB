import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.terms.title} | Kuus Design`,
    description: dict.terms.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/terms`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/terms`])),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-background">
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} isDark={true} />

      <SectionHero 
        title={dict.terms.title} 
        subtitle={dict.terms.subtitle} 
        backgroundImage="/assets/pages/faq/hero-bg.png"
      />

      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-[10px] text-foreground/40 uppercase tracking-[0.4em] font-bold border-l border-border/50 pl-6">
            {dict.terms.last_updated}
          </div>

          <div className="grid gap-20">
            {dict.terms.sections.map((section: any, idx: number) => (
              <div key={idx} className="group space-y-6">
                <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-widest italic group-hover:text-primary transition-colors">
                  {section.title}
                </h2>
                <p className="font-sans text-foreground/60 leading-relaxed max-w-2xl text-sm md:text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
