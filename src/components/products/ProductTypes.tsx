"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Leaf, Zap, Shield, Droplets, Thermometer, Box, Sparkles } from "lucide-react";

interface ProductTypesProps {
  dict: any;
  lang: string;
}

const icons: Record<number, any> = {
  0: Leaf, // Baxab-Eco
  1: Sparkles, // Deco Walls
  2: Leaf, // EcoCemento
  3: Shield, // Baxab
  4: Box, // Microcemento
  5: Droplets, // T/Swim
  6: Thermometer, // Summery
  7: Zap, // Real Metals
};

export function ProductTypes({ dict, lang }: ProductTypesProps) {
  const d = dict.products.products_types;

  return (
    <section className="py-32 bg-[#FBFBFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter italic">
              {d.title}
            </h2>
            <div className="w-20 h-px bg-foreground/20" />
            <p className="font-sans text-lg text-foreground/70 leading-relaxed max-w-xl">
              {d.sustainability}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pt-24"
          >
            <div className="p-10 bg-background border border-border shadow-sm space-y-6">
               <Zap className="w-8 h-8 text-foreground/40" />
               <p className="font-sans text-base text-foreground/80 leading-relaxed italic">
                 "{d.efficiency}"
               </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {d.items.map((item: any, i: number) => {
            const Icon = icons[i] || Check;
            return (
              <motion.div 
                key={i}
                className="group p-10 bg-background border border-border hover:border-foreground/20 transition-all duration-700 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-2xl uppercase tracking-tight italic group-hover:translate-x-2 transition-transform duration-500">
                      {item.name}
                    </h3>
                    <Icon className="w-5 h-5 text-foreground/20 group-hover:text-foreground transition-colors duration-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-foreground/40">
                      {lang === "et" ? "Ideaalne" : "Ideal For"}
                    </span>
                    <p className="text-[10px] uppercase tracking-widest leading-relaxed">
                      {item.ideal}
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                    {item.desc}
                  </p>
                  <Link 
                    href={`/${lang}/products/${item.slug}`}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
                  >
                    {lang === "et" ? "Loe rohkem" : "Learn More"} <span className="text-lg">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
