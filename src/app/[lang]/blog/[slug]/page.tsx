import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlogDetailsUI } from "@/components/blog/BlogDetailsUI";
import { notFound } from "next/navigation";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const post = dict.blog.posts.find((p: any) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog/${slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`])),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: `${BASE_URL}${post.image}`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const post = dict.blog.posts.find((p: any) => p.slug === slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${BASE_URL}${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": { "@type": "Organization", "name": "KUUS DESIGN", "url": BASE_URL },
    "publisher": {
      "@type": "Organization",
      "name": "KUUS DESIGN",
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/assets/brand/logos/Micro Logo.png` },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/${lang}/blog/${slug}` },
    "articleBody": post.content?.join(" ") ?? post.excerpt,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} />
      <BlogDetailsUI post={post} lang={lang} />
      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
