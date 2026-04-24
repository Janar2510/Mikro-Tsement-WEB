"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailsUIProps {
  project: any;
  lang: string;
  slug: string;
}

export function ProjectDetailsUI({ project, lang, slug }: ProjectDetailsUIProps) {
  const images: Record<string, string> = {
    villa: "/assets/pages/projects/residential.png",
    boutique: "/assets/pages/projects/commercial.png",
    spa: "/assets/pages/projects/hospitality.png",
  };

  return (
    <>
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src={images[slug] || images.villa} 
            alt={project.name} 
            fill 
            className="object-cover grayscale"
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
              Case Study — {project.location}
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
                     { label: "Year", value: project.year || "2023" },
                     { label: "Architect", value: "KUUS DESIGN Studio" },
                     { label: "Surface Area", value: "450 m²" },
                     { label: "Tone", value: "Mineral Bone" }
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
                    ← Back to Portfolio
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
                <div className="grid grid-cols-1 gap-12 pt-20">
                   <motion.div 
                     className="relative aspect-[3/2] bg-muted grayscale overflow-hidden"
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                   >
                      <Image 
                        src={images[slug] || images.villa} 
                        alt="Detail 1" 
                        fill 
                        className="object-cover opacity-50"
                      />
                   </motion.div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
