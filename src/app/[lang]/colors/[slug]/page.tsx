import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductColorsUI } from "@/components/colors/ProductColorsUI";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateStaticParams() {
  const slugs = [
    "basebeton-originale","beton-cire","oxidestuc","natureplast","sichtbeton",
    "basebeton-paint","basebeton-plus","basebeton-xtreme","basebeton-solid",
    "basebeton-grit","stuccopuro",
  ];
  return LOCALES.flatMap(lang => slugs.map(slug => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const collection = dict.colors?.collections?.[slug];
  if (!collection) return {};
  return {
    title: `${collection.title} — Colours`,
    description: collection.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/colors/${slug}`,
      languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}/colors/${slug}`])),
    },
  };
}

export default async function ProductColorsPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const collection = dict.colors?.collections?.[slug];
  if (!collection) notFound();

  const product = dict.products?.items?.[slug];

  return (
    <main>
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} />
      <ProductColorsUI
        lang={lang}
        slug={slug}
        collection={collection}
        product={product}
        dict={dict}
      />
      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
