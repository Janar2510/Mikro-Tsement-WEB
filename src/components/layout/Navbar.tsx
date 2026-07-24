"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sparkles, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { brandName } from "@/lib/brand";
import { NavDrawer } from "./NavDrawer";
import { AIAssistant } from "@/components/search/AIAssistant";

interface NavbarProps {
  lang: string;
  navDict?: any;
  aiDict?: any;
  isDark?: boolean;
}

export function Navbar({ lang, navDict, aiDict, isDark = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/90 backdrop-blur-md h-20 shadow-sm border-b border-border/50 text-foreground"
            : cn("bg-transparent h-24", isDark ? "text-white" : "text-foreground")
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href={`/${lang}`} className="relative z-50 block w-40 md:w-48">
            <Image 
              src="/assets/brand/logos/Micro Logo.png"
              alt={`${brandName(lang)} Logo`}
              width={200}
              height={60}
              className={cn(
                "transition-all duration-500",
                (isDark && !isScrolled) ? "brightness-0 invert" : ""
              )}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </Link>

          <div className="flex items-center gap-8">
            {/* Minimal Desktop Links - Just the priorities */}
            <nav className="hidden md:flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em]">
              <Link href={`/${lang}`} className="hover:opacity-60 transition-opacity">
                {navDict?.home || "Home"}
              </Link>
              <Link href={`/${lang}/products`} className="hover:opacity-60 transition-opacity">
                {navDict?.products || "Products"}
              </Link>
              <Link href={`/${lang}/story`} className="hover:opacity-60 transition-opacity">
                {navDict?.story || "Our Story"}
              </Link>
              <Link href={`/${lang}/contact`} className="hover:opacity-60 transition-opacity">
                {navDict?.contact || "Contact"}
              </Link>
            </nav>

            {/* Visualizer Link Button */}
            <Link 
              href={`/${lang}/visualize`} 
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-[10px] uppercase font-bold tracking-[0.2em] rounded-full hover:bg-foreground/80 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            >
              <Camera className="w-3.5 h-3.5" />
              {navDict?.visualizer || (lang === 'et' ? 'Visualiseerija' : 'Visualizer')}
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="group flex items-center gap-3 p-2 focus:outline-none"
              aria-label="Open menu"
            >
              <span className="hidden md:block text-[10px] uppercase font-bold tracking-[0.2em] group-hover:opacity-60 transition-opacity">
                {navDict?.menu || (lang === 'et' ? "Menüü" : "Menu")}
              </span>
              <Menu className="w-6 h-6" />
            </button>

            {/* AI Assistant Trigger */}
            <button
               onClick={() => setIsAIOpen(true)}
               className="flex items-center gap-3 p-2 focus:outline-none group"
               aria-label="Open AI Assistant"
            >
               <span className="hidden md:block text-[10px] uppercase font-bold tracking-[0.2em] group-hover:opacity-60 transition-opacity">
                 {aiDict?.trigger || "AI"}
               </span>
               <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <NavDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        lang={lang}
        navDict={navDict}
      />

      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        lang={lang} 
        dict={aiDict}
      />
    </>
  );
}
