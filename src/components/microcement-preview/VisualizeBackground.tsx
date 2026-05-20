"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function VisualizeBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform values for parallax (inverted and varying strengths for depth)
  const x1 = useTransform(springX, [-1, 1], [-40, 40]);
  const y1 = useTransform(springY, [-1, 1], [-40, 40]);
  
  const x2 = useTransform(springX, [-1, 1], [60, -60]);
  const y2 = useTransform(springY, [-1, 1], [60, -60]);

  const x3 = useTransform(springX, [-1, 1], [-20, 20]);
  const y3 = useTransform(springY, [-1, 1], [-20, 20]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ perspective: "1200px" }}>
      {/* 1. Ambient Liquid Orbs (Lighting & Depth) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-foreground/[0.06] blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-foreground/[0.08] blur-[90px]"
      />

      {/* 2. 3D Floating Glass Panes */}
      <motion.div
        style={{ x: x1, y: y1 }}
        animate={{
          rotateX: [25, 35, 25],
          rotateY: [-20, -10, -20],
          z: [0, 80, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[2%] w-[450px] h-[550px] rounded-3xl overflow-hidden border-t border-l border-white/40 border-r border-b border-foreground/10 backdrop-blur-[40px] shadow-2xl shadow-black/10 hidden md:block"
      >
        <Image src="/hero.png" alt="" fill className="object-cover opacity-40 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#D9CDBF]/30 to-transparent mix-blend-overlay" />
      </motion.div>
      
      <motion.div
        style={{ x: x2, y: y2 }}
        animate={{
          rotateX: [-15, -5, -15],
          rotateY: [15, 25, 15],
          z: [0, -60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[5%] right-[-2%] w-[500px] h-[400px] rounded-[3rem] overflow-hidden border-t border-l border-white/50 border-r border-b border-foreground/10 backdrop-blur-3xl shadow-2xl shadow-black/15 hidden md:block"
      >
        <Image src="/cat-bathroom.png" alt="" fill className="object-cover opacity-[0.35] mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-tl from-[#A8B2A9]/40 to-transparent mix-blend-color" />
      </motion.div>

      <motion.div
        style={{ x: x3, y: y3 }}
        animate={{
          rotateZ: [0, 15, 0],
          rotateX: [15, 25, 15],
          rotateY: [35, 45, 35],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[35%] right-[15%] w-[250px] h-[250px] rounded-full overflow-hidden border border-white/30 backdrop-blur-2xl shadow-xl shadow-black/10 hidden lg:block"
      >
        <Image src="/surface-sand.png" alt="" fill className="object-cover opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C6BBAE]/50 to-transparent" />
      </motion.div>

      {/* 3. Premium Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}
