"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundVideoPoster?: string;
  fullHeight?: boolean;
}

export function SectionHero({ title, subtitle, backgroundImage, backgroundVideo, backgroundVideoPoster, fullHeight }: SectionHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Double-ensure attributes programmatically
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.play().catch(() => {});

    const handleUserInteraction = () => {
      if (video.paused) {
        video.play().catch((err) => {
          console.warn("SectionHero fallback play blocked:", err);
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

    return cleanup;
  }, [backgroundVideo]);

  return (
    <section className={`relative w-full ${fullHeight ? "h-screen" : "min-h-[60vh]"} flex items-center pt-36 md:pt-[220px] pb-20 px-6 overflow-hidden`}>
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <div
          ref={(el) => {
            if (el) {
              const video = el.querySelector('video');
              if (video) {
                (videoRef as any).current = video;
                video.defaultMuted = true;
                video.muted = true;
                video.playsInline = true;
              }
            }
          }}
          className="w-full h-full object-cover"
          dangerouslySetInnerHTML={{
            __html: `
              <video
                autoplay
                loop
                muted
                playsinline
                preload="auto"
                src="${backgroundVideo}"
                poster=""
                class="w-full h-full object-cover"
              ></video>
            `
          }}
        />
        </div>
      )}
      
      {backgroundImage && !backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className={(backgroundImage || backgroundVideo) ? "" : "border-b border-border/50 pb-20"}>
          <motion.h1
            className={`font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter italic mb-8 ${(backgroundImage || backgroundVideo) ? "text-white drop-shadow-2xl" : "text-foreground"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              className={`font-sans text-sm md:text-base uppercase tracking-[0.2em] max-w-xl leading-loose ${(backgroundImage || backgroundVideo) ? "text-white/85 drop-shadow-lg" : "text-foreground/70"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
