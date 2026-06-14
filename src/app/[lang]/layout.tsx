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

const BASE_URL = "https://kuusdesign.ee";
const LOCALES = ["et", "en", "de", "ru", "es", "fr"];

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
      locale: lang === 'et' ? 'et_EE' : 'en_US',
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
      apple: '/icon.png',
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "name": "KUUS DESIGN",
    "description": lang === "et"
      ? "Premium Basebeton mikrotsemendi stuudio Tartus. Vuugivabad põrandad, veekindlad vannitoad ja dekoratiivseinad. EC1 Plus sertifitseeritud."
      : "Premium Basebeton microcement studio in Tartu, Estonia. Seamless floors, waterproof bathrooms and decorative walls. EC1 Plus certified.",
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
      { "@type": "Country", "name": "Estonia" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === "et" ? "Basebeton Mikrotsemendi Süsteemid" : "Basebeton Microcement Systems",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": lang === "et" ? "Basebeton mikrotsemendi põrandad" : "Basebeton microcement floors" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": lang === "et" ? "Basebeton mikrotsemendi vannitoad" : "Basebeton microcement bathrooms" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": lang === "et" ? "Basebeton mikrotsemendi seinad" : "Basebeton microcement walls" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": lang === "et" ? "Oxidestuc metalliline viimistlus" : "Oxidestuc metallic finish" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": lang === "et" ? "Natureplast savikrohv" : "Natureplast clay plaster" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": lang === "et" ? "Mikrotsemendi paigalduskoolitus" : "Microcement installation training" } }
      ]
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
