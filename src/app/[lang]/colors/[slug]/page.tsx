import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductColorsUI } from "@/components/colors/ProductColorsUI";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

// Colour-collection slugs and product slugs are different taxonomies (one
// collection can supply several products, e.g. "colorcrete" is used by
// Concrete, Monocrete, Easycret and Pigments). This maps each collection to
// the single most relevant product page to link back to.
const COLLECTION_PRODUCT: Record<string, string> = {
  colorcrete: "concrete",
  "true-metal": "metallic",
  "oxid-metal": "metallic",
  gemstone: "metallic",
  glowing: "metallic",
  "concrete-pox": "concrete-pox",
  limecrete: "limecrete",
};

export async function generateStaticParams() {
  const slugs = [
    "colorcrete", "true-metal", "oxid-metal", "gemstone", "glowing",
    "concrete-pox", "limecrete",
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

  const productSlug = COLLECTION_PRODUCT[slug];
  const product = productSlug ? dict.products?.items?.[productSlug] : undefined;

  return (
    <main>
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} />
      <ProductColorsUI
        lang={lang}
        slug={slug}
        productSlug={productSlug}
        collection={collection}
        product={product}
        dict={dict}
      />
      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
