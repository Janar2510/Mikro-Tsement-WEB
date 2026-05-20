import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHero } from "@/components/layout/SectionHero";
import { ProjectCard } from "@/components/home/ProjectCard";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const projects = [
    {
      id: "boutique",
      image: "/assets/pages/projects/commercial.jpg",
      href: `/${lang}/projects/boutique`,
      ...dict.projects.items.boutique
    },
    {
      id: "eramu",
      image: "/assets/pages/projects/residential.png",
      href: `/${lang}/projects/eramu`,
      ...dict.projects.items.eramu
    },
    {
      id: "lino",
      image: "/assets/pages/projects/lino-bathroom.png",
      href: `/${lang}/projects/lino`,
      ...dict.projects.items.lino
    },
    {
      id: "spa",
      image: "/assets/pages/projects/hospitality.png",
      href: `/${lang}/projects/spa`,
      ...dict.projects.items.spa
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
        title={dict.projects.title} 
        subtitle={dict.projects.subtitle}
        backgroundVideo="/assets/pages/projects/projects-hero.mp4?v=2"
        fullHeight={true}
      />
      
      <section className="py-24 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col space-y-32">
            {projects.map((project, idx) => (
              <ProjectCard 
                key={project.id}
                name={project.name}
                location={project.location}
                description={project.description}
                image={project.image}
                href={project.href}
                idx={idx}
                labels={dict.projects.labels}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} navDict={dict.navigation} footerDict={dict.footer} />
    </main>
  );
}
