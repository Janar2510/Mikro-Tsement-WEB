"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DecoItem {
  id: string;
  name: string;
  tag: string;
}

export function DecoWalls({ dict }: { dict: any }) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const images: Record<string, string> = {
    "deco-1": "/assets/pages/deco-walls/sculpture-painting.png",
    "deco-2": "/assets/pages/deco-walls/charcoal-abstract.png",
    "deco-3": "/assets/pages/deco-walls/red-white-relief.png",
    "deco-4": "/assets/pages/deco-walls/backlit-mirror.png",
    "deco-5": "/assets/pages/deco-walls/wave-wall.png",
    "deco-6": "/assets/pages/deco-walls/entryway-stone.png",
    "deco-7": "/assets/pages/deco-walls/earthy-abstract.png",
    "deco-8": "/assets/pages/deco-walls/white-stone-detail.png",
    "deco-9": "/assets/pages/deco-walls/moody-abstract.png",
    "deco-10": "/assets/pages/deco-walls/diagonal-relief.png",
  };

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const node = carouselRef.current;
    if (node) {
      node.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    const video = videoRef.current;
    let videoCleanup = () => {};

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const handleUserInteraction = () => {
        if (video.paused) {
          video.play().catch((err) => {
            console.warn("DecoWalls fallback play blocked:", err);
          });
        }
        cleanup();
      };

      const cleanup = () => {
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("touchstart", handleUserInteraction);
      };

      window.addEventListener("click", handleUserInteraction, { passive: true });
      window.addEventListener("touchstart", handleUserInteraction, { passive: true });

      videoCleanup = cleanup;
    }

    return () => {
      if (node) {
        node.removeEventListener("scroll", checkScroll);
      }
      videoCleanup();
    };
  }, []);



  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        id="deco-walls"
        className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <video
            ref={(el) => {
              (videoRef as any).current = el;
              if (el) {
                el.defaultMuted = true;
                el.muted = true;
              }
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="/assets/pages/home/deco-hero.mp4?v=2"
            poster="/assets/pages/home/deco-hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.8] scale-110"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

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

      <section className="py-24 md:py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/20 italic">
              — {dict.collection_label}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl uppercase italic tracking-tight">
              {dict.decorative_title}
            </h3>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-4 border border-border rounded-full transition-all ${!canScrollLeft ? 'opacity-20 cursor-not-allowed' : 'hover:bg-foreground hover:text-white'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-4 border border-border rounded-full transition-all ${!canScrollRight ? 'opacity-20 cursor-not-allowed' : 'hover:bg-foreground hover:text-white'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-8 px-6 md:px-[calc((100vw-1280px)/2+24px)] no-scrollbar scroll-smooth snap-x snap-mandatory pb-8"
          style={{ scrollPaddingLeft: '24px' }}
        >
          {dict.items.map((item: DecoItem, idx: number) => (
            <motion.div
              key={item.id}
              className="flex-none w-[300px] md:w-[450px] space-y-6 group snap-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * (idx % 3) }}
            >
              <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1.5s]">
                <Image
                  src={images[item.id] || "/assets/pages/products/furniture-main.png"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[8px] uppercase tracking-widest text-white font-bold">
                    {item.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Spacer for scroll-padding-right equivalent */}
          <div className="flex-none w-px h-full" />
        </div>
      </section>
    </>
  );
}
