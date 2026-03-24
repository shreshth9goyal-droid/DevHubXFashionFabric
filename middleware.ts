import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Check if the user is authenticated and is an admin
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdmin = token?.role === "admin";
    const path = req.nextUrl.pathname;
    const isLoginGate = path === "/admin/system-exclusive-login-gate";

    // If accessing admin routes but not an admin, redirect
    if (path.startsWith("/admin") && !isAdmin && !isLoginGate) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === "/admin/system-exclusive-login-gate") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/system-exclusive-login-gate",
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"],
}
