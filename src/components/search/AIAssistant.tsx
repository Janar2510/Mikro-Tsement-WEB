"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  dict: any;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ContactForm {
  show: boolean;
  name: string;
  email: string;
  phone: string;
  question: string;
  submitting: boolean;
  submitted: boolean;
}

const QUICK_REPLIES: Record<string, string[]> = {
  et: [
    "Mis on mikrotsement?",
    "Kas saab paigaldada plaatide peale?",
    "Milliseid pindu katte?",
    "Kuidas hooldada?",
  ],
  en: [
    "What is microcement?",
    "Can it go over existing tiles?",
    "What surfaces can be covered?",
    "How to maintain?",
  ],
};

// Parses [LINK:/path|Label] tokens in AI response text
function parseLinks(text: string, lang: string): React.ReactNode[] {
  const parts = text.split(/(\[LINK:[^\]]+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/\[LINK:([^|]+)\|([^\]]+)\]/);
    if (match) {
      const rawPath = match[1];
      const label = match[2];
      // Replace /et/ prefix with current lang
      const path = rawPath.replace(/^\/et\//, `/${lang}/`).replace(/^\/et$/, `/${lang}`);
      return (
        <Link
          key={i}
          href={path}
          className="inline-block mt-2 mr-2 px-3 py-1 bg-foreground/5 border border-foreground/10 text-[9px] uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {label} →
        </Link>
      );
    }
    return part ? <span key={i}>{part}</span> : null;
  });
}

// Strips [CONTACT_FORM] marker and [LINK:...] tokens from display text
function cleanText(text: string): string {
  return text.replace(/\[CONTACT_FORM\]/g, "").replace(/\[LINK:[^\]]+\]/g, "").trim();
}

