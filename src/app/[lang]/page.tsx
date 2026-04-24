import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Surfaces } from "@/components/home/Surfaces";
import { TimelessCollection } from "@/components/home/TimelessCollection";
import { Methodology } from "@/components/home/Methodology";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/layout/Footer";

export default async function Home({
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
      <Hero dict={dict.hero} />
      <Philosophy dict={dict.philosophy} />
      <Surfaces dict={dict.surfaces_collection} />
      <TimelessCollection dict={dict.timeless_collection} />
      <Methodology dict={dict.methodology} />
      <CTA dict={dict.cta_section} />
      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
