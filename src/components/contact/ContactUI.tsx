"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface ContactUIProps {
  dict: any;
  lang: string;
}

const MESSAGES: Record<string, { sent: string; error: string; sending: string }> = {
  et: {
    sent: "Aitäh! Päring on saadetud, võtame peagi ühendust.",
    error: "Saatmine ebaõnnestus. Proovi uuesti või kirjuta otse e-posti teel.",
    sending: "Saadan...",
  },
  en: {
    sent: "Thank you! Your inquiry was sent. We will be in touch shortly.",
    error: "Sending failed. Please try again or email us directly.",
    sending: "Sending...",
  },
  lt: {
    sent: "Ačiū! Užklausa išsiųsta, netrukus susisieksime.",
    error: "Nepavyko išsiųsti. Bandykite dar kartą arba rašykite el. paštu.",
    sending: "Siunčiama...",
  },
  lv: {
    sent: "Paldies! Pieprasījums nosūtīts, drīz sazināsimies.",
    error: "Nosūtīšana neizdevās. Mēģiniet vēlreiz vai rakstiet e-pastā.",
    sending: "Sūta...",
  },
};

export function ContactUI({ dict, lang }: ContactUIProps) {
  const msg = MESSAGES[lang] ?? MESSAGES.en;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          question: data.get("question"),
          projectType,
          area: data.get("area"),
          timeline,
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setProjectType("");
      setTimeline("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
          {/* Contact Info */}
          <div className="flex flex-col space-y-20 justify-center">
              <div className="space-y-12">
                 {[
                   { icon: Mail, label: dict.contact_ui.inquiries, value: dict.contact.email, href: `mailto:${dict.contact.email}` },
                   { icon: Phone, label: dict.contact_ui.direct_line, value: dict.contact.tel, href: `tel:${String(dict.contact.tel).replace(/\s/g, "")}` },
                   { icon: MapPin, label: dict.contact_ui.studio, value: dict.contact.address, isSans: true, href: undefined as string | undefined }
                 ].map((item, i) => (
                   <motion.div 
                     key={item.label}
                     className="flex items-start gap-6"
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, delay: i * 0.1 }}
                   >
                      <item.icon className="w-5 h-5 text-foreground/30 mt-1" />
                      <div className="space-y-2">
                         <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">{item.label}</span>
                         <p className={`${item.isSans ? 'font-sans text-sm uppercase' : 'font-serif text-3xl'} tracking-tight`}>
                           {item.href ? <a href={item.href} className="hover:opacity-60 transition-opacity">{item.value}</a> : item.value}
                         </p>
                      </div>
                   </motion.div>
                 ))}
              </div>
          </div>

          <motion.form 
            className="bg-[#FAF5F2] p-8 sm:p-12 md:p-16 flex flex-col space-y-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onSubmit={handleSubmit}
          >
             <h3 className="font-serif text-3xl uppercase tracking-widest">{dict.contact_ui.dialogue}</h3>
             <div className="space-y-10">
                <div className="group relative">
                   <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                      {dict.contact_ui.name}
                   </label>
                   <input 
                     type="text" 
                     name="name"
                     className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider"
                     required
                   />
                </div>
                <div className="group relative">
                   <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                      {dict.contact_ui.email_label}
                   </label>
                   <input 
                     type="email" 
                     name="email"
                     className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider"
                     required
                   />
                </div>
                <div className="group relative">
                   <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                      {dict.contact_ui.vision}
                   </label>
                   <textarea
                     name="question"
                     rows={4}
                     className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider resize-none px-0"
                     required
                   />
                </div>
                <CustomSelect
                  label={dict.contact_ui.project_type}
                  placeholder={dict.contact_ui.select_placeholder}
                  options={dict.contact_ui.project_types}
                  value={projectType}
                  onChange={setProjectType}
                />
                <div className="grid grid-cols-2 gap-8">
                   <div className="group relative">
                      <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                         {dict.contact_ui.area}
                      </label>
                      <input
                        type="number"
                        name="area"
                        min="1"
                        placeholder="m²"
                        className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider"
                      />
                   </div>
                   <CustomSelect
                     label={dict.contact_ui.timeline}
                     placeholder={dict.contact_ui.select_placeholder}
                     options={dict.contact_ui.timelines}
                     value={timeline}
                     onChange={setTimeline}
                   />
                </div>
             </div>
             <button
               type="submit"
               disabled={status === "sending"}
               className="bg-foreground text-background py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-foreground/80 transition-all active:scale-95 disabled:opacity-40"
             >
                {status === "sending" ? msg.sending : dict.contact.cta}
             </button>
             <p role="status" aria-live="polite" className={`font-sans text-xs tracking-wide ${status === "error" ? "text-red-700" : "text-foreground/70"}`}>
                {status === "sent" ? msg.sent : status === "error" ? msg.error : ""}
             </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
