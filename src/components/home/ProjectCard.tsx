"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  name: string;
  location: string;
  description: string;
  image: string;
  href: string;
  idx: number;
}

export function ProjectCard({ name, location, description, image, href, idx }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col space-y-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
    >
      <Link href={href} className="relative aspect-[16/9] lg:aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700" />
        <div className="absolute top-6 left-6 flex flex-col">
           <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">Location</span>
           <span className="text-sm uppercase tracking-widest text-white font-bold">{location}</span>
        </div>
      </Link>

      <div className="space-y-4">
        <h3 className="font-serif text-3xl md:text-4xl uppercase tracking-widest leading-none">
          <Link href={href} className="hover:italic transition-all duration-500">{name}</Link>
        </h3>
        <p className="text-sm md:text-base text-foreground/60 font-sans tracking-wide leading-relaxed max-w-2xl">
          {description}
        </p>
        <div className="pt-4">
          <Link 
            href={href} 
            className="text-[10px] uppercase font-bold tracking-[0.3em] border-b border-foreground/20 pb-1 hover:border-foreground transition-colors"
          >
            Explore Journal
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
