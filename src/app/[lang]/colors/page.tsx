import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ColorsUI } from "@/components/colors/ColorsUI";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seo = dict.seo?.pages?.colors;
  return {
    title: seo?.title ?? dict.colors?.title ?? "Colours",
    description: seo?.description ?? dict.colors?.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/colors`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/colors`])),
    },
    openGraph: { title: seo?.title, description: seo?.description, url: `${BASE_URL}/${lang}/colors` },
  };
}

export default async function ColorsPage({
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
      
      <ColorsUI dict={dict} lang={lang} />

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
