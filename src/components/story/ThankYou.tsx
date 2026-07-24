"use client";

import { motion } from "framer-motion";
import { brandName } from "@/lib/brand";

export function ThankYou({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section className="py-32 md:py-56 bg-foreground text-background text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none italic mb-12">
            {dict.title.split(' ').map((word: string, i: number) => (
              <span key={i}>
                {word} {i === 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.2em] font-light max-w-xl mx-auto opacity-70">
            {dict.text}
          </p>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
           <span className="text-[20vw] font-serif italic text-white/5 whitespace-nowrap select-none">
             {brandName(lang)}
           </span>
        </div>
      </div>
    </section>
  );
}
