"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Award, CheckCircle } from "lucide-react";

interface WorkshopSectionProps {
  dict: {
    label: string;
    title: string;
    subtitle: string;
    intro: string;
    tiers: {
      type: string;
      badge: string;
      duration: string;
      description: string;
      includes: string[];
    }[];
    certificate: {
      title: string;
      desc: string;
    };
    cta: string;
  };
  lang: string;
}

export function WorkshopSection({ dict, lang }: WorkshopSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <>
      {/* Parallax Hero */}
      <section
        ref={heroRef}
        className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-[0.9] scale-110"
          >
            <source src="/assets/pages/products/Product videos.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4"
          style={{ y: textY }}
        >
          <motion.span
            className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-bold mb-6 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            — {dict.label}
          </motion.span>
          <motion.h2
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-[0.9] italic"
            initial={{ opacity: 0, y: 40, skewY: 5 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {dict.title}
          </motion.h2>
          <motion.p
            className="mt-8 max-w-xl text-white/70 text-sm md:text-base font-sans tracking-[0.15em] uppercase leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {dict.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-24 md:py-40 bg-[#FAF5F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Intro */}
          <motion.p
            className="font-sans text-sm md:text-base text-foreground/60 uppercase tracking-widest leading-loose max-w-3xl mx-auto text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {dict.intro}
          </motion.p>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {dict.tiers.map((tier, idx) => (
              <motion.div
                key={tier.type}
                className="bg-white border border-foreground/5 p-8 sm:p-12 space-y-8 group hover:border-foreground/20 transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30">
                    {tier.badge}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl uppercase italic tracking-tight">
                    {tier.type}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/50 font-bold">
                    {tier.duration}
                  </p>
                </div>

                <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                  {tier.description}
                </p>

                <ul className="space-y-3">
                  {tier.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-foreground/30 mt-0.5 shrink-0" />
                      <span className="font-sans text-[11px] uppercase tracking-widest text-foreground/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certificate Section */}
          <motion.div
            className="bg-foreground text-background p-8 sm:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="shrink-0 w-20 h-20 rounded-full border border-background/20 flex items-center justify-center">
              <Award className="w-10 h-10 text-background/70" />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h4 className="font-serif text-2xl sm:text-3xl uppercase italic tracking-tight">
                {dict.certificate.title}
              </h4>
              <p className="font-sans text-sm text-background/60 uppercase tracking-widest leading-relaxed max-w-xl">
                {dict.certificate.desc}
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href={`/${lang}/contact`}
              className="inline-block border border-foreground/40 text-foreground px-10 py-5 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-500"
            >
              {dict.cta}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
