"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Team({ dict }: { dict: any }) {
  const images = [
    "/assets/team/erik-tamm.png",
    "/assets/team/liis-koppel.png"
  ];

  return (
    <section className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="max-w-xl">
             <motion.h2 
               className="font-serif text-4xl md:text-6xl tracking-tight uppercase"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
               {dict.title}
             </motion.h2>
           </div>
           <motion.p 
             className="font-sans text-sm uppercase tracking-widest text-foreground/60 max-w-sm"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
             {dict.subtitle}
           </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {dict.members.map((member: any, idx: number) => (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F0F0F0] mb-8">
                 <Image 
                   src={images[idx] || images[0]} 
                   alt={member.name} 
                   fill 
                   className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                 />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl uppercase tracking-widest">{member.name}</h3>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40">{member.role}</p>
                <p className="font-sans text-sm text-foreground/70 max-w-sm pt-4 leading-relaxed italic">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
