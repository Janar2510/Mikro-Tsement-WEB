"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

import { usePathname } from "next/navigation";

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  navDict?: any;
}

const LANGUAGES = ["EN", "ET", "DE", "RU", "ES", "FR"];

export function NavDrawer({ isOpen, onClose, lang, navDict }: NavDrawerProps) {
  const pathname = usePathname();

  // Helper to change locale in current path
  const getPathForLocale = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split("/");
    segments[1] = newLocale.toLowerCase();
    return segments.join("/");
  };

  const categories = [
    { id: "basebeton-originale", image: "/assets/surfaces/microcemento.png", href: "/products/basebeton-originale", label: "Basebeton Originale" },
    { id: "oxidestuc",           image: "/assets/surfaces/real-metals.png",  href: "/products/oxidestuc",           label: "Oxidestuc" },
    { id: "stuccopuro",          image: "/assets/surfaces/summery.png",       href: "/products/stuccopuro",          label: "Stuccopuro" },
  ];

  const mainLinks = [
    { id: "products", href: "/products" },
    { id: "story", href: "/story" },
    { id: "blog", href: "/blog" },
    { id: "projects", href: "/projects", sub: ["Gallery", "Stories", "Map"] },
    { id: "colors", href: "/colors" },
    { id: "guide", href: "/guide/basebeton" },
    { id: "faq", href: "/faq" },
    { id: "business", href: "/business" },
    { id: "events", href: "/events" },
    { id: "contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-2xl bg-background shadow-2xl overflow-y-auto"
          >
            <div className="p-6 md:p-10 min-h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <Link href={`/${lang}`} className="block w-32 md:w-40" onClick={onClose}>
                  <Image 
                    src="/assets/brand/logos/Micro Logo.png"
                    alt="KUUS DESIGN Logo"
                    width={160}
                    height={48}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <button onClick={onClose} className="p-2 hover:opacity-50 transition-opacity">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Visual Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${lang}${cat.href}`}
                    className="group relative h-40 overflow-hidden"
                    onClick={onClose}
                  >
                    <Image
                      src={cat.image}
                      alt={navDict?.products_items?.[cat.id]?.name || cat.id}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <span className="absolute bottom-4 left-4 text-white text-[10px] uppercase tracking-widest font-medium">
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Main Links */}
              <nav className="flex flex-col space-y-4 mb-8">
                {mainLinks.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="space-y-2">
                       <Link
                        href={`/${lang}${link.href}`}
                        className="font-serif text-2xl md:text-3xl uppercase tracking-tighter hover:italic transition-all"
                        onClick={onClose}
                      >
                        {navDict?.[link.id] || link.id}
                      </Link>
                      {link.id === 'projects' && link.sub && (
                        <div className="flex gap-4 pl-1">
                          {link.sub.map((s) => (
                            <span key={s} className="text-[10px] uppercase tracking-widest text-foreground/40 italic">
                              — {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </nav>

              {/* Footer / Languages */}
              <div className="mt-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {LANGUAGES.map((l) => (
                    <Link
                      key={l}
                      href={getPathForLocale(l)}
                      className={`hover:text-primary transition-colors ${l === lang.toUpperCase() ? "text-primary border-b border-primary font-black" : "text-foreground/40"}`}
                      onClick={onClose}
                    >
                      {l}
                    </Link>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/30">
                  EST 2024 • KUUS DESIGN
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
