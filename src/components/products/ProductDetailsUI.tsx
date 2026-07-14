"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Shield, 
  Droplets, 
  Leaf, 
  Sun, 
  Edit3, 
  Wind, 
  Sparkles, 
  Zap, 
  Droplet, 
  Layers, 
  CheckCircle, 
  Heart, 
  Box, 
  Thermometer, 
  Coffee, 
  Scissors,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  ArrowLeft,
} from "lucide-react";

interface ProductDetailsUIProps {
  product: any;
  lang: string;
  slug: string;
  dict: any;
}

// Product slugs and colour-collection slugs are different taxonomies (a
// product can draw from several collections, e.g. "metallic" spans four).
// This maps each product to where its "view all colours" link should land.
const PRODUCT_COLOR_COLLECTION: Record<string, string> = {
  concrete: "colorcrete",
  monocrete: "colorcrete",
  easycret: "colorcrete",
  pigments: "colorcrete",
  "concrete-pox": "concrete-pox",
  limecrete: "limecrete",
  // metallic spans true-metal/oxid-metal/gemstone/glowing — no single page
  // covers all of it, so it links to the colours index instead.
};

const IconMap: Record<string, any> = {
  shield: Shield,
  droplets: Droplets,
  leaf: Leaf,
  sun: Sun,
  edit: Edit3,
  wind: Wind,
  sparkles: Sparkles,
  zap: Zap,
  droplet: Droplet,
  layers: Layers,
  "check-circle": CheckCircle,
  heart: Heart,
  box: Box,
  thermometer: Thermometer,
  coffee: Coffee,
  scissors: Scissors,
};

import { ColorModal } from "../colors/ColorModal";

export function ProductDetailsUI({ product, lang, slug, dict }: ProductDetailsUIProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<any>(null);

  const gallery = product.gallery || [
    `/assets/pages/products/${slug}.png`
  ];

  // Datasheets: prefer the new multi-SKU array; fall back to the legacy
  // single `datasheet` field for backward compatibility.
  const datasheets: { label: string; file: string }[] = product.datasheets?.length
    ? product.datasheets
    : product.datasheet
    ? [{ label: `${product.name} — Technical Datasheet`, file: product.datasheet }]
    : [];
  const datasheetHref = (file: string) =>
    file.startsWith("http") ? file : `/assets/datasheets/${file}`;

  // Only this product's own palette — never substitute another product's
  // colours, since that would misrepresent what's actually available.
  const productColors: any[] = product.productColors?.slice(0, 10) ?? [];

  const nextImage = () => setActiveImageIdx((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <section className="pt-[156px] pb-24 bg-[#F5F5F3] px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            href={`/${lang}/products`}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            {dict.products_ui.back_to_products}
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-12">
            <header className="space-y-6">
              <motion.h1 
                className="font-serif text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter italic leading-[0.9] break-words"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {product.name}
              </motion.h1>
              <motion.p 
                className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product.description}
              </motion.p>
            </header>

            {/* Features List */}
            <div className="space-y-10">
              {product.features?.map((feature: any, idx: number) => {
                const Icon = IconMap[feature.icon] || Shield;
                return (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-6 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-foreground/10 rounded-lg group-hover:bg-foreground group-hover:text-background transition-all duration-500 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans text-[11px] uppercase font-bold tracking-widest leading-tight">
                        {feature.title}
                      </h4>
                      <p className="font-sans text-[11px] text-foreground/50 leading-relaxed max-w-xs">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/${lang}/contact`}
                className="inline-block w-full md:w-auto bg-black text-white px-16 py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-black/80 transition-all text-center"
              >
                {dict.products_ui.get_quote}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Gallery */}
          <div className="lg:col-span-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 aspect-[4/5] bg-foreground/5 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={gallery[activeImageIdx]} 
                    alt={`${product.name} view ${activeImageIdx + 1}`}
                    fill 
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button onClick={prevImage} className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {gallery.map((_: any, i: number) => (
                  <div key={i} className={`h-1 transition-all duration-500 ${i === activeImageIdx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
                ))}
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-4 w-24">
              {gallery.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImageIdx(i)} className={`relative aspect-square w-full overflow-hidden transition-all duration-500 ${i === activeImageIdx ? 'ring-1 ring-foreground ring-offset-2 opacity-100' : 'opacity-40 grayscale hover:opacity-100'}`}>
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Colour Palette */}
        {productColors.length > 0 && (
          <div className="mt-40 space-y-12">
            <div className="flex items-end justify-between border-b border-foreground/10 pb-8">
              <div className="space-y-2">
                <h3 className="font-serif text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">— {dict.products_ui.available_colours}</h3>
                <p className="font-serif text-3xl italic tracking-tight">{product.name} Palette</p>
              </div>
              <Link href={`/${lang}/colors${PRODUCT_COLOR_COLLECTION[slug] ? `/${PRODUCT_COLOR_COLLECTION[slug]}` : ""}`} className="text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity">
                {(dict.products_ui.view_all_colours || "View all {count} colours").replace("{count}", String(product.productColors?.length ?? ""))} →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {productColors.map((color: any, i: number) => {
                const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`;
                const noiseBg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(noiseSvg)}`;
                return (
                  <motion.div
                    key={color.code}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedColor(color)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: color.hex }}>
                      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("${noiseBg}")`, backgroundSize: "200px 200px", opacity: 0.12, mixBlendMode: "overlay" }} />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(128deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.03) 40%,rgba(0,0,0,0.05) 65%,rgba(0,0,0,0.2) 100%)" }} />
                      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.22)" }} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 p-2.5">
                        <p className="text-[7px] uppercase tracking-[0.15em] text-white/55 font-medium leading-none mb-0.5">{color.code}</p>
                        <p className="font-serif text-xs italic text-white leading-tight drop-shadow-sm">{color.name}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {productColors.length === 0 && product.colorsPending && (
          <div className="mt-40 border-t border-foreground/10 pt-12">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30">
              {dict.products_ui.colours_coming_soon}
            </p>
          </div>
        )}

        {/* Technical Section */}
        <div className="mt-40 border-t border-foreground/10 pt-20">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-foreground/10 pb-8 gap-6">
              <div className="space-y-2">
                <h3 className="font-serif text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">— {dict.products_ui.documentation}</h3>
                <p className="font-serif text-3xl italic tracking-tight">{dict.products_ui.data_sheet}</p>
              </div>
              {datasheets.length === 1 && (
                <a
                  href={datasheetHref(datasheets[0].file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black/80 transition-all w-full md:w-auto"
                >
                  <Download className="w-4 h-4" />
                  {dict.products_ui.data_sheet} (PDF)
                </a>
              )}
            </div>

            {datasheets.length > 0 && (
              <div className="space-y-4">
                {datasheets.map((sheet, i) => (
                  <motion.div
                    key={sheet.file}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-foreground/5 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="w-16 h-16 flex items-center justify-center border border-foreground/10 shrink-0">
                      <FileText className="w-8 h-8 text-foreground/40" />
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30">Luxury Concrete®</p>
                      <h4 className="font-serif text-2xl italic tracking-tight">{sheet.label}</h4>
                      <p className="text-sm text-foreground/50 font-sans">
                        {dict.products_ui.datasheet_description}
                      </p>
                    </div>
                    <a
                      href={datasheetHref(sheet.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black/80 transition-all shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      {dict.products_ui.download_pdf}
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ColorModal color={selectedColor} onClose={() => setSelectedColor(null)} />
    </section>
  );
}
