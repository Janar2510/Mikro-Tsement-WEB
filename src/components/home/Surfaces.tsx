"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Surfaces({ dict }: { dict: any }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);



  const images: Record<string, string> = {
    "surface-1": "/assets/pages/products/basebeton-originale-2.png",
    "surface-2": "/assets/pages/products/beton-cire-1.png",
    "surface-3": "/assets/pages/products/OXIDESTUC9.jpeg",
    "surface-4": "/assets/pages/products/basebeton-solid-1.png",
    "surface-5": "/assets/pages/products/stuccopuro-1.png",
    "surface-6": "/assets/pages/products/basebeton-grit-1.png",
  };

  return (
    <>
      <section
        ref={heroRef}
        id="surfaces"
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
            class="absolute inset-0 w-full h-full object-cover brightness-[0.95] scale-110"
          ></video>
          <div class="absolute inset-0 bg-black/20"></div>
          `}}
        />

        <motion.div
          className="relative z-10 text-center flex flex-col items-center max-w-5xl px-4"
          style={{ y: textY }}
        >
          <motion.h2
            className="font-serif text-5xl md:text-7xl lg:text-9xl text-white uppercase tracking-tighter leading-[0.9] italic"
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

      <section className="py-24 md:py-40 bg-[#FAF5F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.items.map((surface: any, idx: number) => (
              <motion.div
                key={surface.id}
                className="relative group overflow-hidden bg-white aspect-[4/5]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={images[surface.id] || "/surface-bone.png"}
                    alt={`${surface.name} - premium mikrotsement pind`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-700" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="backdrop-blur-md bg-white/20 p-6 border border-white/50">
                    <h3 className="font-serif text-xl text-white uppercase tracking-widest mb-1">{surface.name}</h3>
                    <p className="text-white/90 text-[10px] uppercase tracking-widest font-light">{surface.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
