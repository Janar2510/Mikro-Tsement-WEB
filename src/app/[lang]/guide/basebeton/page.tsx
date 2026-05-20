import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { TopcretGuideUI } from "@/components/guide/TopcretGuideUI";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seo = dict.seo?.pages?.guide;
  return {
    title: seo?.title,
    description: seo?.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/guide/basebeton`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/guide/basebeton`])),
    },
    openGraph: { title: seo?.title, description: seo?.description, url: `${BASE_URL}/${lang}/guide/basebeton` },
  };
}

export default async function BasebetoniGuidePage({
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
      <TopcretGuideUI dict={dictionary} lang={lang} />
      <Footer lang={lang} navDict={dictionary.navigation} footerDict={dictionary.footer} />
    </main>
  );
}
