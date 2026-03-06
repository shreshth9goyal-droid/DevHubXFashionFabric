import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // Admin routes protection is handled by the page components using useSession
    // This middleware can be extended for additional route protection if needed
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - robots.txt, sitemap.xml, google*.html
         */
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-.*\\.xml|google.*\\.html).*)",
    ],
}
