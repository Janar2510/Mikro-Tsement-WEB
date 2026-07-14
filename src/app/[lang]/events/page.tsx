import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { WorkshopSection } from "@/components/events/WorkshopSection";
import Image from "next/image";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.events.title,
    description: dict.events.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/events`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/events`])),
    },
    openGraph: { title: dict.events.title, description: dict.events.subtitle, url: `${BASE_URL}/${lang}/events` },
  };
}

export default async function EventsPage({
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
      <SectionHero 
        title={dict.events.title} 
        subtitle={dict.events.subtitle}
      />
      
      <section className="py-24 bg-background px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <div className="relative aspect-[4/5] overflow-hidden grayscale">
                <Image
                  src="/assets/pages/blog/rhythm-of-the-hand.png"
                  alt={dict.events.title}
                  fill 
                  className="object-cover"
                />
             </div>
             <div className="flex flex-col justify-center space-y-16">
                {dict.events.items.map((event: any, idx: number) => (
                  <div key={idx} className="border-b border-border/50 pb-12 space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 italic">— {event.date}</span>
                    <h3 className="font-serif text-3xl uppercase tracking-widest">{event.name}</h3>
                    <p className="font-sans text-sm text-foreground/60 leading-relaxed uppercase tracking-widest max-w-md">
                      {event.description}
                    </p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <WorkshopSection dict={dict.events.workshop} lang={lang} />

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