export function AIAssistant({ isOpen, onClose, lang, dict }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [contact, setContact] = useState<ContactForm>({
    show: false, name: "", email: "", phone: "", question: "", submitting: false, submitted: false,
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!dict) return null;

  const quickReplies = QUICK_REPLIES[lang] ?? QUICK_REPLIES.en;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, contact.show, isStreaming]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 400);
  }, [isOpen]);

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: userText.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);
    setContact((c) => ({ ...c, show: false }));

    // Append empty assistant message that will be filled by stream
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          lang,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Unknown error");
        throw new Error(errText || `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error("Stream failed - no response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: fullText };
          return updated;
        });
      }

      // Check if response requires contact form
      if (fullText.includes("[CONTACT_FORM]")) {
        setContact((c) => ({
          ...c,
          show: true,
          question: userText.trim(),
          submitted: false,
        }));
      }
    } catch (err: any) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { 
          role: "assistant", 
          content: dict.error ?? "Something went wrong. Please try again." 
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [messages, isStreaming, lang, dict]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContact((c) => ({ ...c, submitting: true }));
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          question: contact.question,
          lang,
        }),
      });
      setContact((c) => ({ ...c, submitting: false, submitted: true }));
      // Add confirmation message to chat
      const confirmMsg = dict.confirm_sent ?? "Your details have been sent. Our team will be in touch shortly. ✦";
      setMessages((prev) => [...prev, { role: "assistant", content: confirmMsg }]);
      setTimeout(() => setContact((c) => ({ ...c, show: false })), 500);
    } catch {
      setContact((c) => ({ ...c, submitting: false }));
    }
  };

  const inputLabel = (field: string) => {
    const labels: Record<string, Record<string, string>> = {
      name: { et: "Nimi", en: "Name" },
      email: { et: "E-post", en: "Email" },
      phone: { et: "Telefon (valikuline)", en: "Phone (optional)" },
      submit: { et: "Saada päring", en: "Send inquiry" },
      formTitle: { et: "Jagage oma kontaktandmeid", en: "Share your contact details" },
      formSub: { et: "Meie meeskond kontakteerub teiega isikliku pakkumisega.", en: "Our team will reach out with a personalised proposal." },
    };
    return labels[field]?.[lang] ?? labels[field]?.en ?? field;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-background z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-border/50 flex justify-between items-start shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/30">
                  <Sparkles className="w-3 h-3" />
                  Studio Intelligence
                </div>
                <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-tighter italic">
                  {dict.title}
                </h2>
                <p className="font-sans text-[10px] text-foreground/40 uppercase tracking-widest max-w-xs leading-relaxed">
                  {dict.subtitle}
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted transition-colors rounded-full mt-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">

              {/* Empty state + quick replies */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col items-center text-center space-y-4 opacity-30 px-8 pt-8">
                    <MessageSquare className="w-8 h-8" />
                    <p className="font-sans text-[10px] uppercase tracking-widest leading-loose">
                      {dict.empty_state}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-foreground/30 mb-3">
                      {dict.common_questions}
                    </p>
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => sendMessage(reply)}
                        className="w-full text-left px-4 py-3 bg-[#FAF5F2] border border-border/30 text-[10px] uppercase tracking-widest font-sans hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex flex-col max-w-[88%]",
                    msg.role === "user" ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    {msg.role === "assistant" && <Sparkles className="w-2.5 h-2.5 text-foreground/20" />}
                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-25">
                      {msg.role === "user" ? "Client" : "Studio AI"}
                    </span>
                    {msg.role === "user" && <User className="w-2.5 h-2.5 text-foreground/20" />}
                  </div>
                  <div className={cn(
                    "p-4 md:p-5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-foreground text-background font-sans text-[11px] uppercase tracking-wide"
                      : "bg-[#FAF5F2] text-foreground font-serif border border-foreground/5 shadow-sm"
                  )}>
                    {msg.role === "assistant" ? (
                      <div>
                        {parseLinks(cleanText(msg.content), lang)}
                        {/* Streaming cursor */}
                        {isStreaming && idx === messages.length - 1 && (
                          <span className="inline-block w-0.5 h-4 bg-foreground/40 ml-0.5 animate-pulse align-middle" />
                        )}
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Inline Contact Form */}
              <AnimatePresence>
                {contact.show && !contact.submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#FAF5F2] border border-foreground/10 p-6 space-y-5"
                  >
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/30">
                        — Studio AI
                      </p>
                      <p className="font-serif italic text-sm text-foreground leading-relaxed">
                        {inputLabel("formTitle")}
                      </p>
                      <p className="font-sans text-[10px] text-foreground/50 uppercase tracking-widest leading-relaxed">
                        {inputLabel("formSub")}
                      </p>
                    </div>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      {[
                        { key: "name", type: "text", required: true },
                        { key: "email", type: "email", required: true },
                        { key: "phone", type: "tel", required: false },
                      ].map(({ key, type, required }) => (
                        <div key={key} className="group">
                          <label className="text-[9px] uppercase tracking-widest font-bold text-foreground/40 block mb-1">
                            {inputLabel(key)}
                          </label>
                          <input
                            type={type}
                            required={required}
                            value={(contact as any)[key]}
                            onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                            className="w-full bg-transparent border-b border-foreground/10 py-2 text-sm font-sans outline-none focus:border-foreground transition-colors"
                          />
                        </div>
                      ))}
                      <button
                        type="submit"
                        disabled={contact.submitting}
                        className="w-full bg-foreground text-background py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-foreground/80 transition-colors disabled:opacity-40 mt-2"
                      >
                        {contact.submitting ? "..." : inputLabel("submit")}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-6 md:p-8 border-t border-border/50 shrink-0">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={dict.input_placeholder}
                  disabled={isStreaming}
                  className="w-full bg-[#FAF5F2] border-none py-4 pl-5 pr-14 text-[11px] uppercase tracking-widest font-sans outline-none focus:ring-1 focus:ring-foreground/10 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-foreground/5 transition-colors disabled:opacity-20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="mt-3 text-[8px] uppercase tracking-widest text-foreground/20 text-center">
                {dict.pricing_note}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
