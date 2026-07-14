import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seo = dict.seo?.pages?.home ?? dict.seo?.global;
  return {
    title: seo?.title,
    description: seo?.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}`])),
    },
    openGraph: { title: seo?.title, description: seo?.description, url: `${BASE_URL}/${lang}` },
  };
}
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Surfaces } from "@/components/home/Surfaces";
import { TimelessCollection } from "@/components/home/TimelessCollection";
import { DecoWalls } from "@/components/home/DecoWalls";
import { Methodology } from "@/components/home/Methodology";
import { CTA } from "@/components/home/CTA";
import { VisualizeCTA } from "@/components/home/VisualizeCTA";
import { Footer } from "@/components/layout/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
    <link rel="preload" href="/assets/pages/home/home-hero.mp4?v=2" as="video" type="video/mp4" />
    <main>
      <Navbar 
        lang={lang} 
        navDict={dict.navigation} 
        aiDict={dict.ai_assistant} 
        isDark={true} 
      />
      <Hero dict={dict.hero} lang={lang} />
      <Philosophy dict={dict.philosophy} />
      <Surfaces dict={dict.surfaces_collection} lang={lang} />
      <TimelessCollection dict={dict.timeless_collection} lang={lang} />
      <DecoWalls dict={dict.deco_walls_collection} />
      <Methodology dict={dict.methodology} />
      <VisualizeCTA lang={lang} dict={dict.visualize_cta} />
      <CTA dict={dict.cta_section} lang={lang} />
      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
    </>
  );
}
