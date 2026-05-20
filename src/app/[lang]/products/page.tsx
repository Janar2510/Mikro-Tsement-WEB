import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { ProductCard } from "@/components/home/ProductCard";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.products.title,
    description: dict.products.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/products`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/products`])),
    },
    openGraph: { title: dict.products.title, description: dict.products.subtitle, url: `${BASE_URL}/${lang}/products` },
  };
}

// Fallback images for products that don't have dedicated assets yet
const PRODUCT_IMAGES: Record<string, string> = {
  "basebeton-originale": "/assets/surfaces/microcemento.png",
  "beton-cire":          "/assets/surfaces/ecocemento.png",
  "oxidestuc":           "/assets/surfaces/real-metals.png",
  "natureplast":         "/assets/surfaces/summery.png",
  "sichtbeton":          "/assets/surfaces/baxab.png",
  "basebeton-paint":     "/assets/pages/products/basebeton-paint-1.png",
  "basebeton-plus":      "/assets/surfaces/microcemento.png",
  "basebeton-xtreme":    "/assets/pages/products/basebeton-xtreme-luxury.png",
  "basebeton-solid":     "/assets/pages/products/basebeton-solid-luxury.png",
  "basebeton-grit":      "/assets/pages/products/basebeton-grit-luxury.png",
  "stuccopuro":          "/assets/pages/products/stuccopuro-luxury.png",
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const products = Object.entries(dict.products.items).map(([slug, item]: [string, any]) => ({
    id: slug,
    image: item.gallery?.[0] || PRODUCT_IMAGES[slug] || "/assets/surfaces/microcemento.png",
    href: `/${lang}/products/${slug}`,
    name: item.name,
    description: item.tagline || item.description,
  }));

  return (
    <main>
      <Navbar
        lang={lang}
        navDict={dict.navigation}
        aiDict={dict.ai_assistant}
      />
      <SectionHero
        title={dict.products.title}
        subtitle={dict.products.subtitle}
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {products.map((product, idx) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
                href={product.href}
                idx={idx}
                exploreLabel={dict.products_ui.explore}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
