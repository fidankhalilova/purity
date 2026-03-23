import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAccountRoute = pathname.includes("/account");
  const isAuthRoute =
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/reset-password");
  const accessToken = request.cookies.get("accessToken")?.value;
  const isLoggedIn = !!accessToken;

  if (isAccountRoute && !isAuthRoute && !isLoggedIn) {
    const locale = pathname.split("/")[1];
    return NextResponse.redirect(
      new URL(`/${locale}/account/login`, request.url),
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
    "/(en|az|ru)/:path*",
    "/(en|az|ru)/account/:path*",
    "/(en|az|ru)/account/login",
    "/(en|az|ru)/account/register",
    "/(en|az|ru)/account/reset-password",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|admin).*)",
  ],
};
