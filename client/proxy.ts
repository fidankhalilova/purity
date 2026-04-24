import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isGoogleCallback = pathname.includes("/account/google/callback");

  if (isGoogleCallback) {
    return intlMiddleware(request);
  }

  if (pathname.startsWith("/admin")) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const isLoggedIn = !!accessToken;

    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/account/login?returnUrl=${returnUrl}`, request.url),
      );
    }

    return NextResponse.next();
  }

  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

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

  const isAccountRoute = pathname.includes("/account");
  const isAuthRoute =
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/reset-password");
  const accessToken = request.cookies.get("accessToken")?.value;
  const isLoggedIn = !!accessToken;

  if (isAccountRoute && !isAuthRoute && !isGoogleCallback && !isLoggedIn) {
    const locale = pathname.split("/")[1];
    const returnUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/${locale}/account/login?returnUrl=${returnUrl}`, request.url),
    );
  }

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
    "/(en|az|ru)/account/google/callback",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
