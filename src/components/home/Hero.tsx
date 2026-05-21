"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  dict: {
    title: string;
    subtitle: string;
    cta: string;
  };
  lang: string;
}

const VIDEO_SRC = "/assets/pages/home/home-hero.mp4?v=2";

export function Hero({ dict, lang }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = sectionRef.current?.querySelector("video");
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">

      <div 
        className="absolute inset-0 z-0"
        dangerouslySetInnerHTML={{ __html: `
        <video
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          src="${VIDEO_SRC}"
          poster="/assets/pages/home/hero-poster.jpg"
          class="absolute inset-0 w-full h-full object-cover"
        ></video>
        `}}
      />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-5xl px-4">
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-9xl text-white uppercase tracking-tighter leading-[0.9] italic"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 },
            },
          }}
        >
          {dict.title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 40, skewY: 5 },
                visible: {
                  opacity: 1,
                  y: 0,
                  skewY: 0,
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}&nbsp;
              {(i === 1 || i === 3) && <br />}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-8 md:mt-12 max-w-xl text-white/85 text-sm md:text-base font-sans tracking-[0.2em] uppercase leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {dict.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          <Link
            href={`/${lang}#surfaces`}
            className="border border-white/60 text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors duration-500"
          >
            {dict.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
