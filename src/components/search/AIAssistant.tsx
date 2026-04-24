"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  dict: any;
}

export function AIAssistant({ isOpen, onClose, lang, dict }: AIAssistantProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!dict) return null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulated RAG Response for now
    setTimeout(() => {
      const assistantResponse = getSimulatedResponse(userMessage, lang);
      setMessages((prev) => [...prev, { role: "assistant", content: assistantResponse }]);
      setIsTyping(false);
    }, 1500);
  };

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-background z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-border/50 flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 italic">
                  <Sparkles className="w-3 h-3" />
                  — {dict.title}
                </div>
                <h2 className="font-serif text-3xl uppercase tracking-tighter italic">
                  {dict.title}
                </h2>
                <p className="font-sans text-xs text-foreground/40 uppercase tracking-widest max-w-xs leading-relaxed">
                  {dict.subtitle}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-muted transition-colors rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 px-12">
                  <MessageSquare className="w-8 h-8 font-light" />
                  <p className="font-sans text-[10px] uppercase tracking-widest leading-loose">
                    {dict.empty_state}
                  </p>
                </div>
              )}

              {messages.map((ms, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    ms.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <span className="text-[8px] uppercase tracking-widest font-bold mb-2 opacity-30">
                    {ms.role === "user" ? "Client" : "Studio AI"}
                  </span>
                  <div className={cn(
                    "p-5 text-sm leading-relaxed",
                    ms.role === "user" 
                      ? "bg-foreground text-background font-sans" 
                      : "bg-[#FAF5F2] text-foreground font-serif italic border border-foreground/5 shadow-sm"
                  )}>
                    {ms.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start"
                >
                   <span className="text-[8px] uppercase tracking-widest font-bold mb-2 opacity-30">
                    Studio AI
                  </span>
                  <div className="bg-[#FAF5F2] p-5 flex gap-2">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-8 border-t border-border/50">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.input_placeholder}
                  className="w-full bg-[#FAF5F2] border-none py-5 pl-6 pr-16 text-xs uppercase tracking-widest font-sans focus:ring-1 focus:ring-foreground/10 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-foreground/5 transition-colors disabled:opacity-20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getSimulatedResponse(query: string, lang: string): string {
  const q = query.toLowerCase();
  
  if (lang === 'et') {
    if (q.includes('plaadi') || q.includes('vannitu')) {
      return "Jah, KUUS DESIGN süsteemi saab paigaldada otse vanadele plaatidele. Soovitame kasutada meie klaaskiudvõrguga tugevdatud epoksiidkrunti, et tagada täielik nake ja vältida pragude tekkimist.";
    }
    if (q.includes('puhast') || q.includes('hoold')) {
      return "Mikrotsemendi hooldus on lihtne. Kasutage pH-neutraalseid puhastusvahendeid ja vältige tugevatoimelisi happeid. Iga-aastane vahatamine ei ole meie spetsiaalse lakisüsteemi puhul vajalik.";
    }
    return "See on suurepärane küsimus meie materjali kohta. Üldiselt on meie mikrotsement 3mm paksune ja äärmiselt kulumiskindel. Täpsema tehnilise spetsifikatsiooni leiad vastava toote lehelt.";
  } else {
    if (q.includes('tile') || q.includes('bathroom')) {
      return "Yes, KUUS DESIGN can be applied directly over existing tiles. We recommend our fiberglass-mesh reinforced epoxy primer to ensure perfect adhesion and structural stability.";
    }
    if (q.includes('clean') || q.includes('maintain')) {
      return "Maintenance is straightforward. Use pH-neutral cleaners and avoid harsh acids. Our high-performance sealers eliminate the need for regular waxing.";
    }
    return "That's an excellent technical inquiry. Generally, our system is 3mm thick and highly durable. You can find specific technical sheets in our downloads section on each product page.";
  }
}
