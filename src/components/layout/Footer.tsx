import Link from "next/link";
import Image from "next/image";
import { brandName } from "@/lib/brand";

interface FooterProps {
  lang: string;
  navDict?: any;
  footerDict?: any;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.3-.598-.3-1.482c0-1.388.807-2.428 1.808-2.428.854 0 1.268.641 1.268 1.408 0 .858-.547 2.142-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.137-1.869 3.137-4.57 0-2.39-1.718-4.06-4.168-4.06-2.838 0-4.502 2.128-4.502 4.328 0 .857.329 1.774.74 2.277a.3.3 0 0 1 .07.286c-.076.312-.244.995-.278 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.47 0 6.165 2.473 6.165 5.776 0 3.447-2.172 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.622 2.378c-.227.869-.835 1.958-1.245 2.621A10 10 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://instagram.com/kuusdesign", label: "Instagram", Icon: InstagramIcon },
  { href: "https://pinterest.com/kuusdesign", label: "Pinterest", Icon: PinterestIcon },
  { href: "https://linkedin.com/company/kuusdesign", label: "LinkedIn", Icon: LinkedinIcon },
];

export function Footer({ lang, navDict, footerDict }: FooterProps) {
  return (
    <footer id="contact" className="bg-foreground text-background py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <Link href={`/${lang}`} className="block w-40">
            <Image
              src="/assets/brand/logos/Micro Logo.png"
              alt={`${brandName(lang)} Logo`}
              width={160}
              height={48}
              className="brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
              style={{ width: "100%", height: "auto" }}
            />
          </Link>
          <p className="text-sm font-sans max-w-xs text-background/70 leading-relaxed">
            {footerDict?.tagline || "Premium microcement surfaces crafted for spaces that demand quiet luxury."}
          </p>
          {/* Social icons */}
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-background/30 flex items-center justify-center text-background/60 hover:text-background hover:border-background/70 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-sans text-sm tracking-widest uppercase">
          <div className="space-y-4 flex flex-col">
            <span className="text-background/50 text-xs font-bold">
              {footerDict?.categories?.studio || "Studio"}
            </span>
            <Link href={`/${lang}/story`} className="hover:opacity-70 transition-opacity">
              {navDict?.story || "About"}
            </Link>
            <Link href={`/${lang}#philosophy`} className="hover:opacity-70 transition-opacity">
              {navDict?.philosophy || "Methodology"}
            </Link>
            <Link href={`/${lang}/guide/luxury-concrete`} className="hover:opacity-70 transition-opacity">
              {navDict?.guide || "Guide"}
            </Link>
            <Link href={`/${lang}/contact`} className="hover:opacity-70 transition-opacity">
              {navDict?.contact || "Contact"}
            </Link>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-background/50 text-xs font-bold">
              {footerDict?.categories?.collections || "Collections"}
            </span>
            <Link href={`/${lang}/products`} className="hover:opacity-70 transition-opacity">
              {navDict?.products || "Products"}
            </Link>
            <Link href={`/${lang}/projects`} className="hover:opacity-70 transition-opacity">
              {navDict?.projects || "Projects"}
            </Link>
            <Link href={`/${lang}/business`} className="hover:opacity-70 transition-opacity">
              {navDict?.business || "Business"}
            </Link>
          </div>
          <div className="space-y-4 flex flex-col">
            <span className="text-background/50 text-xs font-bold">
              {footerDict?.categories?.connect || "Connect"}
            </span>
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-background/50 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} {brandName(lang)}. {footerDict?.rights || "All Rights Reserved."}</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href={`/${lang}/terms`} className="hover:opacity-100 transition-opacity">
            {footerDict?.terms || "Terms"}
          </Link>
          <Link href={`/${lang}/privacy`} className="hover:opacity-100 transition-opacity">
            {footerDict?.privacy || "Privacy"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
