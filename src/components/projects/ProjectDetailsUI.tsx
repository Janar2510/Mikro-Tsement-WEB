"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailsUIProps {
  project: any;
  lang: string;
  slug: string;
  labels: any;
}

export function ProjectDetailsUI({ project, lang, slug, labels }: ProjectDetailsUIProps) {
  const projectImages: Record<string, string[]> = {
    "kitchen-tartu": [
      "/assets/pages/projects/Köök Tartus.png",
      "/assets/pages/projects/Kitchen Tartu.png"
    ],
    "livingroom-tartu": [
      "/assets/pages/projects/Livingroom Tartu.png",
      "/assets/pages/projects/Elutuba Tartus3.png"
    ],
    "bathroom-elva": [
      "/assets/pages/projects/Vannituba Elva.png"
    ],
    "bathroom-polva": [
      "/assets/pages/projects/Vannituba Põlvas.png"
    ],
    "bathroom-tartu": [
      "/assets/pages/projects/Vannituba Tartu Kesklinn.png",
      "/assets/pages/projects/Vannituba Tartu.png"
    ],
    "kitchen-tallinn": [
      "/assets/pages/projects/Köök Tallinnas.png",
      "/assets/pages/projects/Köök Tallinas2.png"
    ]
  };

  const currentImages = projectImages[slug] || projectImages["kitchen-tartu"];
  const coverImage = currentImages[0];
  const galleryImages = currentImages.slice(1);

  return (
    <>
      <div className="relative h-[55vh] md:h-[65vh] max-h-[650px] w-full bg-muted/30 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src={coverImage} 
            alt={project.name} 
            fill 
            className="object-cover object-center"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-20 md:pb-[20px] text-background">
          <div className="max-w-7xl mx-auto space-y-4">
            <motion.span 
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold opacity-60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {labels?.case_study || "Case Study"} — {project.location}
            </motion.span>
            <motion.h1 
              className="font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter italic leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               {project.name}
            </motion.h1>
          </div>
        </div>
      </div>
      
      <section className="py-24 bg-background px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-start">
             {/* Left Column: Metadata */}
             <div className="space-y-16 lg:sticky lg:top-32">
                <div className="grid grid-cols-2 gap-8 border-y border-border/50 py-12">
                   {[
                     { label: labels?.year || "Year", value: project.year || "2026" },
                     { label: labels?.architect || "Architect", value: "KUUS DISAIN" },
                     { label: labels?.surface_area || "Surface Area", value: project.area || "TBD" },
                     { label: labels?.tone || "Tone", value: project.tone || "Custom" }
                   ].map((item, i) => (
                     <motion.div 
                       key={item.label} 
                       className="space-y-2"
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.1 * i }}
                     >
                        <span className="text-[10px] uppercase font-bold text-foreground/30 tracking-widest">{item.label}</span>
                        <p className="font-serif text-2xl italic">{item.value}</p>
                     </motion.div>
                   ))}
                </div>

                <div className="pt-8">
                  <Link 
                    href={`/${lang}/projects`}
                    className="text-[10px] uppercase font-bold tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors py-4 inline-block"
                  >
                    ← {labels?.back || "Back to Portfolio"}
                  </Link>
                </div>
             </div>

             {/* Right Column: Narrative */}
             <div className="space-y-12">
                <motion.h2 
                  className="font-serif text-3xl md:text-4xl uppercase tracking-widest leading-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.h2>
                <div className="space-y-8">
                   <motion.p 
                     className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                   >
                     {project.longDescription}
                   </motion.p>
                </div>

                {/* Optional Gallery Placeholders */}
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-1 gap-12 pt-20">
                     {galleryImages.map((img, idx) => (
                       <motion.div 
                         key={idx}
                         className="relative bg-muted overflow-hidden rounded-md aspect-[4/3] max-h-[550px]"
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                       >
                          <Image 
                            src={img} 
                            alt={`${project.name} - Detail ${idx + 1}`} 
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center"
                          />
                       </motion.div>
                     ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
