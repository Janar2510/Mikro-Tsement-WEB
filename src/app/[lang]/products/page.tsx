import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductTypes } from "@/components/products/ProductTypes";
import { CustomInteriorSection } from "@/components/products/CustomInteriorSection";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const products = [
    {
      id: "flooring",
      image: "/assets/products/flooring.png",
      href: `/${lang}/products/flooring`,
      ...dict.products.items.flooring
    },
    {
      id: "walls",
      image: "/assets/products/walls.png",
      href: `/${lang}/products/walls`,
      ...dict.products.items.walls
    },
    {
      id: "bathrooms",
      image: "/assets/products/bathrooms.png",
      href: `/${lang}/products/bathrooms`,
      ...dict.products.items.bathrooms
    },
    {
      id: "furniture",
      image: "/assets/products/furniture.png",
      href: `/${lang}/products/furniture`,
      ...dict.products.items.furniture
    }
  ];

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
      
      <section className="py-24 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {products.map((product, idx) => (
              <ProductCard 
                key={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
                href={product.href}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductTypes dict={dict} lang={lang} />
      <CustomInteriorSection dict={dict.custom_interior} />

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
