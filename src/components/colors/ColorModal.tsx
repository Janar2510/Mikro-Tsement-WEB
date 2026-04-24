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
            className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] bg-muted shadow-2xl overflow-hidden"
            style={{ backgroundColor: color.hex }}
          >
            {/* High-res Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] scale-150" />
            
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
