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
      id: "kitchen-tartu",
      image: "/assets/pages/projects/Köök Tartus.png",
      href: `/${lang}/projects/kitchen-tartu`,
      ...dict.projects.items["kitchen-tartu"]
    },
    {
      id: "livingroom-tartu",
      image: "/assets/pages/projects/Livingroom Tartu.png",
      href: `/${lang}/projects/livingroom-tartu`,
      ...dict.projects.items["livingroom-tartu"]
    },
    {
      id: "bathroom-elva",
      image: "/assets/pages/projects/Vannituba Elva.png",
      href: `/${lang}/projects/bathroom-elva`,
      ...dict.projects.items["bathroom-elva"]
    },
    {
      id: "bathroom-polva",
      image: "/assets/pages/projects/Vannituba Põlvas.png",
      href: `/${lang}/projects/bathroom-polva`,
      ...dict.projects.items["bathroom-polva"]
    },
    {
      id: "bathroom-tartu",
      image: "/assets/pages/projects/Vannituba Tartu Kesklinn.png",
      href: `/${lang}/projects/bathroom-tartu`,
      ...dict.projects.items["bathroom-tartu"]
    },
    {
      id: "kitchen-tallinn",
      image: "/assets/pages/projects/Köök Tallinnas.png",
      href: `/${lang}/projects/kitchen-tallinn`,
      ...dict.projects.items["kitchen-tallinn"]
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
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
