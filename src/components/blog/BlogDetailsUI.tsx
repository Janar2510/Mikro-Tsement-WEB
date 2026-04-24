"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BlogDetailsUIProps {
  post: any;
  lang: string;
}

export function BlogDetailsUI({ post, lang }: BlogDetailsUIProps) {
  return (
    <section className="pt-40 pb-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <motion.span 
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            — {post.date || "Journal Entry"}
          </motion.span>
          <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter italic leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {post.title}
          </motion.h1>
        </div>
        
        <motion.div 
          className="relative aspect-[16/9] w-full overflow-hidden grayscale bg-muted"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
           <Image 
             src={post.image || "/assets/pages/story/origin.png"} 
             alt={post.title} 
             fill 
             className="object-cover"
             priority
           />
        </motion.div>

        <div className="pt-12 space-y-16">
          <motion.p 
            className="font-sans text-xl md:text-2xl text-foreground font-light leading-relaxed max-w-2xl italic border-l-2 border-foreground/10 pl-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {post.excerpt}
          </motion.p>

          <div className="space-y-12 pb-24 border-b border-border/50">
             {post.content.map((paragraph: string, idx: number) => (
               <motion.p 
                 key={idx} 
                 className="font-sans text-base md:text-lg text-foreground/70 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:leading-[1]"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.1 * idx }}
               >
                 {paragraph}
               </motion.p>
             ))}
          </div>

          <div className="flex justify-between items-center py-12">
             <Link 
               href={`/${lang}/blog`}
               className="text-[10px] uppercase font-bold tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors"
             >
               ← Return to Journal
             </Link>
             
             <div className="flex gap-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-foreground/20">Share</span>
                <div className="w-4 h-4 rounded-full bg-foreground/10" />
                <div className="w-4 h-4 rounded-full bg-foreground/10" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
