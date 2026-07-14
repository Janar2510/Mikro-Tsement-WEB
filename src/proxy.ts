import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "et", "de", "ru", "es", "fr", "lv", "lt"];
const defaultLocale = "et";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isStaticFile =
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api");

  if (isStaticFile) return NextResponse.next();

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
