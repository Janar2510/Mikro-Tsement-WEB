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
  Download
} from "lucide-react";

interface ProductDetailsUIProps {
  product: any;
  lang: string;
  slug: string;
  dict: any;
}

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

  const popularColors = dict.colors.collections.timeless.items.slice(0, 6);

  const nextImage = () => setActiveImageIdx((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <section className="pt-[156px] pb-24 bg-[#F5F5F3] px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* ... (existing content) ... */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-12">
            <header className="space-y-6">
              <motion.h1 
                className="font-serif text-6xl md:text-7xl uppercase tracking-tighter italic leading-none"
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
                Get a Quote
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
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
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Colours Section */}
        <div className="mt-40 space-y-12">
          <div className="flex items-end justify-between border-b border-foreground/10 pb-8">
            <div className="space-y-2">
              <h3 className="font-serif text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">— {dict.colors.popular.title}</h3>
              <p className="font-serif text-3xl italic tracking-tight">{dict.colors.popular.subtitle}</p>
            </div>
            <Link href={`/${lang}/colors`} className="text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity">View All Colours —</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularColors.map((color: any, i: number) => (
              <motion.div
                key={color.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer space-y-4"
                onClick={() => setSelectedColor(color)}
              >
                <div className="aspect-square relative overflow-hidden bg-muted transition-transform duration-700 group-hover:scale-[1.02]" style={{ backgroundColor: color.hex }}>
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')]" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40">{color.code}</p>
                  <p className="font-serif text-lg italic tracking-tight">{color.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-foreground/10 pt-20">
          <div className="space-y-8">
            <h3 className="font-serif text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">— {dict.products_ui.documentation}</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: dict.products_ui.manual, path: "/docs/manuals/installation.pdf" },
                { label: dict.products_ui.data_sheet, path: "/docs/technical/data-sheet.pdf" }
              ].map((doc, i) => (
                <a key={i} href={doc.path} className="flex items-center justify-between p-6 bg-white border border-foreground/5 hover:border-foreground/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <FileText className="w-4 h-4 text-foreground/30" />
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold group-hover:italic transition-all">{doc.label}</span>
                  </div>
                  <Download className="w-4 h-4 text-foreground/20 group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="font-serif text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">— Technical Specifications</h3>
            <div className="grid grid-cols-1 gap-y-4">
              {product.details?.specs.map((spec: any, idx: number) => (
                <div key={idx} className="flex justify-between items-baseline border-b border-foreground/5 pb-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-foreground/40">{spec.label}</span>
                  <span className="font-serif text-lg italic">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ColorModal color={selectedColor} onClose={() => setSelectedColor(null)} />
    </section>
  );
}
