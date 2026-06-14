import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import Link from "next/link";
import Image from "next/image";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/blog`])),
    },
    openGraph: { title: dict.blog.title, description: dict.blog.subtitle, url: `${BASE_URL}/${lang}/blog` },
  };
}

export default async function BlogPage({
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
      <SectionHero 
        title={dict.blog.title} 
        subtitle={dict.blog.subtitle}
      />
      
      <section className="py-24 bg-background px-6">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {dict.blog.posts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
              <div className="relative aspect-[16/9] lg:aspect-square overflow-hidden grayscale">
                <Image 
                  src="/assets/pages/blog/featured.png" 
                  alt={dict.blog.posts[0].title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 italic">— {dict.blog_ui.featured}</span>
                <h3 className="font-serif text-4xl lg:text-5xl uppercase tracking-tighter italic leading-none">
                  {dict.blog.posts[0].title}
                </h3>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed uppercase tracking-widest max-w-md">
                  {dict.blog.posts[0].excerpt}
                </p>
                <div className="pt-8">
                   <Link 
                     href={`/${lang}/blog/${dict.blog.posts[0].slug}`}
                     className="border-b border-foreground text-[10px] uppercase font-bold tracking-widest pb-1 hover:italic transition-all inline-block"
                   >
                      {dict.blog_ui.read_story}
                   </Link>
                </div>
              </div>
            </div>
          )}

          {/* Grid Posts (excluding featured) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
             {dict.blog.posts.slice(1).map((post: any, idx: number) => (
                <div key={idx} className="space-y-6">
                   <div className="h-[1px] bg-foreground/20 w-full" />
                   <h4 className="font-serif text-2xl uppercase tracking-widest">{post.title}</h4>
                   <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-sm italic">
                      {post.excerpt}
                   </p>
                   <Link href={`/${lang}/blog/${post.slug}`} className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 hover:text-foreground transition-colors">
                      {dict.blog_ui.continue_reading} —
                   </Link>
                </div>
             ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
