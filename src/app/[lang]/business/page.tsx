import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import Image from "next/image";

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
               src="/assets/pages/projects/commercial.png" 
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
              <button className="bg-foreground text-background px-12 py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-foreground/80 transition-all">
                {dict.business.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
