import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "et", "de", "ru", "es", "fr"];
const defaultLocale = "et";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Manually bypass static files to avoid redirection loops and 404s
  const isStaticFile = pathname.includes('.') || 
                       pathname.startsWith('/_next') || 
                       pathname.startsWith('/api');
  
  if (isStaticFile) return NextResponse.next();

  // 2. Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === "/" ? "" : pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  // Simple matcher that lets the logic inside middleware handle the rest
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
