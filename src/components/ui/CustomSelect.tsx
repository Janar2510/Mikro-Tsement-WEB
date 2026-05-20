"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSelectProps {
  label: string;
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function CustomSelect({
  label,
  options,
  placeholder = "Select...",
  value = "",
  onChange,
  className = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Label */}
      <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border-b border-foreground/10 py-2 text-left transition-colors duration-300 hover:border-foreground/30 focus:outline-none group"
      >
        <span
          className={`font-serif text-sm tracking-tight transition-all duration-300 ${
            selected
              ? "italic text-foreground"
              : "text-foreground/30 not-italic font-sans text-[11px] uppercase tracking-widest"
          }`}
        >
          {selected || placeholder}
        </span>

        {/* Animated chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-3 h-3 text-foreground/30 shrink-0"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-background border border-foreground/8 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {options.map((opt, idx) => (
              <motion.button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, delay: idx * 0.03 }}
                className={`
                  w-full text-left px-5 py-3.5 flex items-center gap-4
                  font-sans text-[10px] uppercase tracking-[0.18em]
                  border-b border-foreground/5 last:border-0
                  transition-all duration-200 group
                  ${selected === opt
                    ? "bg-foreground text-background"
                    : "hover:bg-[#FAF5F2] text-foreground/60 hover:text-foreground"
                  }
                `}
              >
                {/* Active indicator dot */}
                <span
                  className={`w-1 h-1 rounded-full shrink-0 transition-all duration-300 ${
                    selected === opt ? "bg-background" : "bg-foreground/0 group-hover:bg-foreground/20"
                  }`}
                />
                <span
                  className={`transition-all duration-200 ${
                    selected === opt ? "font-serif italic text-sm tracking-tight" : ""
                  }`}
                >
                  {opt}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
