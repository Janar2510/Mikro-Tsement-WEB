"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface VisualizeCTAProps {
  lang: string;
  dict?: {
    badge?: string;
    title?: string;
    desc?: string;
    button?: string;
  };
}

export function VisualizeCTA({ lang, dict }: VisualizeCTAProps) {
  const badge  = dict?.badge  ?? "Studio Tool";
  const title  = dict?.title  ?? "See it in your space";
  const desc   = dict?.desc   ?? "Upload a photo, tap any wall, instantly preview Basebeton finishes.";
  const button = dict?.button ?? "Try Visualiser";

  return (
    <section className="relative py-32 md:py-48 bg-foreground text-background overflow-hidden">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>')}")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-background/40"
            >
              — {badge}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter italic leading-[0.9]"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-sm md:text-base text-background/60 leading-relaxed max-w-md"
            >
              {desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href={`/${lang}/visualize`}
                className="inline-flex items-center gap-3 border border-background/30 text-background px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-background hover:text-foreground transition-all duration-500 group"
              >
                {button}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right: swatch preview strip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-3 gap-1.5 aspect-square max-w-sm ml-auto">
              {[
                "#B2AFAC","#DED2C7","#BDB0A8",
                "#ACA098","#797672","#63605C",
                "#616161","#9E897D","#8D8A85",
              ].map((hex, i) => (
                <div
                  key={hex}
                  className="aspect-square relative overflow-hidden"
                  style={{ backgroundColor: hex }}
                >
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(128deg,rgba(255,255,255,0.15) 0%,transparent 50%,rgba(0,0,0,0.15) 100%)",
                  }} />
                </div>
              ))}
            </div>
            <p className="text-[8px] uppercase tracking-[0.25em] font-bold text-background/25 text-right mt-3">
              Basebeton Originale — 75 colours
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
