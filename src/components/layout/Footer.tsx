import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  lang: string;
  navDict?: any;
  footerDict?: any;
}

export function Footer({ lang, navDict, footerDict }: FooterProps) {
  return (
    <footer id="contact" className="bg-foreground text-background py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4">
          <Link href={`/${lang}`} className="block w-40">
            <Image 
              src="/assets/brand/logos/Micro Logo.png"
              alt="KUUS DESIGN Logo"
              width={160}
              height={48}
              className="brightness-0 invert opacity-70 hover:opacity-100 transition-opacity h-auto"
            />
          </Link>
          <p className="text-sm font-sans max-w-xs text-background/70 leading-relaxed">
            {footerDict?.tagline || "Premium microcement surfaces crafted for spaces that demand quiet luxury."}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-sans text-sm tracking-widest uppercase">
          <div className="space-y-4 flex flex-col">
            <span className="text-background/50 text-xs font-bold">
              {footerDict?.categories?.studio || "Studio"}
            </span>
            <Link href={`/${lang}/story`} className="hover:opacity-70 transition-opacity">
              {navDict?.story || "About"}
            </Link>
            <Link href={`/${lang}#methodology`} className="hover:opacity-70 transition-opacity">
              {navDict?.philosophy || "Methodology"}
            </Link>
            <Link href={`/${lang}/guide/topcret`} className="hover:opacity-70 transition-opacity">
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
            <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Pinterest</a>
            <a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-background/50 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} KUUS DESIGN. {footerDict?.rights || "All Rights Reserved."}</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
