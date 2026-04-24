import { getDictionary } from "@/i18n/get-dictionary";
import { TopcretGuideUI } from "@/components/guide/TopcretGuideUI";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function TopcretGuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <Navbar 
        lang={lang} 
        navDict={dictionary.navigation} 
        aiDict={dictionary.ai_assistant}
      />
      <TopcretGuideUI dict={dictionary} lang={lang} />
      <Footer lang={lang} navDict={dictionary.navigation} footerDict={dictionary.footer} />
    </main>
  );
}
