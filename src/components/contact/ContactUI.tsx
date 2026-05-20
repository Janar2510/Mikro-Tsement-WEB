"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface ContactUIProps {
  dict: any;
  lang: string;
}

export function ContactUI({ dict, lang }: ContactUIProps) {
  return (
    <section className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
          {/* Contact Info */}
          <div className="flex flex-col space-y-20 justify-center">
              <div className="space-y-12">
                 {[
                   { icon: Mail, label: dict.contact_ui.inquiries, value: dict.contact.email },
                   { icon: Phone, label: dict.contact_ui.direct_line, value: dict.contact.tel },
                   { icon: MapPin, label: dict.contact_ui.studio, value: dict.contact.address, isSans: true }
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
                           {item.value}
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
            onSubmit={(e) => e.preventDefault()}
          >
             <h3 className="font-serif text-3xl uppercase tracking-widest">{dict.contact_ui.dialogue}</h3>
             <div className="space-y-10">
                <div className="group relative">
                   <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                      {dict.contact_ui.name}
                   </label>
                   <input 
                     type="text" 
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
                     className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider"
                     required
                   />
                </div>
                <div className="group relative">
                   <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                      {dict.contact_ui.vision}
                   </label>
                   <textarea
                     rows={4}
                     className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider resize-none px-0"
                     required
                   />
                </div>
                <CustomSelect
                  label={dict.contact_ui.project_type ?? (lang === "et" ? "Projekti tüüp" : "Project Type")}
                  placeholder={lang === "et" ? "Vali..." : "Select..."}
                  options={lang === "et"
                    ? ["Põrand", "Vannituba", "Seinad", "Köök", "Mööbel", "Dekoratiivne", "Bassein", "Muu"]
                    : ["Flooring", "Bathroom", "Walls", "Kitchen", "Furniture", "Decorative", "Pool", "Other"]
                  }
                />
                <div className="grid grid-cols-2 gap-8">
                   <div className="group relative">
                      <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mb-2 transition-colors group-focus-within:text-foreground">
                         {dict.contact_ui.area ?? (lang === "et" ? "Pindala (m²)" : "Area (m²)")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="m²"
                        className="w-full bg-transparent border-b border-foreground/10 py-2 outline-none focus:border-foreground transition-colors font-sans text-sm uppercase tracking-wider"
                      />
                   </div>
                   <CustomSelect
                     label={dict.contact_ui.timeline ?? (lang === "et" ? "Ajakava" : "Timeline")}
                     placeholder={lang === "et" ? "Vali..." : "Select..."}
                     options={lang === "et"
                       ? ["Kiire (< 1 kuu)", "1–3 kuud", "3–6 kuud", "Planeerin", "Pole kindel"]
                       : ["Urgent (< 1 month)", "1–3 months", "3–6 months", "Planning ahead", "Not sure"]
                     }
                   />
                </div>
             </div>
             <button
               type="submit"
               className="bg-foreground text-background py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-foreground/80 transition-all active:scale-95"
             >
                {dict.contact.cta}
             </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
