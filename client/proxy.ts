import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Root path
    "/",

    // All paths with language prefixes
    "/(en|az|ru)/:path*",

    // All paths except:
    // - api routes
    // - _next static files
    // - favicon
    // - admin routes  ← ADD THIS
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|admin).*)",
  ],
};
