import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // EXCLUDE Google callback route from ALL checks
  const isGoogleCallback = pathname.includes("/account/google/callback");

  if (isGoogleCallback) {
    // Allow Google callback to proceed without any checks
    return intlMiddleware(request);
  }

  // Admin routes - NO locale prefix, handle separately
  if (pathname.startsWith("/admin")) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const isLoggedIn = !!accessToken;

    // If not logged in, redirect to login with returnUrl
    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/account/login?returnUrl=${returnUrl}`, request.url),
      );
    }

    // If logged in, check user role (we'll do client-side check)
    // For now, just allow access to admin routes
    return NextResponse.next();
  }

  // For all other routes, check if they have locale prefix
  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If no locale and not an admin route, add default locale
  if (
    !hasLocale &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/favicon.ico")
  ) {
    const defaultLocale = "en";
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  // Check account routes (BUT EXCLUDE GOOGLE CALLBACK)
  const isAccountRoute = pathname.includes("/account");
  const isAuthRoute =
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/reset-password");
  const accessToken = request.cookies.get("accessToken")?.value;
  const isLoggedIn = !!accessToken;

  // Account routes protection (excluding login/register AND google callback)
  if (isAccountRoute && !isAuthRoute && !isGoogleCallback && !isLoggedIn) {
    const locale = pathname.split("/")[1];
    const returnUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/${locale}/account/login?returnUrl=${returnUrl}`, request.url),
    );
  }

  // If logged in and trying to access auth routes, redirect to profile
  if (isLoggedIn && isAuthRoute) {
    const locale = pathname.split("/")[1];
    return NextResponse.redirect(
      new URL(`/${locale}/account/profile`, request.url),
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/admin/:path*",
    "/(en|az|ru)/:path*",
    "/(en|az|ru)/account/:path*",
    "/(en|az|ru)/account/login",
    "/(en|az|ru)/account/register",
    "/(en|az|ru)/account/reset-password",
    "/(en|az|ru)/account/google/callback", // Add this explicitly
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
