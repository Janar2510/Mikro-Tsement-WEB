"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface CustomInteriorItem {
  id: string;
  name: string;
  description: string;
  image: string;
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

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);



  return (
    <>
      {/* Parallax Hero */}
      <section
        ref={heroRef}
        className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ y: videoY }}
          dangerouslySetInnerHTML={{ __html: `
          <video
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            src="/assets/pages/home/home-hero-2.mp4?v=2"
            poster="/assets/pages/home/surfaces-poster.jpg"
            class="absolute inset-0 w-full h-full object-cover scale-110"
          ></video>
          `}}
        />
 
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {dict.items.map((item, idx) => (
              <motion.div
                key={item.id}
                className="space-y-8 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.08 * idx }}
              >
                <div className="relative aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="font-serif text-5xl italic text-white/40 group-hover:text-white transition-colors duration-500 select-none block">
                      {NUMBERS[idx]}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4 max-w-xl">
                  <h3 className="font-serif text-3xl md:text-4xl uppercase tracking-widest group-hover:italic transition-all duration-300">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-foreground/50 uppercase tracking-widest leading-relaxed">
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
