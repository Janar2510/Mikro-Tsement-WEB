import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StoryHero } from "@/components/story/StoryHero";
import { Team } from "@/components/story/Team";
import { ThankYou } from "@/components/story/ThankYou";
import { Accordion } from "@/components/ui/Accordion";
import Image from "next/image";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.story.title,
    description: dict.story.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/story`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/story`])),
    },
    openGraph: { title: dict.story.title, description: dict.story.subtitle, url: `${BASE_URL}/${lang}/story` },
  };
}

export default async function StoryPage({
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
      />
      <StoryHero
        title={dict.story.title}
        subtitle={dict.story.subtitle}
        lang={lang}
      />
      
      {/* Narrative Section 1 - Text Left, Image Right */}
      <section className="py-24 bg-background overflow-hidden border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="font-serif text-4xl uppercase tracking-widest">{dict.story.sections.origin.title}</h2>
              <p className="font-sans text-sm md:text-base text-foreground/70 leading-relaxed max-w-lg whitespace-pre-line">
                {dict.story.sections.origin.text}
              </p>
            </div>
            <div className="relative h-[500px] lg:h-[700px] w-full order-1 lg:order-2">
              <Image 
                src="/assets/pages/story/about-us-picture.jpg" 
                alt={dict.story.sections.origin.title} 
                fill 
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Team Section */}
      <Team dict={dict.team} />

      {/* Integrated FAQ (Curated) */}
      <section className="py-24 bg-[#FAF5F2] border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <h2 className="font-serif text-4xl uppercase tracking-tighter mb-8 italic whitespace-pre-line">
                {dict.faq.title}
              </h2>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 leading-relaxed max-w-xs transition-opacity hover:opacity-100">
                {dict.faq.subtitle}
              </p>
            </div>
            <div className="lg:w-2/3">
              <Accordion items={dict.faq.items.slice(0, 2)} />
            </div>
          </div>
        </div>
      </section>

      <ThankYou dict={dict.thank_you} lang={lang} />

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
