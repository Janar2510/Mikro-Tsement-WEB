"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function TimelessCollection({ dict }: { dict: any }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = heroRef.current?.querySelector("video");
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const images: Record<string, string> = {
    "timeless-1": "/assets/pages/products/basebeton-originale-1.png",
    "timeless-2": "/assets/pages/products/OXIDESTUC10.webp",
    "timeless-3": "/assets/pages/products/stuccopuro-1.png",
  };

  return (
    <>
      <section
        ref={heroRef}
        id="timeless"
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
            src="/assets/pages/products/product-videos.mp4?v=2"
            poster="/assets/pages/products/product-videos-poster.jpg"
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

      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {dict.items.map((item: any, idx: number) => (
              <motion.div
                key={item.id}
                className="space-y-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
              >
                <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[1.5s]">
                  <Image
                    src={images[item.id]}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl uppercase tracking-widest">{item.name}</h3>
                  <p className="font-sans text-xs text-foreground/40 uppercase tracking-widest leading-relaxed">
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
