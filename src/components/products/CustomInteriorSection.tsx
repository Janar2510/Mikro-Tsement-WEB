"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CustomInteriorItem {
  id: string;
  name: string;
  description: string;
}

interface CustomInteriorSectionProps {
  dict: {
    title: string;
    subtitle: string;
    items: CustomInteriorItem[];
  };
}

const NUMBERS = ["01", "02", "03", "04", "05", "06"];

export function CustomInteriorSection({ dict }: CustomInteriorSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      {/* Parallax Hero */}
      <section
        ref={heroRef}
        className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.15] brightness-[0.75] scale-110"
          >
            <source src="/assets/pages/home/Home hero section 2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
 
        <motion.div
          className="relative z-10 text-center flex flex-col items-center max-w-5xl px-4"
          style={{ y: textY }}
        >
          <motion.h2
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-white uppercase tracking-tighter leading-[0.9] italic drop-shadow-2xl"
            initial={{ opacity: 0, y: 40, skewY: 5 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {dict.title}
          </motion.h2>
          <motion.p
            className="mt-8 md:mt-12 max-w-xl text-white/70 text-sm md:text-base font-sans tracking-[0.2em] uppercase leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {dict.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* Cards Grid */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-foreground/8">
            {dict.items.map((item, idx) => (
              <motion.div
                key={item.id}
                className="border-b border-r border-foreground/8 p-8 sm:p-10 space-y-6 group hover:bg-[#FAF5F2] transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.08 * idx }}
              >
                <span className="font-serif text-5xl italic text-foreground/8 group-hover:text-foreground/15 transition-colors duration-500 select-none block">
                  {NUMBERS[idx]}
                </span>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl uppercase tracking-widest group-hover:italic transition-all duration-300">
                    {item.name}
                  </h3>
                  <p className="font-sans text-xs text-foreground/50 uppercase tracking-widest leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
