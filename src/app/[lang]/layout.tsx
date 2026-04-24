import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KUUS DESIGN | Premium Microcement Surfaces Tallinn",
  description: "Handcrafted, premium microcement surfaces for luxury interiors. Seamless architectural finishes, bathroom renovations, and bespoke mineral textures.",
  keywords: ["mikrotsement", "mikrotsemendi paigaldus", "mikrotsemendi müük", "mikrotsemendi hind", "microcement tallinn", "seamless floors", "bathroom renovation without demolition"],
  authors: [{ name: "KUUS DESIGN" }],
  openGraph: {
    title: "KUUS DESIGN | Premium Microcement Surfaces",
    description: "Architectural microcement for luxury interiors. Handcrafted in Tallinn.",
    url: "https://kuusdesign.ee",
    siteName: "KUUS DESIGN",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "KUUS DESIGN Premium Surfaces",
      },
    ],
    locale: "et_EE",
    type: "website",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "et" }, { lang: "de" }, { lang: "ru" }, { lang: "es" }, { lang: "fr" }];
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
    "@type": "LocalBusiness",
    "name": "KUUS DESIGN",
    "image": "https://kuusdesign.ee/hero.png",
    "@id": "https://kuusdesign.ee",
    "url": "https://kuusdesign.ee",
    "telephone": "+372 555 124 12",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mineral tn 124",
      "addressLocality": "Tallinn",
      "postalCode": "10115",
      "addressCountry": "EE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 59.437,
      "longitude": 24.7535
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://instagram.com/kuusdesign",
      "https://facebook.com/kuusdesign"
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
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
