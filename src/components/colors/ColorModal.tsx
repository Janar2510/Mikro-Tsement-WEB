"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ColorItem {
  code: string;
  name: string;
  hex: string;
}

interface ColorModalProps {
  color: ColorItem | null;
  onClose: () => void;
}

const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/></filter><rect width="300" height="300" filter="url(#n)"/></svg>`;
const NOISE_BG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(noiseSvg)}`;

export function ColorModal({ color, onClose }: ColorModalProps) {
  return (
    <AnimatePresence>
      {color && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
        >
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] shadow-2xl overflow-hidden"
            style={{ backgroundColor: color.hex }}
          >
            {/* Fractal noise grain */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `url("${NOISE_BG}")`,
              backgroundSize: "300px 300px",
              opacity: 0.16,
              mixBlendMode: "overlay",
            }} />

            {/* Trowel stroke marks */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(128deg, transparent, transparent 12px, rgba(255,255,255,0.02) 12px, rgba(255,255,255,0.02) 13px)",
            }} />

            {/* Directional light */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(128deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.05) 35%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.28) 100%)",
            }} />

            {/* Ambient highlight */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 60%)",
              mixBlendMode: "screen",
            }} />

            {/* Edge vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
              boxShadow: "inset 0 0 120px rgba(0,0,0,0.35)",
            }} />

            <div className="absolute top-8 right-8 z-10">
              <button
                onClick={onClose}
                className="p-4 bg-background/10 hover:bg-background/20 backdrop-blur-md rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            <div className="absolute bottom-12 left-12 space-y-2 text-white">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs uppercase tracking-[0.5em] font-bold opacity-60"
              >
                {color.code}
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-5xl md:text-7xl uppercase tracking-tighter italic"
              >
                {color.name}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 64 }}
                transition={{ delay: 0.4 }}
                className="h-px bg-white/40 mt-6"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
