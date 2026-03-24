import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// --- INSANE SECURITY: CONFIGURATION ---
const SECRET_GATE_PATH = "/admin/system-exclusive-login-gate";
const ACCESS_TOKEN = "FF-ADMIN-2026-SECURE-V1"; // This must be in the URL
const HONEYPOT_PATHS = ["/admin/login", "/wp-admin", "/admin/config", "/phpmyadmin"];

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    const isAdmin = token?.role === "admin";
    
    // --- 1. Honeypot Block ---
    if (HONEYPOT_PATHS.includes(path)) {
      return new NextResponse("Security Violation: Access Denied.", { status: 403 });
    }

    // --- 2. Secret Gate Logic ---
    if (path === SECRET_GATE_PATH) {
      const urlToken = req.nextUrl.searchParams.get("token");
      if (urlToken !== ACCESS_TOKEN) {
        // Obfuscate the failure: don't even tell them why it failed
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // --- 3. Protected Route Logic ---
    if (path.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        if (path === SECRET_GATE_PATH) return true;
        return !!token;
      },
    },
    pages: {
      signIn: SECRET_GATE_PATH,
    },
  }
)

export const config = {
    matcher: ["/admin/:path*", "/wp-admin", "/admin/login", "/phpmyadmin"],
}


