import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailsUI } from "@/components/products/ProductDetailsUI";
import { notFound } from "next/navigation";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const product = dict.products.items[slug as keyof typeof dict.products.items];
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/products/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/products/${slug}`])),
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${BASE_URL}/${lang}/products/${slug}`,
      images: product.gallery?.[0]
        ? [{ url: `${BASE_URL}${product.gallery[0]}`, width: 1200, height: 630, alt: product.name }]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const product = dict.products.items[slug as keyof typeof dict.products.items];

  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": product.name,
    "description": product.description,
    "provider": { "@type": "LocalBusiness", "name": "KUUS DESIGN", "url": BASE_URL },
    "url": `${BASE_URL}/${lang}/products/${slug}`,
    "image": product.gallery?.[0] ? `${BASE_URL}${product.gallery[0]}` : `${BASE_URL}/hero.png`,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} />
      <ProductDetailsUI product={product} lang={lang} slug={slug} dict={dict} />
      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
