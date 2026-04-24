"use client";

import { motion } from "framer-motion";

export function CTA({ dict }: { dict: any }) {
  return (
    <section className="relative py-32 md:py-56 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 z-0 opacity-20">
         <div 
           className="w-full h-full bg-cover bg-center grayscale" 
           style={{ backgroundImage: "url('/hero.png')" }}
         />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        <motion.h2 
          className="font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.9] italic whitespace-pre-line text-center"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {dict.title}
        </motion.h2>

        <motion.p 
          className="font-sans text-sm md:text-base uppercase tracking-[0.2em] font-light max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {dict.text}
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="#contact" 
            className="inline-block border border-background/40 hover:border-background px-12 py-5 uppercase tracking-widest text-xs transition-all duration-500 hover:tracking-[0.4em] active:scale-95"
          >
            {dict.button}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
