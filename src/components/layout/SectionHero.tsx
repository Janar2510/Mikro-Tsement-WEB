"use client";

import { motion } from "framer-motion";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
}

export function SectionHero({ title, subtitle }: SectionHeroProps) {
  return (
    <section className="pt-36 md:pt-[220px] pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto border-b border-border/50 pb-20">
        <motion.h1
          className="font-serif text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter italic mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className="font-sans text-sm md:text-base text-foreground/60 uppercase tracking-widest max-w-xl leading-loose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
