"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ArrowRight, Shield, Droplets, Layers, Sparkles, Leaf, Wrench } from "lucide-react";

interface TopcretGuideUIProps {
  dict: any;
  lang: string;
}

const icons: Record<string, any> = {
  versatility: Sparkles,
  durability: Shield,
  customization: Layers,
  waterproof: Droplets,
  thickness: ArrowRight,
  flexibility: Sparkles,
  eco: Leaf,
  maintenance: Wrench,
};

export function TopcretGuideUI({ dict, lang }: TopcretGuideUIProps) {
  const g = dict.guide_topcret;

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] italic mb-8">
              {g.title}
            </h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 mb-12">
              — {g.subtitle}
            </p>
            <p className="font-sans text-lg text-foreground/70 leading-relaxed max-w-lg mb-12">
              {g.description}
            </p>
          </motion.div>

          <motion.div 
            className="relative aspect-[4/5] bg-muted overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Image 
              src="https://topcret.com/wp-content/uploads/2023/03/foto001.webp"
              alt="Topcret Minimalistic Interior"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* What is Microcement Section */}
        {g.what_is && (
          <section className="mb-40">
            <div className="max-w-4xl">
              <motion.h2 
                className="font-serif text-3xl uppercase tracking-tighter mb-12 italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {g.what_is.title}
              </motion.h2>
              <div className="space-y-8">
                {g.what_is.paragraphs.map((p: string, i: number) => (
                  <motion.p 
                    key={i}
                    className="font-sans text-lg text-foreground/70 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Applications Section */}
        {g.applications && (
          <section className="mb-40">
            <motion.h2 
              className="font-serif text-3xl uppercase tracking-tighter mb-16 italic text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {g.applications.title}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {g.applications.items.map((item: any, i: number) => (
                <motion.div 
                  key={i}
                  className="space-y-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h3 className="font-serif text-2xl italic tracking-tight group-hover:text-foreground/80 transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-12 h-px bg-foreground/10 group-hover:w-24 transition-all duration-700" />
                  <p className="font-sans text-base text-foreground/60 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Advantages Grid */}
        <section className="mb-40">
          <motion.h2 
            className="font-serif text-3xl uppercase tracking-tighter mb-16 italic text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {g.advantages_title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {Object.entries(g.advantages).map(([key, adv]: [string, any], i: number) => {
              const Icon = icons[key] || Check;
              return (
                <motion.div 
                  key={key}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                    {adv.title}
                  </h3>
                  <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                    {adv.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Technical Process */}
        <section className="mb-40 bg-[#FAF5F2] -mx-6 px-6 py-32 border-y border-border/50">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="font-serif text-3xl uppercase tracking-tighter mb-20 italic text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {g.process_title}
            </motion.h2>
            <div className="space-y-12">
              {g.process_steps.map((step: any, i: number) => (
                <motion.div 
                  key={i}
                  className="flex gap-8 md:gap-12 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="font-serif text-5xl italic text-foreground/10 group-hover:text-foreground/30 transition-colors">
                    0{i + 1}
                  </span>
                  <div className="pt-4 space-y-2 border-b border-foreground/5 pb-8 flex-1">
                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                      {step.title}
                    </h3>
                    <p className="font-sans text-base text-foreground/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Surface Finishes */}
        <section className="mb-40">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2 
              className="font-serif text-3xl uppercase tracking-tighter mb-8 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {g.finishes_title}
            </motion.h2>
            <motion.p 
              className="font-sans text-base text-foreground/60 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {g.finishes_intro}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {g.finishes_list.map((finish: any, i: number) => (
              <motion.div 
                key={i}
                className="p-8 border border-foreground/5 hover:border-foreground/20 transition-all duration-500 bg-foreground/[0.01] flex flex-col justify-between aspect-square md:aspect-auto md:h-64"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="space-y-4">
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-foreground/30">
                    Finish 0{i + 1}
                  </span>
                  <h3 className="font-serif text-2xl italic tracking-tight">
                    {finish.title}
                  </h3>
                </div>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                  {finish.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="relative aspect-square md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
               <Image 
                src="/assets/pages/products/furniture-main.png"
                alt="Architectural Furniture"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <motion.div 
              className="relative aspect-video lg:aspect-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
               <Image 
                src="/assets/pages/products/flooring-s1.png"
                alt="Seamless Surface"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <motion.div 
              className="relative aspect-square md:aspect-auto lg:row-span-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
               <Image 
                src="/assets/pages/products/bathrooms-main.png"
                alt="Minimalist Bathroom"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <motion.div 
              className="relative aspect-square lg:col-span-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
               <Image 
                src="/assets/pages/products/flooring-main.png"
                alt="Microcement Flooring"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
