import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths that need i18n
  matcher: [
    // Root path
    "/",

    // All paths with language prefixes
    "/(en|az|ru)/:path*",

    // All paths except static files and api routes
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
