import { MetadataRoute } from "next";

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];
const DEFAULT_LOCALE = "et";

const BLOG_SLUGS = [
  "rhythm-of-the-hand",
  "mineral-tonality",
  "bathroom-renovation-no-demolition",
  "microcement-on-tiles-guide",
  "microcement-furniture-trends-2026",
];

const PRODUCT_SLUGS = [
  "basebeton-originale",
  "beton-cire",
  "oxidestuc",
  "natureplast",
  "sichtbeton",
  "basebeton-paint",
  "basebeton-plus",
  "basebeton-xtreme",
  "basebeton-solid",
  "basebeton-grit",
  "stuccopuro",
];

const COLOR_PALETTE_SLUGS = [
  "basebeton-originale",
  "beton-cire",
  "oxidestuc",
  "natureplast",
  "sichtbeton",
  "basebeton-paint",
  "basebeton-plus",
  "basebeton-xtreme",
  "basebeton-solid",
  "basebeton-grit",
  "stuccopuro",
];

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/story", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/colors", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/guide/basebeton", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/business", priority: 0.6, changeFrequency: "monthly" as const },
];

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/${DEFAULT_LOCALE}${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-24");
  const entries: MetadataRoute.Sitemap = [];

  // Static routes × all locales
  for (const route of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: locale === DEFAULT_LOCALE ? route.priority : route.priority * 0.9,
        alternates: buildAlternates(route.path),
      });
    }
  }

  // Product detail pages × all locales
  for (const slug of PRODUCT_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: locale === DEFAULT_LOCALE ? 0.7 : 0.63,
        alternates: buildAlternates(`/products/${slug}`),
      });
    }
  }

  // Per-product colour palette pages
  for (const slug of COLOR_PALETTE_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/colors/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: locale === DEFAULT_LOCALE ? 0.65 : 0.58,
        alternates: buildAlternates(`/colors/${slug}`),
      });
    }
  }

  // Blog post pages × all locales
  for (const slug of BLOG_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: locale === DEFAULT_LOCALE ? 0.7 : 0.63,
        alternates: buildAlternates(`/blog/${slug}`),
      });
    }
  }

  return entries;
}
