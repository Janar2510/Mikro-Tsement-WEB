import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import MicrocementPreview from "@/components/microcement-preview/MicrocementPreview";
import { VisualizeBackground } from "@/components/microcement-preview/VisualizeBackground";

const TITLES: Record<string, string> = {
  et: "Visualiseerija",
  en: "Visualise",
  de: "Visualisierung",
  ru: "Визуализатор",
  es: "Visualizador",
  fr: "Visualiser",
};

const SUBTITLES: Record<string, string> = {
  et: "Luxury Concrete® mikrotsement sinu ruumis",
  en: "Luxury Concrete® microcement in your space",
  de: "Luxury Concrete® Mikrozement in Ihrem Raum",
  ru: "Luxury Concrete® микроцемент в вашем пространстве",
  es: "Luxury Concrete® microcemento en tu espacio",
  fr: "Luxury Concrete® microciment dans votre espace",
};

const LABELS: Record<string, string> = {
  et: "Stuudio Tööriist",
  en: "Studio Tool",
  de: "Studio-Tool",
  ru: "Студийный инструмент",
  es: "Herramienta de estudio",
  fr: "Outil de studio",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: `${TITLES[lang] ?? TITLES.en} | KUUS DESIGN`,
    description: SUBTITLES[lang] ?? SUBTITLES.en,
  };
}

export default async function VisualizePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        lang={lang}
        navDict={dict.navigation}
        aiDict={dict.ai_assistant}
        isDark={false}
      />

      <div className="relative pt-[156px] pb-32">
        <VisualizeBackground />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-foreground/10 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/60 mt-0.5">{LABELS[lang] ?? LABELS.en}</p>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter italic leading-[0.9] mb-6">
              {TITLES[lang] ?? TITLES.en}
            </h1>
            <p className="font-sans text-sm md:text-base text-foreground/50 max-w-lg leading-relaxed">
              {SUBTITLES[lang] ?? SUBTITLES.en}
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-3xl border border-white/50 p-4 md:p-8 rounded-3xl shadow-2xl shadow-black/[0.03]">
            <MicrocementPreview lang={lang} />
          </div>
        </div>
      </div>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
