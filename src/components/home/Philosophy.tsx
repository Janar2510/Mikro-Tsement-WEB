"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhilosophyProps {
  dict: {
    title: string;
    text: string;
  };
}

export function Philosophy({ dict }: PhilosophyProps) {
  return (
    <section id="philosophy" className="py-24 md:py-40 bg-background text-foreground relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
           <motion.h2 
             className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] uppercase italic"
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: { staggerChildren: 0.1 }
               }
             }}
           >
             {dict.title.split(' ').map((word: string, i: number) => (
               <motion.span 
                 key={i} 
                 className="inline-block"
                 variants={{
                   hidden: { opacity: 0, x: -10 },
                   visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                 }}
               >
                 {word}&nbsp;
               </motion.span>
             ))}
           </motion.h2>
           <motion.div
             className="w-12 h-[1px] bg-foreground/30"
             variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
             transition={{ duration: 1, delay: 0.5 }}
           />
           <motion.p 
             className="font-sans text-sm md:text-base text-foreground/75 leading-relaxed max-w-md"
             variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
             transition={{ duration: 0.8, delay: 0.6 }}
           >
             {dict.text}
           </motion.p>
        </motion.div>

        <motion.div
          className="relative h-72 sm:h-[400px] lg:h-[600px] w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image 
            src="/assets/surfaces/philosophy-bg.png"
            alt="Beautiful architectural interior with microcement walls"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>

      </div>
    </section>
  );
}
