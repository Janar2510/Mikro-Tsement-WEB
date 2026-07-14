import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { MicrocementGuideUI } from "@/components/guide/MicrocementGuideUI";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seo = dict.seo?.pages?.guide;
  return {
    title: seo?.title,
    description: seo?.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/guide/luxury-concrete`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/guide/luxury-concrete`])),
    },
    openGraph: { title: seo?.title, description: seo?.description, url: `${BASE_URL}/${lang}/guide/luxury-concrete` },
  };
}

export default async function LuxuryConcreteGuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <Navbar
        lang={lang}
        navDict={dictionary.navigation}
        aiDict={dictionary.ai_assistant}
      />
      <MicrocementGuideUI dict={dictionary} lang={lang} />
      <Footer lang={lang} navDict={dictionary.navigation} footerDict={dictionary.footer} />
    </main>
  );
}
