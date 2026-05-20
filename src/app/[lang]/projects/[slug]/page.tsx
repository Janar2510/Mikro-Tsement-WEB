import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailsUI } from "@/components/projects/ProjectDetailsUI";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  
  const project = dict.projects.items[slug as keyof typeof dict.projects.items];
  
  if (!project) {
    notFound();
  }

  return (
    <main>
      <Navbar lang={lang} navDict={dict.navigation} aiDict={dict.ai_assistant} isDark={true} />
      
      <ProjectDetailsUI 
        project={project} 
        lang={lang} 
        slug={slug} 
        labels={dict.projects.labels}
      />

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
