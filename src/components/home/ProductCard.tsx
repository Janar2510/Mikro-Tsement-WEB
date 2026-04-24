"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  href: string;
  idx: number;
}

export function ProductCard({ name, description, image, href, idx }: ProductCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col space-y-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
    >
      <Link href={href} className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={`KUUS DESIGN - ${name} mikrotsement`}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700" />
      </Link>

      <div className="space-y-2">
        <h3 className="font-serif text-2xl uppercase tracking-widest">{name}</h3>
        <p className="text-sm text-foreground/60 font-sans tracking-wide leading-relaxed max-w-sm">
          {description}
        </p>
        <div className="pt-4">
          <Link 
            href={href} 
            className="text-[10px] uppercase font-bold tracking-[0.2em] border-b border-foreground/20 pb-1 hover:border-foreground transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
