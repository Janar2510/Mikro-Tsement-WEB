"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  animate,
} from "framer-motion";
import Image from "next/image";

interface StoryHeroProps {
  title: string;
  subtitle: string;
  lang: string;
}

const STATS: Record<string, { value: number; suffix: string; label: string }[]> = {
  et: [
    { value: 100, suffix: "%", label: "Käsitöö" },
    { value: 11,  suffix: "+", label: "Basebetoni süsteemi" },
    { value: 366, suffix: "",  label: "Värvivalikut" },
  ],
  en: [
    { value: 100, suffix: "%", label: "Handcrafted" },
    { value: 11,  suffix: "+", label: "Basebeton systems" },
    { value: 366, suffix: "",  label: "Colours" },
  ],
};

// Basebeton Originale colour strip — first 10 neutrals
const COLOUR_STRIP = [
  "#B2AFAC","#B1AFAA","#9F9D97","#8D8A85","#82837F",
  "#797672","#63605C","#616161","#9C9088","#ACA098",
];

function AnimatedStat({ value, suffix, label, delay }: {
  value: number; suffix: string; label: string; delay: number;
}) {
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = motionVal.on("change", v => setDisplay(Math.round(v)));
    return () => { controls.stop(); unsub(); };
  }, [value, delay, motionVal]);

  return (
    <div className="space-y-1.5">
      <p className="font-serif text-3xl italic tracking-tight">
        {display}{suffix}
      </p>
      <p className="text-[8px] uppercase tracking-[0.28em] text-foreground/35 font-bold">{label}</p>
    </div>
  );
}

export function StoryHero({ title, subtitle, lang }: StoryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);

  // Parallax on watermark
  const { scrollY } = useScroll();
  const watermarkY  = useTransform(scrollY, [0, 600], ["0%", "20%"]);

  // 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-12, 12]);
  const rotateXRaw = useTransform(mouseY, [0, 1], [7, -7]);
  const rotateY    = useSpring(rotateYRaw, { stiffness: 70, damping: 22 });
  const rotateX    = useSpring(rotateXRaw, { stiffness: 70, damping: 22 });
  const shadowX    = useTransform(rotateY, [-12, 12], [18, -18]);
  const shadowY    = useTransform(rotateX, [-7, 7], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  const words = title.split(" ");
  const stats = STATS[lang] ?? STATS.en;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-background"
    >

      {/* ── Parallax watermark ───────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden select-none"
        style={{ y: watermarkY }}
      >
        <span
          className="font-serif italic leading-none text-foreground whitespace-nowrap"
          style={{ fontSize: "24vw", opacity: 0.025 }}
        >
          KUUS
        </span>
      </motion.div>

      {/* ── Subtle noise grain ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>')}")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── LEFT: Text panel ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center pt-36 md:pt-0 px-8 md:px-16 lg:px-24 pb-16 md:pb-0 md:flex-1">

        {/* Location label */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-px bg-foreground/25 origin-left"
            initial={{ scaleX: 0, width: 32 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: 32 }}
          />
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-foreground/35">
            Est. 2024 · Tartu, Estonia
          </span>
        </motion.div>

        {/* Title */}
        <h1
          className="font-serif uppercase italic tracking-tighter leading-[0.9] mb-10"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.14em]"
              initial={{ opacity: 0, y: 56, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Ruled line */}
        <motion.div
          className="h-px bg-foreground/12 mb-8 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtitle */}
        <motion.p
          className="font-sans text-sm text-foreground/55 uppercase tracking-widest leading-loose max-w-[28ch]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>

        {/* Stats — animated counters */}
        <motion.div
          className="flex gap-10 mt-14 pt-8 border-t border-foreground/8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={1.5 + i * 0.15}
            />
          ))}
        </motion.div>

        {/* Basebeton colour strip */}
        <motion.div
          className="flex gap-0.5 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          {COLOUR_STRIP.map((hex, i) => (
            <motion.div
              key={hex}
              className="h-1 flex-1"
              style={{ backgroundColor: hex }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 2.0 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>
        <motion.p
          className="text-[7px] uppercase tracking-[0.3em] text-foreground/25 font-bold mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          Basebeton Originale — {lang === "et" ? "75 värvi" : "75 colours"}
        </motion.p>
      </div>

      {/* ── RIGHT: Layered image cluster ─────────────────────── */}
      <div
        ref={imageRef}
        className="hidden md:flex flex-1 max-w-[48%] relative items-center justify-center py-20 pr-16 pl-8"
        style={{ perspective: "1100px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        {/* Secondary image — peeking behind, offset top-left */}
        <motion.div
          className="absolute top-[15%] left-[4%] w-[38%] aspect-[3/4] overflow-hidden grayscale"
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 0.7, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotate: "-4deg" }}
        >
          <Image
            src="/assets/pages/products/beton-cire-2.png"
            alt="Basebeton surface"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/30" />
        </motion.div>

        {/* Tertiary image — bottom right corner accent */}
        <motion.div
          className="absolute bottom-[12%] right-[6%] w-[30%] aspect-square overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 0.85, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotate: "3deg" }}
        >
          <Image
            src="/assets/pages/products/basebeton-originale-2.png"
            alt="Basebeton Originale"
            fill
            className="object-cover grayscale"
          />
        </motion.div>

        {/* Main tiltable card */}
        <motion.div
          className="relative w-full max-w-[320px] z-10"
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Curtain wipe reveal */}
          <motion.div
            className="relative aspect-[3/4] overflow-hidden"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/pages/about/About Us.jpg"
              alt="KUUS DESIGN Atelier"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <span className="font-sans text-[8px] uppercase tracking-[0.35em] text-white/50 font-bold">
                — Tartu Studio
              </span>
            </motion.div>
          </motion.div>

          {/* Dynamic shadow */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              x: shadowX,
              y: shadowY,
              filter: "blur(36px)",
              backgroundColor: "rgba(15,23,42,0.18)",
            }}
          />

          {/* Floating depth badge */}
          <motion.div
            className="absolute -bottom-5 -right-5 bg-background border border-foreground/10 px-4 py-3 shadow-lg"
            style={{ transform: "translateZ(30px)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif italic text-lg leading-none">Premium</p>
            <p className="text-[8px] uppercase tracking-[0.25em] text-foreground/40 font-bold mt-0.5">Microcement</p>
          </motion.div>
        </motion.div>

        {/* Vertical side label */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          <div className="w-px h-14 bg-foreground/12" />
          <span
            className="text-[7px] uppercase tracking-[0.4em] text-foreground/25 font-bold"
            style={{ writingMode: "vertical-rl" }}
          >
            KUUS DESIGN
          </span>
          <div className="w-px h-14 bg-foreground/12" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.div
            className="w-px h-10 bg-foreground/20 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          />
          <span className="text-[7px] uppercase tracking-[0.35em] text-foreground/25 font-bold">Scroll</span>
        </motion.div>
      </div>

      {/* Mobile image strip */}
      <motion.div
        className="md:hidden relative h-64 w-full overflow-hidden"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src="/assets/pages/about/About Us.jpg" alt="KUUS DESIGN" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </motion.div>
    </section>
  );
}
