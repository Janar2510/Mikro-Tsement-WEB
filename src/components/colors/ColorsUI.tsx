"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { ColorModal } from "./ColorModal";

interface ColorItem {
  code: string;
  name: string;
  hex: string;
}

interface ColorsUIProps {
  dict: any;
  lang: string;
}

export function ColorsUI({ dict, lang }: ColorsUIProps) {
  const d = dict.colors;
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);

  return (
    <section className="pt-[188px] pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl uppercase tracking-tighter italic"
          >
            {d.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-lg text-foreground/60 max-w-2xl"
          >
            {d.subtitle}
          </motion.p>
        </div>

        <div className="space-y-32">
          {Object.entries(d.collections).map(([key, collection]: [string, any], idx: number) => (
            <div key={key} className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/50 pb-8">
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl uppercase tracking-tight italic">
                    {collection.title}
                  </h2>
                  <p className="font-sans text-sm text-foreground/50 uppercase tracking-widest">
                    {collection.description}
                  </p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30">
                  Collection {idx + 1} / 4
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {collection.items.map((item: ColorItem, i: number) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group cursor-pointer space-y-4"
                    onClick={() => setSelectedColor(item)}
                  >
                    <div 
                      className="aspect-square relative overflow-hidden bg-muted transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{ backgroundColor: item.hex }}
                    >
                      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')]" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5">
                        <Maximize2 className="w-6 h-6 text-white/50" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40">
                        {item.code}
                      </p>
                      <p className="font-serif text-lg italic tracking-tight">
                        {item.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ColorModal 
        color={selectedColor} 
        onClose={() => setSelectedColor(null)} 
      />
    </section>
  );
}
