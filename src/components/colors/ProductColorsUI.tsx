"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { ColorModal } from "./ColorModal";

interface ColorItem { code: string; name: string; hex: string; }

interface Props {
  lang: string;
  slug: string;
  collection: { title: string; description: string; items: ColorItem[] };
  product?: any;
  dict: any;
}

const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/></filter><rect width="300" height="300" filter="url(#n)"/></svg>`;
const NOISE_BG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(noiseSvg)}`;

function brightness(hex: string) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return (r + g + b) / 3;
}

function SwatchCard({ item, onClick, size = "normal" }: { item: ColorItem; onClick: () => void; size?: "normal" | "small" }) {
  const aspect = size === "small" ? "aspect-square" : "aspect-[4/3]";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative ${aspect} overflow-hidden`} style={{ backgroundColor: item.hex }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("${NOISE_BG}")`, backgroundSize: "300px 300px", opacity: 0.14, mixBlendMode: "overlay" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(128deg,transparent,transparent 9px,rgba(255,255,255,0.018) 9px,rgba(255,255,255,0.018) 10px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(128deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.04) 38%,rgba(0,0,0,0.06) 62%,rgba(0,0,0,0.24) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 35% 30%,rgba(255,255,255,0.1) 0%,transparent 65%)", mixBlendMode: "screen" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 50px rgba(0,0,0,0.28)" }} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-2.5">
          <p className="text-[7px] uppercase tracking-[0.15em] text-white/55 font-medium leading-none mb-0.5">{item.code}</p>
          <p className="font-serif text-xs italic text-white leading-tight drop-shadow-sm">{item.name}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductColorsUI({ lang, slug, collection, product, dict }: Props) {
  const ui = dict.colors.ui;
  const [selected, setSelected] = useState<ColorItem | null>(null);
  const [toneFilter, setToneFilter] = useState<"all" | "light" | "mid" | "dark">("all");

  // Group by tone
  const { lights, mids, darks } = useMemo(() => {
    const l: ColorItem[] = [], m: ColorItem[] = [], d: ColorItem[] = [];
    collection.items.forEach(c => {
      const b = brightness(c.hex);
      if (b > 185) l.push(c);
      else if (b > 100) m.push(c);
      else d.push(c);
    });
    return { lights: l, mids: m, darks: d };
  }, [collection.items]);

  const filtered = useMemo(() => {
    if (toneFilter === "light") return lights;
    if (toneFilter === "mid") return mids;
    if (toneFilter === "dark") return darks;
    return collection.items;
  }, [toneFilter, collection.items, lights, mids, darks]);

  const groups = toneFilter === "all"
    ? [
        { label: ui.lightTones, count: lights.length, items: lights },
        { label: ui.midTones, count: mids.length, items: mids },
        { label: ui.darkTones, count: darks.length, items: darks },
      ].filter(g => g.items.length > 0)
    : [{ label: toneFilter === "light" ? ui.lightTones : toneFilter === "mid" ? ui.midTones : ui.darkTones, count: filtered.length, items: filtered }];

  const FILTERS = [
    { key: "all",   label: `${ui.all} ${collection.items.length}` },
    { key: "light", label: `${ui.light} ${lights.length}` },
    { key: "mid",   label: `${ui.mid} ${mids.length}` },
    { key: "dark",  label: `${ui.dark} ${darks.length}` },
  ] as const;

  return (
    <section className="pt-[156px] pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back + breadcrumb */}
        <div className="flex items-center gap-4 mb-16">
          <Link
            href={`/${lang}/colors`}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            {ui.allPalettes}
          </Link>
          <span className="text-foreground/20">·</span>
          <Link
            href={`/${lang}/products/${slug}`}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 hover:text-foreground transition-colors"
          >
            {collection.title}
          </Link>
        </div>

        {/* Hero header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 pb-16 border-b border-border/50">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">— {ui.colourPalette}</p>
              <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter italic leading-[0.9]">
                {collection.title}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-sm text-foreground/60 leading-relaxed max-w-sm"
            >
              {collection.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-8 pt-2"
            >
              <div>
                <p className="font-serif text-3xl italic">{collection.items.length}</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">{ui.totalColours}</p>
              </div>
              {lights.length > 0 && (
                <div>
                  <p className="font-serif text-3xl italic">{lights.length}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">{ui.lightTones}</p>
                </div>
              )}
              {mids.length > 0 && (
                <div>
                  <p className="font-serif text-3xl italic">{mids.length}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">{ui.midTones}</p>
                </div>
              )}
              {darks.length > 0 && (
                <div>
                  <p className="font-serif text-3xl italic">{darks.length}</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">{ui.darkTones}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Mini spectrum preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex gap-1 h-24 lg:h-auto lg:max-h-48 self-center"
          >
            {collection.items.map((c, i) => (
              <div
                key={c.code}
                className="flex-1 min-w-0 cursor-pointer hover:scale-y-110 transition-transform duration-300 origin-bottom"
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelected(c)}
                title={`${c.code} ${c.name}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Tone filter tabs */}
        <div className="flex items-center gap-1 mb-16 border-b border-border/30 pb-0">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setToneFilter(f.key)}
              className={`px-5 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border-b-2 -mb-px ${
                toneFilter === f.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/30 hover:text-foreground/60"
              }`}
            >
              {f.label}
            </button>
          ))}
          {product?.datasheet && (
            <a
              href={`/assets/datasheets/${product.datasheet}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30 hover:text-foreground transition-colors pb-3"
            >
              <Download className="w-3 h-3" />
              {ui.datasheet}
            </a>
          )}
        </div>

        {/* Colour groups */}
        <div className="space-y-20">
          {groups.map((group) => (
            <div key={group.label} className="space-y-8">
              <div className="flex items-baseline gap-4">
                <h2 className="font-serif text-2xl italic tracking-tight">{group.label}</h2>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/25">{group.count} {ui.colours}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.02, 0.4) }}
                  >
                    <SwatchCard item={item} onClick={() => setSelected(item)} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 pt-16 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-serif text-2xl italic">{collection.title}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">{product?.tagline ?? collection.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}/products/${slug}`}
              className="inline-block border border-foreground/30 px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-all duration-500"
            >
              {ui.viewProduct}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-block bg-foreground text-background px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-foreground/80 transition-all duration-500"
            >
              {ui.requestSample}
            </Link>
          </div>
        </div>
      </div>

      <ColorModal color={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
