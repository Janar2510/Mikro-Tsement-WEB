import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { ProductCard } from "@/components/home/ProductCard";

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];

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

// Fallback images (real Luxury Concrete product photography) in case a
// product's gallery is ever empty.
const PRODUCT_IMAGES: Record<string, string> = {
  "concrete":     "/assets/pages/products/luxury-concrete/concrete/microcemento-bicomponente.webp",
  "monocrete":    "/assets/pages/products/luxury-concrete/monocrete/microcemento-monocomponente.webp",
  "easycret":     "/assets/pages/products/luxury-concrete/easycret/microcemento-easycret-2.webp",
  "concrete-pox": "/assets/pages/products/luxury-concrete/concrete-pox/suelo-gran-almacen-concrete-pox.webp",
  "limecrete":    "/assets/pages/products/luxury-concrete/limecrete/microcemento-sala-estar.webp",
  "metallic":     "/assets/pages/products/luxury-concrete/metallic/colorcrete-metal-diamond.webp",
  "primers":      "/assets/pages/products/luxury-concrete/primers/acabado_imprimaciones.webp",
  "sealers":      "/assets/pages/products/luxury-concrete/sealers/acabado_barniz.webp",
  "pigments":     "/assets/pages/products/luxury-concrete/pigments/colorcrete_base.webp",
  "care":         "/assets/pages/products/luxury-concrete/care/concrete_clean.webp",
  "tools":        "/assets/pages/products/luxury-concrete/tools/malla.webp",
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const allProducts = Object.entries(dict.products.items).map(([slug, item]: [string, any]) => ({
    id: slug,
    category: item.category || "systems",
    image: item.gallery?.[0] || PRODUCT_IMAGES[slug] || "/assets/pages/products/luxury-concrete/concrete/microcemento-bicomponente.webp",
    href: `/${lang}/products/${slug}`,
    name: item.name,
    description: item.tagline || item.description,
  }));

  const systems = allProducts.filter((p) => p.category === "systems");
  const materials = allProducts.filter((p) => p.category === "materials");

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
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-tight italic mb-10">
              {dict.products.systems_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {systems.map((product, idx) => (
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

          <div>
            <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-tight italic mb-10">
              {dict.products.materials_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {materials.map((product, idx) => (
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
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
