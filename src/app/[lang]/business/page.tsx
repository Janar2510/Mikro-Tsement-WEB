import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.business?.title ?? "Business",
    description: dict.business?.subtitle ?? "",
    alternates: {
      canonical: `${BASE_URL}/${lang}/business`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/business`])),
    },
    openGraph: { title: dict.business?.title, description: dict.business?.subtitle, url: `${BASE_URL}/${lang}/business` },
  };
}

export default async function BusinessPage({
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
        title={dict.business.title} 
        subtitle={dict.business.subtitle}
      />
      
      <section className="py-24 bg-background px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="relative w-full aspect-[21/9] mb-20 overflow-hidden">
             <Image 
               src="/assets/pages/projects/commercial.jpg" 
               alt={dict.business.title} 
               fill 
               className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
             />
          </div>

          <div className="max-w-3xl text-center space-y-12">
            <h2 className="font-serif text-3xl uppercase tracking-widest leading-relaxed">
              {lang === 'et' ? "Rätsepalahendused " : "Tailored solutions for "}
              <span className="italic">{lang === 'et' ? "arhitektuurseks tipptasemeks" : "architectural excellence"}</span>.
            </h2>
            <p className="font-sans text-sm md:text-base text-foreground/60 leading-relaxed uppercase tracking-widest">
              {dict.business.subtitle}
            </p>
            <div className="pt-12">
              <Link href={`/${lang}/contact`}>
                <button className="bg-foreground text-background px-12 py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-foreground/80 transition-all">
                  {dict.business.cta}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
