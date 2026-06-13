"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ColorModal } from "./ColorModal";

interface ColorItem { code: string; name: string; hex: string; }
interface ColorsUIProps { dict: any; lang: string; }

const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/></filter><rect width="300" height="300" filter="url(#n)"/></svg>`;
const NOISE_BG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(noiseSvg)}`;

function brightness(hex: string) {
  return (parseInt(hex.slice(1,3),16) + parseInt(hex.slice(3,5),16) + parseInt(hex.slice(5,7),16)) / 3;
}

// Pick a spread of 8 representative colours: 2 light, 3 mid, 3 dark
function pickPreview(items: ColorItem[]): ColorItem[] {
  if (items.length <= 8) return items;
  const sorted = [...items].sort((a, b) => brightness(b.hex) - brightness(a.hex));
  const step = Math.floor(sorted.length / 8);
  return Array.from({ length: 8 }, (_, i) => sorted[Math.min(i * step, sorted.length - 1)]);
}

export function ColorsUI({ dict, lang }: ColorsUIProps) {
  const d = dict.colors;
  const ui = d.ui;
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);

  const collections = Object.entries(d.collections) as [string, any][];
  const totalColors = collections.reduce((sum, [, c]) => sum + (c.items?.length ?? 0), 0);

  return (
    <section className="pt-[188px] pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter italic">
              {d.title}
            </h1>
            <p className="font-sans text-base text-foreground/60 max-w-2xl leading-relaxed">
              {d.subtitle}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-8 pt-2"
          >
            <div>
              <p className="font-serif text-4xl italic">{totalColors}</p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">{ui.totalColours}</p>
            </div>
            <div>
              <p className="font-serif text-4xl italic">{collections.length}</p>
              <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">{ui.productPalettes}</p>
            </div>
          </motion.div>
        </div>

        {/* Product palette cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {collections.map(([slug, collection], idx) => {
            const preview = pickPreview(collection.items ?? []);
            const nLight = (collection.items ?? []).filter((c: ColorItem) => brightness(c.hex) > 185).length;
            const nMid   = (collection.items ?? []).filter((c: ColorItem) => brightness(c.hex) > 100 && brightness(c.hex) <= 185).length;
            const nDark  = (collection.items ?? []).filter((c: ColorItem) => brightness(c.hex) <= 100).length;

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group space-y-6"
              >
                {/* Spectrum bar — click opens product palette */}
                <Link href={`/${lang}/colors/${slug}`} className="block">
                  <div className="relative overflow-hidden">
                    {/* Horizontal spectrum */}
                    <div className="flex h-40 gap-0.5">
                      {preview.map((c, i) => (
                        <div
                          key={c.code}
                          className="flex-1 relative transition-transform duration-500 group-hover:scale-y-[1.03] origin-bottom"
                          style={{ backgroundColor: c.hex }}
                        >
                          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("${NOISE_BG}")`, backgroundSize: "200px 200px", opacity: 0.1, mixBlendMode: "overlay" }} />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(128deg,rgba(255,255,255,0.15) 0%,transparent 50%,rgba(0,0,0,0.15) 100%)" }} />
                        </div>
                      ))}
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-foreground">
                        {ui.viewColours.replace("{count}", String(collection.items?.length ?? 0))} →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Info row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <Link href={`/${lang}/colors/${slug}`}>
                      <h2 className="font-serif text-xl italic tracking-tight hover:opacity-70 transition-opacity">
                        {collection.title}
                      </h2>
                    </Link>
                    <p className="font-sans text-[11px] text-foreground/50 leading-relaxed max-w-xs">
                      {collection.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                    <span className="font-serif text-2xl italic text-foreground">{collection.items?.length ?? 0}</span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/30">{ui.colours}</span>
                  </div>
                </div>

                {/* Tone breakdown */}
                <div className="flex gap-3">
                  {nLight > 0 && (
                    <div className="flex-1 text-center py-2 bg-foreground/[0.03] border border-foreground/5">
                      <p className="font-serif text-base italic">{nLight}</p>
                      <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mt-0.5">{ui.light}</p>
                    </div>
                  )}
                  {nMid > 0 && (
                    <div className="flex-1 text-center py-2 bg-foreground/[0.03] border border-foreground/5">
                      <p className="font-serif text-base italic">{nMid}</p>
                      <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mt-0.5">{ui.mid}</p>
                    </div>
                  )}
                  {nDark > 0 && (
                    <div className="flex-1 text-center py-2 bg-foreground/[0.03] border border-foreground/5">
                      <p className="font-serif text-base italic">{nDark}</p>
                      <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mt-0.5">{ui.dark}</p>
                    </div>
                  )}
                  <Link
                    href={`/${lang}/colors/${slug}`}
                    className="flex-1 flex items-center justify-center py-2 bg-foreground/[0.03] border border-foreground/5 text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/40 hover:bg-foreground hover:text-background transition-all duration-500"
                  >
                    {ui.viewAll}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ColorModal color={selectedColor} onClose={() => setSelectedColor(null)} />
    </section>
  );
}
