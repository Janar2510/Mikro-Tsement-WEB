"use client";

import { motion } from "framer-motion";

export function Methodology({ dict }: { dict: any }) {
  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <motion.div
              className="sticky top-32"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="font-serif text-4xl md:text-5xl uppercase tracking-tighter mb-8 italic"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {dict.title.split(' ').map((word: string, i: number) => (
                  <motion.span 
                    key={i} 
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
                    }}
                  >
                    {word}&nbsp;
                    {(i === 1 || i === 3) && <br />}
                  </motion.span>
                ))}
              </motion.h2>
              <p className="font-sans text-sm text-foreground/60 leading-relaxed uppercase tracking-widest max-w-xs">
                {dict.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 space-y-24">
            {dict.steps.map((step: any, idx: number) => (
              <motion.div
                key={step.number}
                className="flex flex-col md:flex-row gap-8 md:gap-16 border-b border-border pb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * idx }}
              >
                <span className="font-serif text-6xl md:text-8xl text-foreground/10 leading-none">
                  {step.number}
                </span>
                <div className="flex-1 space-y-4">
                  <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-widest">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-foreground/70 leading-relaxed max-w-lg">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
