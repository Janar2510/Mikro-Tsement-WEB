import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { getDictionary } from "@/i18n/get-dictionary";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const BASE_URL = "https://kuusdisain.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr", "lv", "lt"];
const OG_LOCALES: Record<string, string> = { et: "et_EE", en: "en_US", de: "de_DE", ru: "ru_RU", es: "es_ES", fr: "fr_FR", lv: "lv_LV", lt: "lt_LT" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seo = dict.seo.global;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: seo.title,
      template: `%s | KUUS DESIGN`,
    },
    description: seo.description,
    keywords: seo.keywords.split(',').map((k: string) => k.trim()),
    authors: [{ name: "KUUS DESIGN" }],
    creator: "KUUS DESIGN",
    publisher: "KUUS DESIGN",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}/${lang}`,
      siteName: "KUUS DESIGN",
      images: [
        {
          url: `${BASE_URL}/hero.png`,
          width: 1200,
          height: 630,
          alt: "KUUS DESIGN Premium Surfaces",
        },
      ],
      locale: OG_LOCALES[lang] ?? 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [`${BASE_URL}/hero.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}`])
      ),
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
      apple: '/apple-icon.png',
    },
  };
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const SCHEMA_I18N: Record<string, { description: string; catalog: string; services: string[] }> = {
    et: {
      description: "Premium mikrotsemendi stuudio Tartus. Kuusdisain on Luxury Concrete® ametlik edasimüüja Eestis. Vuugivabad põrandad, veekindlad vannitoad ja dekoratiivseinad.",
      catalog: "Luxury Concrete® Mikrotsemendi Süsteemid",
      services: ["Luxury Concrete® mikrotsemendi põrandad", "Luxury Concrete® mikrotsemendi vannitoad", "Luxury Concrete® mikrotsemendi seinad", "Metallilised viimistlused", "Limecrete tadelakt-mikrotsement", "Mikrotsemendi paigalduskoolitus"],
    },
    lv: {
      description: "Prēmium mikrocementa studija Tartu, Igaunijā. Kuusdisain ir oficiālais Luxury Concrete® izplatītājs Igaunijā. Bezšuvju grīdas, ūdensnecaurlaidīgas vannasistabas un dekoratīvās sienas.",
      catalog: "Luxury Concrete® Mikrocementa Sistēmas",
      services: ["Luxury Concrete® mikrocementa grīdas", "Luxury Concrete® mikrocementa vannasistabas", "Luxury Concrete® mikrocementa sienas", "Metāliskās apdares", "Limecrete tadelakt mikrocements", "Mikrocementa uzstādīšanas apmācība"],
    },
    lt: {
      description: "Aukščiausios kokybės mikrocemento studija Tartu, Estijoje. Kuusdisain yra oficialus Luxury Concrete® platintojas Estijoje. Besiūlės grindys, vandeniui atsparūs vonios kambariai ir dekoratyvinės sienos.",
      catalog: "Luxury Concrete® Mikrocemento Sistemos",
      services: ["Luxury Concrete® mikrocemento grindys", "Luxury Concrete® mikrocemento vonios kambariai", "Luxury Concrete® mikrocemento sienos", "Metalinės apdailos", "Limecrete tadelakt mikrocementas", "Mikrocemento montavimo mokymai"],
    },
    en: {
      description: "Premium microcement studio in Tartu, Estonia. Kuusdisain is the official LUXURY CONCRETE® reseller in Estonia. Seamless floors, waterproof bathrooms and decorative walls.",
      catalog: "Luxury Concrete® Microcement Systems",
      services: ["Luxury Concrete® microcement floors", "Luxury Concrete® microcement bathrooms", "Luxury Concrete® microcement walls", "Metallic finishes", "Limecrete tadelakt microcement", "Microcement installation training"],
    },
  };
  const s = SCHEMA_I18N[lang] ?? SCHEMA_I18N.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "name": "KUUS DESIGN",
    "description": s.description,
    "brand": { "@type": "Brand", "name": "Luxury Concrete®" },
    "image": `${BASE_URL}/hero.png`,
    "@id": BASE_URL,
    "url": BASE_URL,
    "telephone": "+372 55586956",
    "email": "studio@kuusdesign.ee",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mineral tn 124",
      "addressLocality": "Tartu",
      "postalCode": "51003",
      "addressCountry": "EE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 58.3780,
      "longitude": 26.7290
    },
    "areaServed": [
      { "@type": "City", "name": "Tartu" },
      { "@type": "City", "name": "Tallinn" },
      { "@type": "City", "name": "Riga" },
      { "@type": "City", "name": "Vilnius" },
      { "@type": "Country", "name": "Estonia" },
      { "@type": "Country", "name": "Latvia" },
      { "@type": "Country", "name": "Lithuania" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": s.catalog,
      "itemListElement": s.services.map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": name } }))
    },
    "sameAs": [
      "https://instagram.com/kuusdesign",
      "https://linkedin.com/company/kuusdesign",
      "https://pinterest.com/kuusdesign"
    ]
  };

  return (
    <html
      lang={lang}
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {LOCALES.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`${BASE_URL}/${locale}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/et`} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
