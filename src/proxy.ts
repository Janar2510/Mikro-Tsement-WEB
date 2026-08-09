import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["et", "en", "lv", "lt"];
// Locales we used to build (as untranslated English duplicates). Permanently
// redirect them to the default locale so they stop being crawled/indexed.
const retiredLocales = ["de", "ru", "es", "fr"];
const defaultLocale = "et";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isStaticFile =
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api");

  if (isStaticFile) return NextResponse.next();

  const firstSegment = pathname.split("/")[1];
  if (retiredLocales.includes(firstSegment)) {
    const rest = pathname.slice(firstSegment.length + 1); // "" or "/products/…"
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${rest}`, request.url),
      301
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Exclude static assets, images, and all files in /assets/ (videos, PDFs, images)
  // so Safari range requests for .mp4 files are never intercepted by middleware.
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon\\.ico|.*\\.mp4|.*\\.webp|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.pdf|.*\\.webm).*)"],
};
